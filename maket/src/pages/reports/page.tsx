import { useState, useRef, useEffect } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('equipment');
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const [exportSuccess, setExportSuccess] = useState('');
  const [usersReportGenerated, setUsersReportGenerated] = useState(false);
  const [usersReportLoading, setUsersReportLoading] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const periods = [
    { value: 'week', label: 'Неделя' },
    { value: 'month', label: 'Месяц' },
    { value: 'quarter', label: 'Квартал' },
    { value: 'year', label: 'Год' }
  ];

  const reportTypes = [
    { value: 'equipment', label: 'Отчет по оборудованию' },
    { value: 'maintenance', label: 'Отчет по ТО' },
    { value: 'tickets', label: 'Отчет по заявкам' },
    { value: 'users', label: 'Отчет по пользователям' }
  ];

  const equipmentStats = {
    total: 1247,
    working: 1156,
    broken: 23,
    maintenance: 45,
    disposed: 23,
    byCategory: [
      { name: 'Компьютеры', count: 456, percentage: 36.6 },
      { name: 'Принтеры', count: 234, percentage: 18.8 },
      { name: 'Мониторы', count: 345, percentage: 27.7 },
      { name: 'Сканеры', count: 123, percentage: 9.9 },
      { name: 'Сетевое оборудование', count: 89, percentage: 7.1 }
    ]
  };

  const maintenanceStats = {
    scheduled: 45,
    completed: 156,
    overdue: 8,
    avgTime: 2.5,
    byMonth: [
      { month: 'Янв', completed: 45, scheduled: 50 },
      { month: 'Фев', completed: 52, scheduled: 48 },
      { month: 'Мар', completed: 48, scheduled: 55 },
      { month: 'Апр', completed: 61, scheduled: 52 },
      { month: 'Май', completed: 58, scheduled: 60 },
      { month: 'Июн', completed: 65, scheduled: 58 }
    ]
  };

  const ticketStats = {
    total: 234,
    open: 23,
    inProgress: 45,
    closed: 166,
    avgResolutionTime: 3.2,
    byPriority: [
      { priority: 'Высокий', count: 45, percentage: 19.2 },
      { priority: 'Средний', count: 123, percentage: 52.6 },
      { priority: 'Низкий', count: 66, percentage: 28.2 }
    ]
  };

  const quickReports = [
    {
      title: 'Оборудование без ответственного',
      description: 'Список оборудования, не закрепленного за сотрудниками',
      count: 12,
      icon: 'ri-user-unfollow-line',
      color: 'orange'
    },
    {
      title: 'Просроченное ТО',
      description: 'Оборудование с просроченным техническим обслуживанием',
      count: 8,
      icon: 'ri-time-line',
      color: 'red'
    },
    {
      title: 'Активные заявки',
      description: 'Заявки в статусе "Новая" и "В работе"',
      count: 68,
      icon: 'ri-customer-service-line',
      color: 'blue'
    },
    {
      title: 'Оборудование на складе',
      description: 'Неиспользуемое оборудование на складе',
      count: 156,
      icon: 'ri-archive-line',
      color: 'purple'
    }
  ];

  const usersStats = {
    total: 87,
    active: 74,
    inactive: 13,
    admins: 5,
    technicians: 32,
    managers: 18,
    employees: 32,
    avgTicketsPerUser: 2.7,
    avgResponseTime: 1.8,
    topUsers: [
      { name: 'Алексей Петров', role: 'Техник', tickets: 34, resolved: 31, avatar: 'АП' },
      { name: 'Мария Иванова', role: 'Менеджер', tickets: 28, resolved: 26, avatar: 'МИ' },
      { name: 'Дмитрий Сидоров', role: 'Техник', tickets: 25, resolved: 23, avatar: 'ДС' },
      { name: 'Елена Козлова', role: 'Техник', tickets: 22, resolved: 20, avatar: 'ЕК' },
      { name: 'Игорь Новиков', role: 'Менеджер', tickets: 19, resolved: 18, avatar: 'ИН' },
    ],
    byDepartment: [
      { name: 'ИТ-отдел', users: 24, percentage: 27.6 },
      { name: 'Бухгалтерия', users: 18, percentage: 20.7 },
      { name: 'Отдел продаж', users: 22, percentage: 25.3 },
      { name: 'HR', users: 12, percentage: 13.8 },
      { name: 'Склад', users: 11, percentage: 12.6 },
    ]
  };

  const handleGenerateUsersReport = () => {
    setUsersReportLoading(true);
    setTimeout(() => {
      setUsersReportLoading(false);
      setUsersReportGenerated(true);
    }, 1200);
  };

  const periodLabel = periods.find(p => p.value === selectedPeriod)?.label ?? selectedPeriod;
  const reportLabel = reportTypes.find(r => r.value === selectedReport)?.label ?? selectedReport;

  const getExportRows = (): string[][] => {
    if (selectedReport === 'equipment') {
      const header = ['Категория', 'Количество', 'Доля (%)'];
      const rows = equipmentStats.byCategory.map(c => [c.name, String(c.count), String(c.percentage)]);
      const summary = [
        ['', '', ''],
        ['Всего', String(equipmentStats.total), ''],
        ['Исправное', String(equipmentStats.working), ''],
        ['Неисправное', String(equipmentStats.broken), ''],
        ['На ТО', String(equipmentStats.maintenance), ''],
        ['Списанное', String(equipmentStats.disposed), ''],
      ];
      return [header, ...rows, ...summary];
    }
    if (selectedReport === 'maintenance') {
      const header = ['Месяц', 'Запланировано', 'Выполнено', 'Выполнение (%)'];
      return [header, ...maintenanceStats.byMonth.map(m => [
        m.month, String(m.scheduled), String(m.completed),
        String(Math.round(m.completed / m.scheduled * 100))
      ])];
    }
    if (selectedReport === 'tickets') {
      const header = ['Приоритет', 'Количество', 'Доля (%)'];
      const rows = ticketStats.byPriority.map(p => [p.priority, String(p.count), String(p.percentage)]);
      const summary = [
        ['', '', ''],
        ['Всего заявок', String(ticketStats.total), ''],
        ['Новые', String(ticketStats.open), ''],
        ['В работе', String(ticketStats.inProgress), ''],
        ['Закрытые', String(ticketStats.closed), ''],
      ];
      return [header, ...rows, ...summary];
    }
    if (selectedReport === 'users') {
      if (!usersReportGenerated) return [['Отчет по пользователям', 'Не сгенерирован', '']];
      const header = ['Отдел', 'Пользователей', 'Доля (%)'];
      const rows = usersStats.byDepartment.map(d => [d.name, String(d.users), String(d.percentage)]);
      const summary = [
        ['', '', ''],
        ['Всего пользователей', String(usersStats.total), ''],
        ['Активных', String(usersStats.active), ''],
        ['Неактивных', String(usersStats.inactive), ''],
        ['Администраторов', String(usersStats.admins), ''],
        ['Техников', String(usersStats.technicians), ''],
        ['Менеджеров', String(usersStats.managers), ''],
      ];
      return [header, ...rows, ...summary];
    }
    return [['Нет данных', '', '']];
  };

  const exportCSV = () => {
    const rows = getExportRows();
    const csv = rows.map(r => r.map(cell => `"${cell}"`).join(',')).join('\n');
    const bom = '\uFEFF';
    const blob = new Blob([bom + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportLabel}_${periodLabel}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    setExportMenuOpen(false);
    setExportSuccess('CSV успешно экспортирован');
    setTimeout(() => setExportSuccess(''), 3000);
  };

  const exportExcel = () => {
    const rows = getExportRows();
    const tableRows = rows.map(r =>
      `<tr>${r.map(cell => `<td>${cell}</td>`).join('')}</tr>`
    ).join('');
    const xls = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="UTF-8"/></head>
      <body><table>${tableRows}</table></body></html>`;
    const blob = new Blob([xls], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportLabel}_${periodLabel}.xls`;
    a.click();
    URL.revokeObjectURL(url);
    setExportMenuOpen(false);
    setExportSuccess('Excel успешно экспортирован');
    setTimeout(() => setExportSuccess(''), 3000);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Success notification */}
      {exportSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <i className="ri-checkbox-circle-line text-green-600"></i>
          <span className="text-sm font-medium">{exportSuccess}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Отчеты и аналитика</h1>
          <p className="text-gray-600 mt-1 text-sm">Статистика и отчеты по управлению оборудованием</p>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>{period.label}</option>
            ))}
          </select>

          {/* Export button with dropdown */}
          <div className="relative" ref={exportRef}>
            <Button
              variant="outline"
              className="whitespace-nowrap"
              onClick={() => setExportMenuOpen(prev => !prev)}
            >
              <i className="ri-download-line mr-2"></i>
              <span className="hidden sm:inline">Экспорт отчета</span>
              <span className="sm:hidden">Экспорт</span>
              <i className={`ri-arrow-down-s-line ml-1 transition-transform ${exportMenuOpen ? 'rotate-180' : ''}`}></i>
            </Button>

            {exportMenuOpen && (
              <div className="absolute right-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                <button
                  onClick={exportCSV}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <i className="ri-file-text-line mr-2 text-green-600"></i>
                  Скачать CSV
                </button>
                <button
                  onClick={exportExcel}
                  className="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  <i className="ri-file-excel-line mr-2 text-emerald-600"></i>
                  Скачать Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Reports */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {quickReports.map((report, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center">
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-${report.color}-100 flex-shrink-0`}>
                <i className={`${report.icon} text-lg md:text-xl text-${report.color}-600`}></i>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <p className="text-xl md:text-2xl font-bold text-gray-900">{report.count}</p>
                <p className="text-xs md:text-sm font-medium text-gray-700 leading-tight">{report.title}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{report.description}</p>
          </Card>
        ))}
      </div>

      {/* Report Type Selector */}
      <Card>
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="flex space-x-4 md:space-x-8 min-w-max">
            {reportTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => setSelectedReport(type.value)}
                className={`py-4 px-1 border-b-2 font-medium text-sm cursor-pointer whitespace-nowrap ${
                  selectedReport === type.value
                    ? 'border-teal-500 text-teal-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {type.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Equipment Report */}
        {selectedReport === 'equipment' && (
          <div className="p-4 md:p-6 space-y-6">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-6">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-gray-900">{equipmentStats.total}</p>
                <p className="text-xs md:text-sm text-gray-600">Всего</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-green-600">{equipmentStats.working}</p>
                <p className="text-xs md:text-sm text-gray-600">Исправное</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-red-600">{equipmentStats.broken}</p>
                <p className="text-xs md:text-sm text-gray-600">Неисправное</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-yellow-600">{equipmentStats.maintenance}</p>
                <p className="text-xs md:text-sm text-gray-600">На ТО</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-gray-600">{equipmentStats.disposed}</p>
                <p className="text-xs md:text-sm text-gray-600">Списанное</p>
              </div>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Распределение по категориям</h3>
              <div className="space-y-3">
                {equipmentStats.byCategory.map((category, index) => (
                  <div key={index} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-700 w-32 md:w-auto flex-shrink-0">{category.name}</span>
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-teal-600 h-2 rounded-full" style={{ width: `${category.percentage}%` }}></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-10 text-right flex-shrink-0">{category.count}</span>
                      <span className="text-sm text-gray-500 w-10 text-right flex-shrink-0">{category.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Maintenance Report */}
        {selectedReport === 'maintenance' && (
          <div className="p-4 md:p-6 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-teal-600">{maintenanceStats.scheduled}</p>
                <p className="text-xs md:text-sm text-gray-600">Запланировано</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-green-600">{maintenanceStats.completed}</p>
                <p className="text-xs md:text-sm text-gray-600">Выполнено</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-red-600">{maintenanceStats.overdue}</p>
                <p className="text-xs md:text-sm text-gray-600">Просрочено</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-purple-600">{maintenanceStats.avgTime}</p>
                <p className="text-xs md:text-sm text-gray-600">Среднее время (дни)</p>
              </div>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Динамика по месяцам</h3>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[400px]">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-4 font-medium text-gray-700">Месяц</th>
                      <th className="text-center py-2 px-4 font-medium text-gray-700">Запланировано</th>
                      <th className="text-center py-2 px-4 font-medium text-gray-700">Выполнено</th>
                      <th className="text-center py-2 px-4 font-medium text-gray-700">%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {maintenanceStats.byMonth.map((month, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-2 px-4 font-medium">{month.month}</td>
                        <td className="py-2 px-4 text-center">{month.scheduled}</td>
                        <td className="py-2 px-4 text-center">{month.completed}</td>
                        <td className="py-2 px-4 text-center">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            (month.completed / month.scheduled * 100) >= 90
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {Math.round(month.completed / month.scheduled * 100)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tickets Report */}
        {selectedReport === 'tickets' && (
          <div className="p-4 md:p-6 space-y-6">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-6">
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-gray-900">{ticketStats.total}</p>
                <p className="text-xs md:text-sm text-gray-600">Всего заявок</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-teal-600">{ticketStats.open}</p>
                <p className="text-xs md:text-sm text-gray-600">Новые</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-orange-600">{ticketStats.inProgress}</p>
                <p className="text-xs md:text-sm text-gray-600">В работе</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-green-600">{ticketStats.closed}</p>
                <p className="text-xs md:text-sm text-gray-600">Закрытые</p>
              </div>
              <div className="text-center">
                <p className="text-xl md:text-2xl font-bold text-purple-600">{ticketStats.avgResolutionTime}</p>
                <p className="text-xs md:text-sm text-gray-600">Среднее время (дни)</p>
              </div>
            </div>

            <div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Распределение по приоритету</h3>
              <div className="space-y-3">
                {ticketStats.byPriority.map((priority, index) => (
                  <div key={index} className="flex items-center justify-between gap-3">
                    <span className="text-sm text-gray-700 w-20 flex-shrink-0">{priority.priority}</span>
                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            priority.priority === 'Высокий' ? 'bg-red-600' :
                            priority.priority === 'Средний' ? 'bg-yellow-600' : 'bg-green-600'
                          }`}
                          style={{ width: `${priority.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-10 text-right flex-shrink-0">{priority.count}</span>
                      <span className="text-sm text-gray-500 w-10 text-right flex-shrink-0">{priority.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Report */}
        {selectedReport === 'users' && (
          <div className="p-4 md:p-6">
            {!usersReportGenerated ? (
              <div className="text-center py-12">
                <i className="ri-user-line text-6xl text-gray-300 mb-4"></i>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Отчет по пользователям</h3>
                <p className="text-gray-500 text-sm">Статистика активности пользователей и их взаимодействия с системой</p>
                <button
                  onClick={handleGenerateUsersReport}
                  disabled={usersReportLoading}
                  className="inline-flex items-center justify-center font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 text-sm mt-4"
                >
                  {usersReportLoading ? (
                    <>
                      <i className="ri-loader-4-line mr-2 animate-spin"></i>
                      Генерация...
                    </>
                  ) : (
                    <>
                      <i className="ri-file-chart-line mr-2"></i>
                      Сгенерировать отчет
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6">
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-gray-900">{usersStats.total}</p>
                    <p className="text-xs md:text-sm text-gray-600">Всего</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-green-600">{usersStats.active}</p>
                    <p className="text-xs md:text-sm text-gray-600">Активных</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-gray-400">{usersStats.inactive}</p>
                    <p className="text-xs md:text-sm text-gray-600">Неактивных</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl md:text-2xl font-bold text-teal-600">{usersStats.avgTicketsPerUser}</p>
                    <p className="text-xs md:text-sm text-gray-600">Заявок / чел.</p>
                  </div>
                </div>

                {/* Roles breakdown */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'Администраторы', count: usersStats.admins, color: 'bg-red-100 text-red-700' },
                    { label: 'Техники', count: usersStats.technicians, color: 'bg-teal-100 text-teal-700' },
                    { label: 'Менеджеры', count: usersStats.managers, color: 'bg-orange-100 text-orange-700' },
                    { label: 'Сотрудники', count: usersStats.employees, color: 'bg-gray-100 text-gray-700' },
                  ].map((role, i) => (
                    <div key={i} className={`rounded-lg px-4 py-3 flex items-center justify-between ${role.color}`}>
                      <span className="text-sm font-medium">{role.label}</span>
                      <span className="text-xl font-bold">{role.count}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* By department */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">По отделам</h3>
                    <div className="space-y-3">
                      {usersStats.byDepartment.map((dept, index) => (
                        <div key={index} className="flex items-center justify-between gap-3">
                          <span className="text-sm text-gray-700 w-32 flex-shrink-0">{dept.name}</span>
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${dept.percentage}%` }}></div>
                            </div>
                            <span className="text-sm font-medium text-gray-900 w-6 text-right flex-shrink-0">{dept.users}</span>
                            <span className="text-sm text-gray-500 w-12 text-right flex-shrink-0">{dept.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top users */}
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-4">Топ сотрудников по заявкам</h3>
                    <div className="space-y-2">
                      {usersStats.topUsers.map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                              {user.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-900">{user.name}</p>
                              <p className="text-xs text-gray-500">{user.role}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-sm font-semibold text-gray-900">{user.tickets} заявок</p>
                            <p className="text-xs text-green-600">{user.resolved} решено</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setUsersReportGenerated(false)}
                    className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer flex items-center"
                  >
                    <i className="ri-refresh-line mr-1"></i>
                    Сбросить отчет
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
