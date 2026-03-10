import { useState, useEffect } from 'react';
import Button from '../base/Button';
import Input from '../base/Input';
import { Equipment } from '../../lib/supabase';

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateTicketModal({ isOpen, onClose, onSuccess }: CreateTicketModalProps) {
  const [loading, setLoading] = useState(false);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loadingEquipment, setLoadingEquipment] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    equipment_id: '',
    priority: 'medium',
    department: '',
    created_by: '' // В реальном приложении это будет ID текущего пользователя
  });

  useEffect(() => {
    if (isOpen) {
      loadEquipment();
    }
  }, [isOpen]);

  const loadEquipment = async () => {
    setLoadingEquipment(true);
    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        console.warn('Supabase не настроен');
        return;
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/get-equipment`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        }
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Ошибка загрузки оборудования:', data?.error || response.statusText);
        return;
      }

      if (Array.isArray(data)) {
        setEquipment(data);
      } else {
        console.warn('Неожиданный формат данных оборудования');
        setEquipment([]);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error('Ошибка загрузки оборудования:', message);
    } finally {
      setLoadingEquipment(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      // В реальном приложении created_by должен быть ID текущего пользователя
      // Для демонстрации используем временное значение
      const ticketData = {
        ...formData,
        created_by: formData.created_by || 'demo-user-id',
        status: 'open'
      };

      const response = await fetch(`${supabaseUrl}/functions/v1/manage-tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        },
        body: JSON.stringify({
          action: 'create',
          data: ticketData
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании заявки');
      }

      // Сброс формы
      setFormData({
        title: '',
        description: '',
        equipment_id: '',
        priority: 'medium',
        department: '',
        created_by: ''
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при создании заявки');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Создать заявку</h2>
            <p className="text-sm text-gray-600 mt-1">Опишите проблему с оборудованием</p>
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

            {/* Информационное сообщение */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex">
                <i className="ri-information-line text-blue-600 text-lg mr-3 flex-shrink-0"></i>
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Что произойдет после создания заявки?</p>
                  <ul className="list-disc list-inside space-y-1 text-xs">
                    <li>Заявка будет зарегистрирована в системе</li>
                    <li>Ответственный специалист получит уведомление</li>
                    <li>Вы сможете отслеживать статус в разделе "Заявки"</li>
                    <li>При изменении статуса вы получите уведомление</li>
                  </ul>
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
                Создание...
              </>
            ) : (
              <>
                <i className="ri-send-plane-line mr-2"></i>
                Создать заявку
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
