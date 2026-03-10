import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import MaintenanceHistoryModal from '../../components/feature/MaintenanceHistoryModal';
import AddEquipmentModal from '../../components/feature/AddEquipmentModal';
import QRScannerModal from '../../components/feature/QRScannerModal';
import CreateTicketModal from '../../components/feature/CreateTicketModal';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [isAddEquipmentModalOpen, setIsAddEquipmentModalOpen] = useState(false);
  const [isQRScannerModalOpen, setIsQRScannerModalOpen] = useState(false);
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<any>(null);
  const [isEditTicketOpen, setIsEditTicketOpen] = useState(false);

  const stats = [
    { title: 'Всего оборудования', value: '1,247', icon: 'ri-computer-line', color: 'blue' },
    { title: 'Исправное', value: '1,156', icon: 'ri-checkbox-circle-line', color: 'green' },
    { title: 'Неисправное', value: '23', icon: 'ri-error-warning-line', color: 'red' },
    { title: 'На ТО', value: '45', icon: 'ri-tools-line', color: 'yellow' },
    { title: 'Без ответственного', value: '12', icon: 'ri-user-unfollow-line', color: 'orange' },
    { title: 'Просроченное ТО', value: '8', icon: 'ri-time-line', color: 'purple' }
  ];

  const recentTickets = [
    { id: 'T-001', equipment: 'ПК-12345', description: 'Не включается монитор', priority: 'Высокий', status: 'Новая' },
    { id: 'T-002', equipment: 'ПР-67890', description: 'Замятие бумаги', priority: 'Средний', status: 'В работе' },
    { id: 'T-003', equipment: 'СК-11111', description: 'Не сканирует документы', priority: 'Низкий', status: 'Новая' }
  ];

  const recentTransfers = [
    { equipment: 'ПК-12345', from: 'Иванов И.И.', to: 'Петров П.П.', date: '2024-12-18' },
    { equipment: 'НБ-67890', from: 'Сидоров С.С.', to: 'Козлов К.К.', date: 'Сегодня' }
  ];

  const handleViewAllTickets = () => {
    navigate('/tickets');
  };

  const handleAddEquipmentSuccess = () => {
    // Обновление данных после добавления оборудования
  };

  const handleQRScanSuccess = (equipmentId: string) => {
    alert(`Оборудование найдено: ${equipmentId}\n\nВ полной версии откроется карточка оборудования.`);
  };

  const handleCreateTicketSuccess = () => {
    // Обновление данных после создания заявки
  };

  const handleExportData = async (format: 'csv' | 'excel' | 'pdf') => {
    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      // Получаем данные для экспорта
      const [equipmentRes, ticketsRes, maintenanceRes] = await Promise.all([
        fetch(`${supabaseUrl}/functions/v1/get-equipment`, {
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'apikey': supabaseAnonKey
          }
        }).catch(() => ({ ok: false, json: async () => [] })),
        fetch(`${supabaseUrl}/functions/v1/get-tickets`, {
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'apikey': supabaseAnonKey
          }
        }).catch(() => ({ ok: false, json: async () => [] })),
        fetch(`${supabaseUrl}/functions/v1/get-maintenance`, {
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'apikey': supabaseAnonKey
          }
        }).catch(() => ({ ok: false, json: async () => [] }))
      ]);

      const equipment = equipmentRes.ok ? await equipmentRes.json() : [];
      const tickets = ticketsRes.ok ? await ticketsRes.json() : [];
      const maintenance = maintenanceRes.ok ? await maintenanceRes.json() : [];

      if (format === 'csv') {
        // Экспорт в CSV
        const csvContent = generateCSV({ equipment, tickets, maintenance });
        downloadFile(csvContent, 'equipment-data.csv', 'text/csv');
      } else if (format === 'excel') {
        // Экспорт в Excel (CSV с разделителем табуляции)
        const csvContent = generateCSV({ equipment, tickets, maintenance }, '\t');
        downloadFile(csvContent, 'equipment-data.xls', 'application/vnd.ms-excel');
      } else if (format === 'pdf') {
        // Экспорт в PDF (HTML для печати)
        const htmlContent = generateHTML({ equipment, tickets, maintenance, stats });
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          printWindow.document.write(htmlContent);
          printWindow.document.close();
          printWindow.print();
        }
      }

      setIsExportModalOpen(false);
    } catch (error) {
      console.error('Ошибка экспорта:', error);
      alert('Произошла ошибка при экспорте данных');
    }
  };

  const handleEditTicket = (ticket: any) => {
    setEditingTicket(ticket);
    setIsEditTicketOpen(true);
  };

  const handleUpdateTicket = async (updatedData: any) => {
    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/manage-tickets`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: editingTicket.id,
          ...updatedData
        })
      });

      if (response.ok) {
        setIsEditTicketOpen(false);
        setEditingTicket(null);
        // Обновление данных
      }
    } catch (error) {
      console.error('Ошибка обновления заявки:', error);
    }
  };

  const handleDeleteTicket = async (ticketId: string) => {
    if (!confirm('Вы уверены, что хотите удалить эту заявку?')) {
      return;
    }

    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/manage-tickets`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: ticketId })
      });

      if (response.ok) {
        // Обновление данных
      }
    } catch (error) {
      console.error('Ошибка удаления заявки:', error);
    }
  };

  const generateCSV = (data: any, delimiter = ',') => {
    let csv = '';

    // Оборудование
    csv += `Оборудование\n`;
    csv += `Название${delimiter}Тип${delimiter}Модель${delimiter}Серийный номер${delimiter}Статус${delimiter}Отдел\n`;
    data.equipment.forEach((item: any) => {
      csv += `${item.name}${delimiter}${item.type}${delimiter}${item.model || ''}${delimiter}${item.serial_number || ''}${delimiter}${item.status}${delimiter}${item.department}\n`;
    });

    csv += `\n`;

    // Заявки
    csv += `Заявки\n`;
    csv += `Название${delimiter}Описание${delimiter}Статус${delimiter}Приоритет${delimiter}Отдел${delimiter}Дата создания\n`;
    data.tickets.forEach((item: any) => {
      csv += `${item.title}${delimiter}${item.description}${delimiter}${item.status}${delimiter}${item.priority}${delimiter}${item.department}${delimiter}${new Date(item.created_at).toLocaleDateString()}\n`;
    });

    csv += `\n`;

    // История обслуживания
    csv += `История обслуживания\n`;
    csv += `Оборудование${delimiter}Тип${delimiter}Описание${delimiter}Стоимость${delimiter}Дата\n`;
    data.maintenance.forEach((item: any) => {
      csv += `${item.equipment?.name || 'N/A'}${delimiter}${item.maintenance_type}${delimiter}${item.description}${delimiter}${item.cost || '0'}${delimiter}${new Date(item.performed_at).toLocaleDateString()}\n`;
    });

    return csv;
  };

  const generateHTML = (data: any) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Отчёт по оборудованию</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #1f2937; border-bottom: 2px solid #3b82f6; padding-bottom: 10px; }
          h2 { color: #374151; margin-top: 30px; }
          .stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin: 20px 0; }
          .stat-card { border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; }
          .stat-value { font-size: 24px; font-weight: bold; color: #1f2937; }
          .stat-label { color: #6b7280; font-size: 14px; margin-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { border: 1px solid #e5e7eb; padding: 10px; text-align: left; }
          th { background-color: #f3f4f6; font-weight: 600; }
          .status-active { color: #10b981; }
          .status-maintenance { color: #f59e0b; }
          .status-inactive { color: #6b7280; }
          .status-broken { color: #ef4444; }
          @media print {
            .no-print { display: none; }
          }
        </style>
      </head>
      <body>
        <h1>Отчёт по управлению оборудованием</h1>
        <p>Дата формирования: ${new Date().toLocaleString('ru-RU')}</p>
        
        <div class="stats">
          <div class="stat-card">
            <div class="stat-value">${data.stats?.totalEquipment || 0}</div>
            <div class="stat-label">Всего оборудования</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${data.stats?.activeEquipment || 0}</div>
            <div class="stat-label">Активное</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${data.stats?.openTickets || 0}</div>
            <div class="stat-label">Открытых заявок</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">${data.stats?.maintenanceThisMonth || 0}</div>
            <div class="stat-label">Обслуживаний в месяц</div>
          </div>
        </div>

        <h2>Оборудование</h2>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Тип</th>
              <th>Модель</th>
              <th>Серийный номер</th>
              <th>Статус</th>
              <th>Отдел</th>
            </tr>
          </thead>
          <tbody>
            ${data.equipment.map((item: any) => `
              <tr>
                <td>${item.name}</td>
                <td>${item.type}</td>
                <td>${item.model || '-'}</td>
                <td>${item.serial_number || '-'}</td>
                <td class="status-${item.status}">${item.status}</td>
                <td>${item.department}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>Заявки</h2>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Статус</th>
              <th>Приоритет</th>
              <th>Отдел</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
            ${data.tickets.map((item: any) => `
              <tr>
                <td>${item.title}</td>
                <td>${item.status}</td>
                <td>${item.priority}</td>
                <td>${item.department}</td>
                <td>${new Date(item.created_at).toLocaleDateString('ru-RU')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <h2>История обслуживания</h2>
        <table>
          <thead>
            <tr>
              <th>Оборудование</th>
              <th>Тип обслуживания</th>
              <th>Описание</th>
              <th>Стоимость</th>
              <th>Дата</th>
            </tr>
          </thead>
          <tbody>
            ${data.maintenance.map((item: any) => `
              <tr>
                <td>${item.equipment?.name || 'N/A'}</td>
                <td>${item.maintenance_type}</td>
                <td>${item.description}</td>
                <td>${item.cost ? item.cost + ' ₽' : '-'}</td>
                <td>${new Date(item.performed_at).toLocaleDateString('ru-RU')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </body>
      </html>
    `;
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="p-4 md:p-8">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Панель управления</h1>
          <p className="text-gray-600 mt-1 text-sm md:text-base">Обзор состояния оборудования и активности системы</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-6 mt-6">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center bg-${stat.color}-100 flex-shrink-0`}>
                  <i className={`${stat.icon} text-lg md:text-xl text-${stat.color}-600`}></i>
                </div>
                <div className="ml-3">
                  <p className="text-xs font-medium text-gray-600 leading-tight">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Recent Tickets */}
          <Card title="Последние заявки" actions={
            <Button variant="outline" size="sm" onClick={handleViewAllTickets}>
              <i className="ri-eye-line mr-2"></i>
              Все заявки
            </Button>
          }>
            <div className="space-y-3">
              {recentTickets.map((ticket) => (
                <div key={ticket.id} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium text-gray-900 text-sm">{ticket.id}</span>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        ticket.priority === 'Высокий' ? 'bg-red-100 text-red-800' :
                        ticket.priority === 'Средний' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1 truncate">{ticket.equipment} - {ticket.description}</p>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${
                      ticket.status === 'Новая' ? 'bg-teal-100 text-teal-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {ticket.status}
                    </span>
                    <button
                      onClick={() => handleEditTicket(ticket)}
                      className="p-1.5 text-gray-400 hover:text-green-600 cursor-pointer"
                    >
                      <i className="ri-edit-line text-sm"></i>
                    </button>
                    <button
                      onClick={() => handleDeleteTicket(ticket.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 cursor-pointer"
                    >
                      <i className="ri-delete-bin-line text-sm"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Transfers */}
          <Card title="Последние передачи" actions={
            <Button variant="outline" size="sm" onClick={() => setIsHistoryModalOpen(true)}>
              <i className="ri-history-line mr-2"></i>
              История
            </Button>
          }>
            <div className="space-y-3">
              {recentTransfers.map((transfer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{transfer.equipment}</p>
                    <div className="flex items-center text-xs text-gray-600 mt-1 flex-wrap gap-1">
                      <span className="truncate">{transfer.from}</span>
                      <i className="ri-arrow-right-line"></i>
                      <span className="truncate">{transfer.to}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 flex-shrink-0">{transfer.date}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base md:text-lg font-bold text-gray-900">Быстрые действия</h2>
              <p className="text-xs md:text-sm text-gray-600 mt-1">Часто используемые функции</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button onClick={() => setIsAddEquipmentModalOpen(true)} className="h-16 md:h-20 flex-col text-xs md:text-sm">
              <i className="ri-add-line text-lg md:text-xl mb-1"></i>
              Добавить оборудование
            </Button>
            <Button onClick={() => setIsQRScannerModalOpen(true)} variant="secondary" className="h-16 md:h-20 flex-col text-xs md:text-sm">
              <i className="ri-qr-scan-line text-lg md:text-xl mb-1"></i>
              Сканировать QR
            </Button>
            <Button onClick={() => setIsCreateTicketOpen(true)} className="h-16 md:h-20 flex-col bg-green-600 hover:bg-green-700 text-xs md:text-sm">
              <i className="ri-customer-service-line text-lg md:text-xl mb-1"></i>
              Создать заявку
            </Button>
            <Button onClick={() => setIsExportModalOpen(true)} variant="outline" className="h-16 md:h-20 flex-col text-xs md:text-sm">
              <i className="ri-file-download-line text-lg md:text-xl mb-1"></i>
              Экспорт данных
            </Button>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Требуют внимания */}
          <Card title="Требуют внимания" className="border-l-4 border-l-red-500">
            <div className="space-y-3">
              <div className="flex items-center text-red-600">
                <i className="ri-error-warning-line mr-2"></i>
                <span className="text-sm">8 единиц с просроченным ТО</span>
              </div>
              <div className="flex items-center text-orange-600">
                <i className="ri-user-unfollow-line mr-2"></i>
                <span className="text-sm">12 единиц без ответственного</span>
              </div>
              <div className="flex items-center text-red-600">
                <i className="ri-tools-line mr-2"></i>
                <span className="text-sm">23 неисправных единицы</span>
              </div>
            </div>
          </Card>

          {/* Статистика за месяц */}
          <Card title="Статистика за месяц" className="border-l-4 border-l-green-500">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Выполнено ТО:</span>
                <span className="font-medium">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Закрыто заявок:</span>
                <span className="font-medium">89</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Передач оборудования:</span>
                <span className="font-medium">34</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Модальные окна */}
      <MaintenanceHistoryModal 
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
      />

      <AddEquipmentModal
        isOpen={isAddEquipmentModalOpen}
        onClose={() => setIsAddEquipmentModalOpen(false)}
        onSuccess={handleAddEquipmentSuccess}
      />

      <QRScannerModal
        isOpen={isQRScannerModalOpen}
        onClose={() => setIsQRScannerModalOpen(false)}
        onScanSuccess={handleQRScanSuccess}
      />

      <CreateTicketModal
        isOpen={isCreateTicketOpen}
        onClose={() => setIsCreateTicketOpen(false)}
        onSuccess={handleCreateTicketSuccess}
      />

      {/* Модальное окно редактирования заявки */}
      {isEditTicketOpen && editingTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Редактировать заявку</h2>
                <p className="text-sm text-gray-600 mt-1">Изменение данных заявки {editingTicket.id}</p>
              </div>
              <button
                onClick={() => {
                  setIsEditTicketOpen(false);
                  setEditingTicket(null);
                }}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleUpdateTicket({
                equipment: formData.get('equipment'),
                description: formData.get('description'),
                priority: formData.get('priority'),
                status: formData.get('status')
              });
            }}>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Оборудование
                  </label>
                  <input
                    type="text"
                    name="equipment"
                    defaultValue={editingTicket.equipment}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Описание проблемы
                  </label>
                  <textarea
                    name="description"
                    defaultValue={editingTicket.description}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Приоритет
                    </label>
                    <select
                      name="priority"
                      defaultValue={editingTicket.priority}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      required
                    >
                      <option value="Низкий">Низкий</option>
                      <option value="Средний">Средний</option>
                      <option value="Высокий">Высокий</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Статус
                    </label>
                    <select
                      name="status"
                      defaultValue={editingTicket.status}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      required
                    >
                      <option value="Новая">Новая</option>
                      <option value="В работе">В работе</option>
                      <option value="Выполнена">Выполнена</option>
                      <option value="Отменена">Отменена</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsEditTicketOpen(false);
                    setEditingTicket(null);
                  }}
                >
                  Отмена
                </Button>
                <Button type="submit">
                  <i className="ri-save-line mr-2"></i>
                  Сохранить изменения
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Модальное окно экспорта */}
      {isExportModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Экспорт данных</h2>
                <p className="text-sm text-gray-600 mt-1">Выберите формат для экспорта</p>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-3">
              <button
                onClick={() => handleExportData('csv')}
                className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg mr-3">
                    <i className="ri-file-excel-2-line text-xl text-green-600"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">CSV файл</div>
                    <div className="text-sm text-gray-600">Для Excel и Google Sheets</div>
                  </div>
                </div>
                <i className="ri-arrow-right-line text-gray-400"></i>
              </button>

              <button
                onClick={() => handleExportData('excel')}
                className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg mr-3">
                    <i className="ri-file-excel-line text-xl text-blue-600"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">Excel файл</div>
                    <div className="text-sm text-gray-600">Формат .xls</div>
                  </div>
                </div>
                <i className="ri-arrow-right-line text-gray-400"></i>
              </button>

              <button
                onClick={() => handleExportData('pdf')}
                className="w-full flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg mr-3">
                    <i className="ri-file-pdf-line text-xl text-red-600"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">PDF отчёт</div>
                    <div className="text-sm text-gray-600">Для печати</div>
                  </div>
                </div>
                <i className="ri-arrow-right-line text-gray-400"></i>
              </button>
            </div>

            <div className="flex items-center justify-end space-x-3 p-6 border-t bg-gray-50">
              <Button variant="outline" onClick={() => setIsExportModalOpen(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
