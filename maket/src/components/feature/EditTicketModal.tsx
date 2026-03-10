
import { useState, useEffect } from 'react';
import Button from '../base/Button';
import Input from '../base/Input';
import { Equipment, Ticket } from '../../lib/supabase';

interface EditTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  ticket: Ticket | null;
}

export default function EditTicketModal({ isOpen, onClose, onSuccess, ticket }: EditTicketModalProps) {
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loadingEquipment, setLoadingEquipment] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    equipment_id: '',
    priority: 'medium',
    department: '',
    status: 'open'
  });

  useEffect(() => {
    if (isOpen && ticket) {
      setFormData({
        title: ticket.title || '',
        description: ticket.description || '',
        equipment_id: ticket.equipment_id || '',
        priority: ticket.priority || 'medium',
        department: ticket.department || '',
        status: ticket.status || 'open'
      });
      loadEquipment();
    }
  }, [isOpen, ticket]);

  const loadEquipment = async () => {
    setLoadingEquipment(true);
    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        // Если Supabase не настроен, используем пустой список
        setEquipment([]);
        return;
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/get-equipment`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        }
      });

      if (response.ok) {
        const data = await response.json();
        setEquipment(Array.isArray(data) ? data : []);
      } else {
        setEquipment([]);
      }
    } catch (error) {
      // Убираем console.error и просто устанавливаем пустой список
      setEquipment([]);
    } finally {
      setLoadingEquipment(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticket) return;
    
    setLoading(true);

    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        alert('Настройки Supabase недоступны');
        return;
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/manage-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        },
        body: JSON.stringify({
          action: 'update',
          id: ticket.id,
          data: formData
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении заявки');
      }

      onSuccess();
      onClose();
    } catch (error) {
      alert('Произошла ошибка при обновлении заявки');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen || !ticket) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'closed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Редактировать заявку</h2>
            <p className="text-sm text-gray-600 mt-1">#{ticket.id} • Создана {new Date(ticket.created_at).toLocaleDateString('ru-RU')}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Заголовок заявки */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок заявки <span className="text-red-500">*</span>
              </label>
              <Input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Например: Не работает принтер в офисе 301"
                required
              />
            </div>

            {/* Описание проблемы */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание проблемы <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm resize-none"
                placeholder="Подробно опишите проблему: что произошло, когда началось, какие действия предпринимались..."
                required
              />
            </div>

            {/* Оборудование */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Оборудование
              </label>
              <select
                name="equipment_id"
                value={formData.equipment_id}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm cursor-pointer"
                disabled={loadingEquipment}
              >
                <option value="">Выберите оборудование (опционально)</option>
                {equipment.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name} - {item.type} ({item.department})
                  </option>
                ))}
              </select>
              {loadingEquipment && (
                <p className="text-xs text-gray-500 mt-1">Загрузка списка оборудования...</p>
              )}
              {!loadingEquipment && equipment.length === 0 && (
                <p className="text-xs text-gray-500 mt-1">Список оборудования недоступен</p>
              )}
            </div>

            {/* Статус */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Статус <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'open', label: 'Открыта', icon: 'ri-play-circle-line' },
                  { value: 'in_progress', label: 'В работе', icon: 'ri-settings-line' },
                  { value: 'resolved', label: 'Решена', icon: 'ri-check-circle-line' },
                  { value: 'closed', label: 'Закрыта', icon: 'ri-close-circle-line' }
                ].map((status) => (
                  <button
                    key={status.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, status: status.value }))}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      formData.status === status.value
                        ? getStatusColor(status.value) + ' border-current'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${status.icon} text-lg mr-2`}></i>
                      <span className="text-sm font-medium">{status.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Приоритет */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Приоритет <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'low', label: 'Низкий', icon: 'ri-arrow-down-line' },
                  { value: 'medium', label: 'Средний', icon: 'ri-subtract-line' },
                  { value: 'high', label: 'Высокий', icon: 'ri-arrow-up-line' },
                  { value: 'critical', label: 'Критический', icon: 'ri-alert-line' }
                ].map((priority) => (
                  <button
                    key={priority.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, priority: priority.value }))}
                    className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                      formData.priority === priority.value
                        ? getPriorityColor(priority.value) + ' border-current'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center">
                      <i className={`${priority.icon} text-lg mr-2`}></i>
                      <span className="text-sm font-medium">{priority.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Отдел */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Отдел <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm cursor-pointer"
                required
              >
                <option value="">Выберите отдел</option>
                <option value="IT">IT</option>
                <option value="Бухгалтерия">Бухгалтерия</option>
                <option value="HR">HR</option>
                <option value="Продажи">Продажи</option>
                <option value="Маркетинг">Маркетинг</option>
                <option value="Производство">Производство</option>
                <option value="Логистика">Логистика</option>
              </select>
            </div>

            {/* Информация о заявке */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="flex">
                <i className="ri-information-line text-gray-600 text-lg mr-3 flex-shrink-0"></i>
                <div className="text-sm text-gray-700">
                  <p className="font-medium mb-2">Информация о заявке</p>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-gray-500">Создана:</span>
                      <p className="font-medium">{new Date(ticket.created_at).toLocaleDateString('ru-RU', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Автор:</span>
                      <p className="font-medium">{ticket.creator?.full_name || 'Неизвестно'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Исполнитель:</span>
                      <p className="font-medium">{ticket.assignee?.full_name || 'Не назначен'}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Последнее обновление:</span>
                      <p className="font-medium">{new Date(ticket.updated_at || ticket.created_at).toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Отмена
          </Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <>
                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Сохранение...
              </>
            ) : (
              <>
                <i className="ri-save-line mr-2"></i>
                Сохранить изменения
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
