import { useState } from 'react';
import Button from '../base/Button';
import Input from '../base/Input';

interface AddEquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AddEquipmentModal({ isOpen, onClose, onSuccess }: AddEquipmentModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    model: '',
    serial_number: '',
    manufacturer: '',
    purchase_date: '',
    warranty_expiry: '',
    status: 'active',
    department: '',
    location_id: '',
    description: '',
    specifications: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Здесь будет запрос к Edge Function
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/manage-equipment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        },
        body: JSON.stringify({
          action: 'create',
          data: {
            ...formData,
            specifications: formData.specifications ? JSON.parse(formData.specifications) : null
          }
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании оборудования');
      }

      // Сброс формы
      setFormData({
        name: '',
        type: '',
        model: '',
        serial_number: '',
        manufacturer: '',
        purchase_date: '',
        warranty_expiry: '',
        status: 'active',
        department: '',
        location_id: '',
        description: '',
        specifications: ''
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при добавлении оборудования');
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
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Добавить оборудование</h2>
            <p className="text-sm text-gray-600 mt-1">Заполните информацию о новом оборудовании</p>
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
            {/* Основная информация */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Основная информация</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Например: Компьютер Dell"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
                    required
                  >
                    <option value="">Выберите тип</option>
                    <option value="Компьютер">Компьютер</option>
                    <option value="Ноутбук">Ноутбук</option>
                    <option value="Принтер">Принтер</option>
                    <option value="Сканер">Сканер</option>
                    <option value="Монитор">Монитор</option>
                    <option value="Сервер">Сервер</option>
                    <option value="Сетевое оборудование">Сетевое оборудование</option>
                    <option value="Другое">Другое</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Модель</label>
                  <Input
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    placeholder="Например: OptiPlex 7090"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Серийный номер</label>
                  <Input
                    name="serial_number"
                    value={formData.serial_number}
                    onChange={handleChange}
                    placeholder="Например: SN123456789"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Производитель</label>
                  <Input
                    name="manufacturer"
                    value={formData.manufacturer}
                    onChange={handleChange}
                    placeholder="Например: Dell"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Отдел <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
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
              </div>
            </div>

            {/* Даты */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Даты</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Дата покупки</label>
                  <Input
                    type="date"
                    name="purchase_date"
                    value={formData.purchase_date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Окончание гарантии</label>
                  <Input
                    type="date"
                    name="warranty_expiry"
                    value={formData.warranty_expiry}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Статус и локация */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4">Статус и размещение</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Статус <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm cursor-pointer"
                    required
                  >
                    <option value="active">Активно</option>
                    <option value="maintenance">На обслуживании</option>
                    <option value="inactive">Неактивно</option>
                    <option value="broken">Сломано</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ID локации</label>
                  <Input
                    name="location_id"
                    value={formData.location_id}
                    onChange={handleChange}
                    placeholder="Например: LOC-001"
                  />
                </div>
              </div>
            </div>

            {/* Описание */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Описание</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                placeholder="Дополнительная информация об оборудовании"
              />
            </div>

            {/* Характеристики */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Характеристики (JSON)
              </label>
              <textarea
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono resize-none"
                placeholder='{"cpu": "Intel i7", "ram": "16GB", "storage": "512GB SSD"}'
              />
              <p className="text-xs text-gray-500 mt-1">
                Введите характеристики в формате JSON
              </p>
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
                Добавление...
              </>
            ) : (
              <>
                <i className="ri-add-line mr-2"></i>
                Добавить
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
