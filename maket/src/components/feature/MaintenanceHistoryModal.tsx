import { useState, useEffect } from 'react';
import Button from '../base/Button';

interface MaintenanceRecord {
  id: string;
  equipment_id: string;
  equipment_name: string;
  maintenance_type: string;
  description: string;
  performed_by: string;
  performed_date: string;
  next_maintenance_date?: string;
  cost?: number;
}

interface MaintenanceHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipmentId?: string;
}

export default function MaintenanceHistoryModal({ isOpen, onClose, equipmentId }: MaintenanceHistoryModalProps) {
  const [records, setRecords] = useState<MaintenanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'preventive' | 'repair'>('all');

  useEffect(() => {
    if (isOpen) {
      loadMaintenanceHistory();
    }
  }, [isOpen, equipmentId]);

  const loadMaintenanceHistory = async () => {
    setLoading(true);
    try {
      // Здесь будет запрос к вашему Edge Function
      // Пока используем моковые данные
      const mockData: MaintenanceRecord[] = [
        {
          id: '1',
          equipment_id: 'PC-001',
          equipment_name: 'ПК-12345',
          maintenance_type: 'Профилактическое ТО',
          description: 'Чистка системы охлаждения, замена термопасты',
          performed_by: 'Иванов И.И.',
          performed_date: '2024-12-15',
          next_maintenance_date: '2025-03-15',
          cost: 1500
        },
        {
          id: '2',
          equipment_id: 'PC-001',
          equipment_name: 'ПК-12345',
          maintenance_type: 'Ремонт',
          description: 'Замена блока питания',
          performed_by: 'Петров П.П.',
          performed_date: '2024-11-20',
          cost: 3500
        },
        {
          id: '3',
          equipment_id: 'NB-002',
          equipment_name: 'НБ-67890',
          maintenance_type: 'Профилактическое ТО',
          description: 'Обновление ПО, проверка системы',
          performed_by: 'Сидоров С.С.',
          performed_date: '2024-12-10',
          next_maintenance_date: '2025-06-10',
          cost: 800
        },
        {
          id: '4',
          equipment_id: 'PR-003',
          equipment_name: 'ПР-11111',
          maintenance_type: 'Ремонт',
          description: 'Замена картриджа, чистка печатающей головки',
          performed_by: 'Козлов К.К.',
          performed_date: '2024-12-05',
          cost: 2200
        },
        {
          id: '5',
          equipment_id: 'PC-001',
          equipment_name: 'ПК-12345',
          maintenance_type: 'Профилактическое ТО',
          description: 'Плановая проверка, обновление драйверов',
          performed_by: 'Иванов И.И.',
          performed_date: '2024-09-15',
          next_maintenance_date: '2024-12-15',
          cost: 1000
        }
      ];

      let filteredData = mockData;
      if (equipmentId) {
        filteredData = mockData.filter(r => r.equipment_id === equipmentId);
      }

      setRecords(filteredData);
    } catch (error) {
      console.error('Ошибка загрузки истории:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRecords = records.filter(record => {
    if (filter === 'all') return true;
    if (filter === 'preventive') return record.maintenance_type === 'Профилактическое ТО';
    if (filter === 'repair') return record.maintenance_type === 'Ремонт';
    return true;
  });

  const handleExport = () => {
    // Подготовка данных для экспорта
    const csvHeaders = [
      'Оборудование',
      'Тип обслуживания',
      'Описание',
      'Выполнил',
      'Дата выполнения',
      'Следующее ТО',
      'Стоимость (₽)'
    ];

    const csvRows = filteredRecords.map(record => [
      record.equipment_name,
      record.maintenance_type,
      record.description,
      record.performed_by,
      record.performed_date,
      record.next_maintenance_date || '-',
      record.cost ? record.cost.toString() : '-'
    ]);

    // Создание CSV контента
    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Добавление BOM для корректного отображения кириллицы в Excel
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Создание ссылки для скачивания
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `История_обслуживания_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-bold text-gray-900">История обслуживания</h2>
            <p className="text-sm text-gray-600 mt-1">
              {equipmentId ? `Оборудование: ${equipmentId}` : 'Все оборудование'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Filters */}
        <div className="p-6 border-b bg-gray-50">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Все ({records.length})
            </button>
            <button
              onClick={() => setFilter('preventive')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filter === 'preventive'
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Профилактика ({records.filter(r => r.maintenance_type === 'Профилактическое ТО').length})
            </button>
            <button
              onClick={() => setFilter('repair')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                filter === 'repair'
                  ? 'bg-orange-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Ремонты ({records.filter(r => r.maintenance_type === 'Ремонт').length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className="text-center py-12">
              <i className="ri-history-line text-4xl text-gray-300 mb-4"></i>
              <p className="text-gray-500">История обслуживания пуста</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRecords.map((record) => (
                <div
                  key={record.id}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-gray-900">{record.equipment_name}</span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            record.maintenance_type === 'Профилактическое ТО'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {record.maintenance_type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{record.description}</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center text-gray-600">
                          <i className="ri-user-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                          <span>Выполнил: {record.performed_by}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                          <i className="ri-calendar-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                          <span>Дата: {record.performed_date}</span>
                        </div>
                        {record.next_maintenance_date && (
                          <div className="flex items-center text-gray-600">
                            <i className="ri-calendar-check-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                            <span>След. ТО: {record.next_maintenance_date}</span>
                          </div>
                        )}
                        {record.cost && (
                          <div className="flex items-center text-gray-600">
                            <i className="ri-money-dollar-circle-line mr-2 w-4 h-4 flex items-center justify-center"></i>
                            <span>Стоимость: {record.cost.toLocaleString()} ₽</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t bg-gray-50">
          <div className="text-sm text-gray-600">
            Всего записей: {filteredRecords.length}
          </div>
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose}>
              Закрыть
            </Button>
            <Button onClick={handleExport}>
              <i className="ri-download-line mr-2"></i>
              Экспорт
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
