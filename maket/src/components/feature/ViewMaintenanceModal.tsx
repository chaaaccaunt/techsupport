import { MaintenanceHistory } from '../../lib/supabase';

interface ViewMaintenanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  maintenance: MaintenanceHistory | null;
}

export default function ViewMaintenanceModal({ isOpen, onClose, maintenance }: ViewMaintenanceModalProps) {
  if (!isOpen || !maintenance) return null;

  const getTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      preventive: 'Профилактическое',
      corrective: 'Корректирующее',
      inspection: 'Инспекция',
      upgrade: 'Модернизация'
    };
    return types[type] || type;
  };

  const getTypeBadgeColor = (type: string) => {
    const colors: Record<string, string> = {
      preventive: 'bg-green-100 text-green-800',
      corrective: 'bg-orange-100 text-orange-800',
      inspection: 'bg-blue-100 text-blue-800',
      upgrade: 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number | null) => {
    if (!amount) return 'Не указано';
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB'
    }).format(amount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center">
            <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mr-4">
              <i className="ri-tools-line text-2xl text-blue-600"></i>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Детали обслуживания</h2>
              <p className="text-sm text-gray-600 mt-1">
                {maintenance.equipment?.name || 'Оборудование не указано'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Основная информация */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-information-line mr-2 text-blue-600"></i>
                Основная информация
              </h3>
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 mb-1">Тип обслуживания</div>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getTypeBadgeColor(maintenance.maintenance_type)}`}>
                      {getTypeLabel(maintenance.maintenance_type)}
                    </span>
                  </div>
                  <div className="flex-1 text-right">
                    <div className="text-xs text-gray-500 mb-1">Дата выполнения</div>
                    <div className="text-sm font-medium text-gray-900">
                      {formatDate(maintenance.performed_at)}
                    </div>
                  </div>
                </div>

                {maintenance.performer && (
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Выполнил</div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full text-sm font-medium mr-2">
                        {maintenance.performer.full_name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {maintenance.performer.full_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {maintenance.performer.position || maintenance.performer.role}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {maintenance.cost && (
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Стоимость работ</div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(maintenance.cost)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Описание работ */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                <i className="ri-file-text-line mr-2 text-blue-600"></i>
                Описание работ
              </h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {maintenance.description}
                </p>
              </div>
            </div>

            {/* Замененные детали */}
            {maintenance.parts_replaced && maintenance.parts_replaced.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-settings-3-line mr-2 text-blue-600"></i>
                  Замененные детали
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <ul className="space-y-2">
                    {maintenance.parts_replaced.map((part, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <i className="ri-checkbox-circle-fill text-green-600 mr-2"></i>
                        {part}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Следующее ТО */}
            {maintenance.next_maintenance_date && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-calendar-check-line mr-2 text-blue-600"></i>
                  Следующее обслуживание
                </h3>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-600 rounded-lg mr-3">
                      <i className="ri-calendar-line text-xl text-white"></i>
                    </div>
                    <div>
                      <div className="text-sm text-blue-900 font-medium">
                        Запланировано на
                      </div>
                      <div className="text-lg font-bold text-blue-900">
                        {new Date(maintenance.next_maintenance_date).toLocaleDateString('ru-RU', {
                          day: '2-digit',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Информация об оборудовании */}
            {maintenance.equipment && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-computer-line mr-2 text-blue-600"></i>
                  Информация об оборудовании
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Название</div>
                      <div className="text-sm font-medium text-gray-900">
                        {maintenance.equipment.name}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Тип</div>
                      <div className="text-sm font-medium text-gray-900">
                        {maintenance.equipment.type}
                      </div>
                    </div>
                    {maintenance.equipment.model && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Модель</div>
                        <div className="text-sm font-medium text-gray-900">
                          {maintenance.equipment.model}
                        </div>
                      </div>
                    )}
                    {maintenance.equipment.serial_number && (
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Серийный номер</div>
                        <div className="text-sm font-medium text-gray-900">
                          {maintenance.equipment.serial_number}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Связанная заявка */}
            {maintenance.ticket_id && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
                  <i className="ri-ticket-line mr-2 text-blue-600"></i>
                  Связанная заявка
                </h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-lg mr-3">
                        <i className="ri-ticket-line text-xl text-orange-600"></i>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          Заявка #{maintenance.ticket_id.slice(0, 8)}
                        </div>
                        <div className="text-xs text-gray-500">
                          Связанная заявка на обслуживание
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium cursor-pointer">
                      Открыть
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
}
