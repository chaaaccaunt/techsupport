import { useState, useEffect } from 'react';
import Button from '../base/Button';
import Input from '../base/Input';

interface MaintenanceRecord {
  id: string;
  equipment_id: string;
  equipment_name: string;
  maintenance_type: string;
  performed_date: string;
  performed_by: string;
  cost: number | null;
  description: string;
  parts_replaced: string[];
  next_maintenance_date: string | null;
  related_ticket_id: string | null;
}

interface EditMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  maintenance: MaintenanceRecord;
}

export default function EditMaintenanceModal({ isOpen, onClose, onSuccess, maintenance }: EditMaintenanceModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    maintenance_type: '',
    performed_date: '',
    performed_by: '',
    cost: '',
    description: '',
    parts_replaced: '',
    next_maintenance_date: ''
  });

  useEffect(() => {
    if (maintenance) {
      setFormData({
        maintenance_type: maintenance.maintenance_type,
        performed_date: maintenance.performed_date.split('T')[0],
        performed_by: maintenance.performed_by,
        cost: maintenance.cost?.toString() || '',
        description: maintenance.description,
        parts_replaced: maintenance.parts_replaced.join(', '),
        next_maintenance_date: maintenance.next_maintenance_date?.split('T')[0] || ''
      });
    }
  }, [maintenance]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/manage-maintenance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        },
        body: JSON.stringify({
          action: 'update',
          id: maintenance.id,
          data: {
            maintenance_type: formData.maintenance_type,
            performed_date: formData.performed_date,
            performed_by: formData.performed_by,
            cost: formData.cost ? parseFloat(formData.cost) : null,
            description: formData.description,
            parts_replaced: formData.parts_replaced.split(',').map(p => p.trim()).filter(p => p),
            next_maintenance_date: formData.next_maintenance_date || null
          }
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при обновлении записи');
      }

      onSuccess();
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при обновлении записи');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Редактировать запись ТО</h2>
            <p className="text-sm text-gray-600 mt-1">{maintenance.equipment_name}</p>
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
            {/* Тип ТО */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тип обслуживания <span className="text-red-500">*</span>
              </label>
              <select
                name="maintenance_type"
                value={formData.maintenance_type}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
                required
              >
                <option value="">Выберите тип</option>
                <option value="preventive">Профилактическое</option>
                <option value="corrective">Корректирующее</option>
                <option value="inspection">Инспекция</option>
                <option value="upgrade">Модернизация</option>
              </select>
            </div>

            {/* Дата и исполнитель */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Дата выполнения <span className="text-red-500">*</span>
                </label>
                <Input
                  type="date"
                  name="performed_date"
                  value={formData.performed_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Исполнитель <span className="text-red-500">*</span>
                </label>
                <Input
                  name="performed_by"
                  value={formData.performed_by}
                  onChange={handleChange}
                  placeholder="ФИО исполнителя"
                  required
                />
              </div>
            </div>

            {/* Стоимость */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Стоимость (₽)</label>
              <Input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="0"
                min="0"
                step="0.01"
              />
            </div>

            {/* Описание */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание работ <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                placeholder="Опишите выполненные работы"
                required
              />
            </div>

            {/* Замененные детали */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Замененные детали
              </label>
              <Input
                name="parts_replaced"
                value={formData.parts_replaced}
                onChange={handleChange}
                placeholder="Через запятую: Жесткий диск, Блок питания"
              />
              <p className="text-xs text-gray-500 mt-1">
                Перечислите детали через запятую
              </p>
            </div>

            {/* Следующее ТО */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Дата следующего ТО
              </label>
              <Input
                type="date"
                name="next_maintenance_date"
                value={formData.next_maintenance_date}
                onChange={handleChange}
              />
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
                Сохранить
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
