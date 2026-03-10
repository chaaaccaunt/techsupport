import { useState, useEffect } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import { MaintenanceHistory } from '../../lib/supabase';
import MaintenanceHistoryModal from '../../components/feature/MaintenanceHistoryModal';
import ViewMaintenanceModal from '../../components/feature/ViewMaintenanceModal';
import Input from '../../components/base/Input';

export default function MaintenancePage() {
  // State for fetched data (placeholder for future API integration)
  const [fetchedMaintenanceData, setFetchedMaintenanceData] = useState<MaintenanceHistory[]>([]);
  const [loading, setLoading] = useState(true);

  // UI state
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState<'scheduled' | 'completed' | 'overdue'>('scheduled');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<MaintenanceHistory | null>(null);
  const [selectedEquipmentId, setSelectedEquipmentId] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // Mock data for maintenance records
  const maintenanceMockData = {
    scheduled: [
      {
        id: 'ТО-001',
        equipment: 'Компьютер Dell OptiPlex 7090',
        equipmentId: 'ПК-001',
        type: 'Плановое ТО',
        scheduledDate: '2024-12-25',
        responsible: 'Технический отдел',
        location: 'Офис 101',
        priority: 'medium',
        status: 'scheduled'
      },
      {
        id: 'ТО-002',
        equipment: 'Принтер HP LaserJet Pro 400',
        equipmentId: 'ПР-002',
        type: 'Замена картриджа',
        scheduledDate: '2024-12-20',
        responsible: 'Иванов И.И.',
        location: 'Офис 205',
        priority: 'high',
        status: 'scheduled'
      },
      {
        id: 'ТО-003',
        equipment: 'Коммутатор D-Link DGS-1024D',
        equipmentId: 'СВ-005',
        type: 'Обновление ПО',
        scheduledDate: '2024-12-22',
        responsible: 'Системный администратор',
        location: 'Серверная',
        priority: 'medium',
        status: 'scheduled'
      }
    ],
    completed: [
      {
        id: 'ТО-004',
        equipment: 'Монитор Samsung 24"',
        equipmentId: 'МН-003',
        type: 'Чистка и настройка',
        scheduledDate: '2024-12-15',
        completedDate: '2024-12-15',
        responsible: 'Петров П.П.',
        location: 'Офис 101',
        priority: 'low',
        status: 'completed'
      },
      {
        id: 'ТО-005',
        equipment: 'Сканер Canon CanoScan',
        equipmentId: 'СК-004',
        type: 'Калибровка',
        scheduledDate: '2024-12-10',
        completedDate: '2024-12-12',
        responsible: 'Технический отдел',
        location: 'Офис 150',
        priority: 'medium',
        status: 'completed'
      }
    ],
    overdue: [
      {
        id: 'ТО-006',
        equipment: 'Принтер Canon PIXMA',
        equipmentId: 'ПР-006',
        type: 'Плановое ТО',
        scheduledDate: '2024-12-01',
        responsible: 'Не назначен',
        location: 'Офис 301',
        priority: 'high',
        status: 'overdue',
        overdueDays: 17
      },
      {
        id: 'ТО-007',
        equipment: 'ПК Lenovo ThinkCentre',
        equipmentId: 'ПК-007',
        type: 'Замена термопасты',
        scheduledDate: '2024-11-25',
        responsible: 'Сидоров С.С.',
        location: 'Офис 202',
        priority: 'medium',
        status: 'overdue',
        overdueDays: 23
      }
    ]
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'Высокий';
      case 'medium':
        return 'Средний';
      case 'low':
        return 'Низкий';
      default:
        return 'Не определён';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const currentData = maintenanceMockData[selectedTab];

  const handleViewHistory = (equipmentId: string) => {
    setSelectedEquipmentId(equipmentId);
    setShowHistoryModal(true);
  };

  const handleViewMaintenance = (maintenance: MaintenanceHistory) => {
    setSelectedMaintenance(maintenance);
    setIsViewModalOpen(true);
  };

  const handleCalendarClick = () => {
    setSelectedDate(new Date());
    setShowCalendarModal(true);
  };

  const handleEdit = (maintenance: MaintenanceHistory) => {
    setSelectedMaintenance(maintenance);
    setShowEditModal(true);
  };

  const handleDelete = async (maintenance: MaintenanceHistory) => {
    if (!confirm(`Вы уверены, что хотите удалить запись о ТО для "${maintenance.equipment}"?`)) {
      return;
    }

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
          action: 'delete',
          id: maintenance.id
        })
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении записи');
      }

      // Здесь можно обновить данные после удаления
      alert('Запись успешно удалена');
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Произошла ошибка при удалении записи');
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    return { daysInMonth, startingDayOfWeek };
  };

  // Combine all records for calendar filtering
  const getMaintenanceForDate = (date: Date) => {
    const allRecords = [
      ...maintenanceMockData.scheduled,
      ...maintenanceMockData.completed,
      ...maintenanceMockData.overdue
    ];
    return allRecords.filter(item => {
      const maintenanceDate = new Date(item.scheduledDate || item.completedDate || '');
      return maintenanceDate.toDateString() === date.toDateString();
    });
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
    const days = [];
    const today = new Date();

    // Empty cells before first day
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-20 border border-gray-200"></div>
      );
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const maintenance = getMaintenanceForDate(date);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-20 border border-gray-200 p-2 cursor-pointer transition-colors ${
            isToday ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
          } ${isSelected ? 'bg-blue-100 border-blue-400' : ''}`}
        >
          <div className={`text-sm font-semibold ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
            {day}
          </div>
          {maintenance.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {maintenance.slice(0, 3).map((item, idx) => (
                <div
                  key={idx}
                  className="w-2 h-2 rounded-full bg-green-500"
                  title={item.equipment}
                ></div>
              ))}
              {maintenance.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{maintenance.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  const monthNames = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ];
  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Техническое обслуживание</h1>
          <p className="text-gray-600 mt-1 text-sm">
            Планирование и контроль технического обслуживания оборудования
          </p>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button variant="outline" onClick={handleCalendarClick} className="whitespace-nowrap">
            <i className="ri-calendar-line mr-2"></i>
            <span className="hidden sm:inline">Календарь ТО</span>
            <span className="sm:hidden">Календарь</span>
          </Button>
          <Button onClick={() => setShowScheduleModal(true)} className="whitespace-nowrap">
            <i className="ri-add-line mr-2"></i>
            <span className="hidden sm:inline">Запланировать ТО</span>
            <span className="sm:hidden">Добавить</span>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-calendar-check-line text-lg md:text-xl text-teal-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            {maintenanceMockData.scheduled.length}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Запланировано</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-checkbox-circle-line text-lg md:text-xl text-green-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            {maintenanceMockData.completed.length}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Выполнено</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-error-warning-line text-lg md:text-xl text-red-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">
            {maintenanceMockData.overdue.length}
          </p>
          <p className="text-xs md:text-sm text-gray-600">Просрочено</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-time-line text-lg md:text-xl text-purple-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">156</p>
          <p className="text-xs md:text-sm text-gray-600">За месяц</p>
        </Card>
      </div>

      {/* Tabs + Table */}
      <Card>
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-4 md:space-x-8 min-w-max">
            <button
              onClick={() => setSelectedTab('scheduled')}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                selectedTab === 'scheduled'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Запланированные ({maintenanceMockData.scheduled.length})
            </button>
            <button
              onClick={() => setSelectedTab('completed')}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                selectedTab === 'completed'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Выполненные ({maintenanceMockData.completed.length})
            </button>
            <button
              onClick={() => setSelectedTab('overdue')}
              className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                selectedTab === 'overdue'
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Просроченные ({maintenanceMockData.overdue.length})
            </button>
          </nav>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-[700px] px-4 md:px-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    ID / Оборудование
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Тип ТО</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Дата</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ответственный</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Приоритет</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Статус</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.map(item => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.id}</p>
                        <p className="text-sm text-gray-500">{item.equipment}</p>
                        <p className="text-xs text-gray-400">
                          {item.equipmentId} • {item.location}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{item.type}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm text-gray-900">
                          {selectedTab === 'completed' ? item.completedDate : item.scheduledDate}
                        </p>
                        {selectedTab === 'overdue' && item.overdueDays && (
                          <p className="text-xs text-red-600">
                            Просрочено на {item.overdueDays} дн.
                          </p>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{item.responsible}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(
                          item.priority
                        )}`}
                      >
                        {getPriorityText(item.priority)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {selectedTab === 'scheduled' && 'Запланировано'}
                        {selectedTab === 'completed' && 'Выполнено'}
                        {selectedTab === 'overdue' && 'Просрочено'}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1">
                        <button
                          onClick={() => handleViewMaintenance(item)}
                          className="p-2 text-gray-400 hover:text-teal-600 cursor-pointer"
                        >
                          <i className="ri-eye-line"></i>
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-gray-400 hover:text-green-600 cursor-pointer"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                        <button
                          onClick={() => handleDelete(item)}
                          className="p-2 text-gray-400 hover:text-red-600 cursor-pointer"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* Schedule Maintenance Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Запланировать техническое обслуживание
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Оборудование
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                    <option value="">Выберите оборудование</option>
                    <option value="ПК-001">ПК-001 - Компьютер Dell OptiPlex 7090</option>
                    <option value="ПР-002">ПР-002 - Принтер HP LaserJet Pro 400</option>
                    <option value="МН-003">МН-003 - Монитор Samsung 24"</option>
                    <option value="СК-004">СК-004 - Сканер Canon CanoScan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Тип обслуживания
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                    <option value="">Выберите тип</option>
                    <option value="planned">Плановое ТО</option>
                    <option value="cleaning">Чистка и настройка</option>
                    <option value="repair">Ремонт</option>
                    <option value="replacement">Замена компонентов</option>
                    <option value="software">Обновление ПО</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Дата планируемого ТО
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Приоритет
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                    <option value="">Выберите приоритет</option>
                    <option value="low">Низкий</option>
                    <option value="medium">Средний</option>
                    <option value="high">Высокий</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ответственный
                  </label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                    <option value="">Выберите ответственного</option>
                    <option value="tech">Технический отдел</option>
                    <option value="admin">Системный администратор</option>
                    <option value="ivanov">Иванов И.И.</option>
                    <option value="petrov">Петров П.П.</option>
                    <option value="sidorov">Сидоров С.С.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Время выполнения (часы)
                  </label>
                  <Input type="number" placeholder="Оценочное время" min="1" max="24" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание работ
                </label>
                <textarea
                  rows={4}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Подробное описание планируемых работ по техническому обслуживанию"
                  maxLength={500}
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowScheduleModal(false)}
                  className="whitespace-nowrap"
                >
                  Отмена
                </Button>
                <Button type="submit" className="whitespace-nowrap">
                  Запланировать ТО
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Календарь технического обслуживания
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Планирование и отслеживание работ по ТО
                </p>
              </div>
              <button
                onClick={() => {
                  setShowCalendarModal(false);
                  setSelectedDate(null);
                }}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* Calendar Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Calendar */}
                <div className="lg:col-span-2">
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <i className="ri-arrow-left-s-line text-xl"></i>
                    </button>
                    <h3 className="text-lg font-bold text-gray-900">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h3>
                    <button
                      onClick={() =>
                        setCurrentMonth(
                          new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <i className="ri-arrow-right-s-line text-xl"></i>
                    </button>
                  </div>

                  {/* Week Days */}
                  <div className="grid grid-cols-7 mb-2">
                    {weekDays.map(day => (
                      <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 border-t border-l border-gray-200">
                    {renderCalendar()}
                  </div>

                  {/* Legend */}
                  <div className="mt-4 flex flex-wrap gap-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Запланировано</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Просрочено</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                      <span className="text-sm text-gray-600">Выполнено</span>
                    </div>
                  </div>
                </div>

                {/* Selected Date Details */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      {selectedDate ? (
                        <>
                          {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}{' '}
                          {selectedDate.getFullYear()}
                        </>
                      ) : (
                        'Выберите дату'
                      )}
                    </h4>

                    {selectedDate ? (
                      <div className="space-y-3">
                        {getMaintenanceForDate(selectedDate).length > 0 ? (
                          getMaintenanceForDate(selectedDate).map((item, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="flex items-start justify-between mb-2">
                                <div className="font-medium text-sm text-gray-900">{item.equipment}</div>
                                <div
                                  className={`w-2 h-2 rounded-full mt-1 ${
                                    item.status === 'completed'
                                      ? 'bg-blue-500'
                                      : item.status === 'overdue'
                                      ? 'bg-orange-500'
                                      : 'bg-green-500'
                                  }`}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-600">{item.type}</div>
                              <div className="text-xs text-gray-500 mt-1">{item.responsible}</div>
                              <div className="mt-2">
                                <span
                                  className={`px-2 py-0.5 text-xs rounded-full ${
                                    item.status === 'completed'
                                      ? 'bg-blue-100 text-blue-700'
                                      : item.status === 'overdue'
                                      ? 'bg-orange-100 text-orange-700'
                                      : 'bg-green-100 text-green-700'
                                  }`}
                                >
                                  {item.status === 'completed'
                                    ? 'Выполнено'
                                    : item.status === 'overdue'
                                    ? 'Просрочено'
                                    : 'Запланировано'}
                                </span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8 text-gray-500 text-sm">
                            <div className="w-10 h-10 flex items-center justify-center mx-auto mb-2">
                              <i className="ri-calendar-line text-3xl"></i>
                            </div>
                            <p>Нет запланированных работ</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 text-sm">
                        <div className="w-10 h-10 flex items-center justify-center mx-auto mb-2">
                          <i className="ri-calendar-check-line text-3xl"></i>
                        </div>
                        <p>Выберите дату для просмотра запланированных работ</p>
                      </div>
                    )}

                    {/* Quick stats */}
                    <div className="mt-4 space-y-2">
                      <div className="bg-green-50 rounded-lg p-3 flex items-center justify-between">
                        <span className="text-sm text-green-700">Запланировано</span>
                        <span className="font-bold text-green-800">{maintenanceMockData.scheduled.length}</span>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 flex items-center justify-between">
                        <span className="text-sm text-orange-700">Просрочено</span>
                        <span className="font-bold text-orange-800">{maintenanceMockData.overdue.length}</span>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 flex items-center justify-between">
                        <span className="text-sm text-blue-700">Выполнено</span>
                        <span className="font-bold text-blue-800">{maintenanceMockData.completed.length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t bg-gray-50">
              <button
                onClick={() => {
                  setSelectedDate(new Date());
                  setCurrentMonth(new Date());
                }}
                className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer flex items-center gap-1"
              >
                <i className="ri-focus-3-line"></i>
                Сегодня
              </button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowCalendarModal(false);
                  setSelectedDate(null);
                }}
              >
                Закрыть
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistoryModal && selectedEquipmentId && (
        <MaintenanceHistoryModal
          isOpen={showHistoryModal}
          onClose={() => {
            setShowHistoryModal(false);
            setSelectedEquipmentId(null);
          }}
          equipmentId={selectedEquipmentId}
        />
      )}

      {/* View Maintenance Modal */}
      <ViewMaintenanceModal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedMaintenance(null);
        }}
        maintenance={selectedMaintenance}
      />
    </div>
  );
}