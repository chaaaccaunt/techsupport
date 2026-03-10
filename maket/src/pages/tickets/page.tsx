import { useState, useEffect } from 'react';
import Button from '../../components/base/Button';
import Card from '../../components/base/Card';
import CreateTicketModal from '../../components/feature/CreateTicketModal';
import EditTicketModal from '../../components/feature/EditTicketModal';
import { Ticket } from '../../lib/supabase';
import { mockTickets } from '../../mocks/tickets';

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    department: '',
    dateFrom: '',
    dateTo: ''
  });

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        setTickets(mockTickets as unknown as Ticket[]);
        return;
      }

      const response = await fetch(`${supabaseUrl}/functions/v1/get-tickets`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'apikey': supabaseAnonKey
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке заявок');
      }

      const data = await response.json();
      setTickets(data && data.length > 0 ? data : (mockTickets as unknown as Ticket[]));
    } catch (error) {
      setTickets(mockTickets as unknown as Ticket[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Открыта';
      case 'in_progress': return 'В работе';
      case 'resolved': return 'Решена';
      case 'closed': return 'Закрыта';
      default: return status;
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'critical': return 'Критический';
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return priority;
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      priority: '',
      department: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const handleEditTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setIsEditModalOpen(true);
  };

  const filteredTickets = tickets.filter(ticket => {
    if (filters.status && ticket.status !== filters.status) return false;
    if (filters.priority && ticket.priority !== filters.priority) return false;
    if (filters.department && ticket.department !== filters.department) return false;
    if (filters.dateFrom && new Date(ticket.created_at) < new Date(filters.dateFrom)) return false;
    if (filters.dateTo && new Date(ticket.created_at) > new Date(filters.dateTo)) return false;
    return true;
  });

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className="p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900">Заявки</h1>
            <p className="text-sm text-gray-600 mt-1">Управление заявками на обслуживание</p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Button 
              variant="outline" 
              onClick={() => setShowFilters(!showFilters)}
              className="whitespace-nowrap"
            >
              <i className="ri-filter-line mr-2"></i>
              Фильтры
              {hasActiveFilters && (
                <span className="ml-2 w-2 h-2 bg-teal-600 rounded-full"></span>
              )}
            </Button>
            <Button onClick={() => setIsCreateModalOpen(true)} className="whitespace-nowrap">
              <i className="ri-add-line mr-2"></i>
              <span className="hidden sm:inline">Создать заявку</span>
              <span className="sm:hidden">Создать</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card className="mb-6 p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Фильтры</h3>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-sm text-teal-600 hover:text-teal-700 cursor-pointer"
              >
                Сбросить все
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Статус</label>
              <select
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              >
                <option value="">Все</option>
                <option value="open">Открыта</option>
                <option value="in_progress">В работе</option>
                <option value="resolved">Решена</option>
                <option value="closed">Закрыта</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Приоритет</label>
              <select
                value={filters.priority}
                onChange={(e) => handleFilterChange('priority', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              >
                <option value="">Все</option>
                <option value="critical">Критический</option>
                <option value="high">Высокий</option>
                <option value="medium">Средний</option>
                <option value="low">Низкий</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Отдел</label>
              <select
                value={filters.department}
                onChange={(e) => handleFilterChange('department', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
              >
                <option value="">Все</option>
                <option value="IT">IT</option>
                <option value="Бухгалтерия">Бухгалтерия</option>
                <option value="HR">HR</option>
                <option value="Продажи">Продажи</option>
                <option value="Маркетинг">Маркетинг</option>
                <option value="Производство">Производство</option>
                <option value="Логистика">Логистика</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Дата от</label>
              <input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Дата до</label>
              <input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleFilterChange('dateTo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-600">
            <i className="ri-information-line mr-2"></i>
            Найдено заявок: {filteredTickets.length} из {tickets.length}
          </div>
        </Card>
      )}

      {/* Tickets List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                <i className="ri-ticket-line text-3xl text-gray-400"></i>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {hasActiveFilters ? 'Заявки не найдены' : 'Нет заявок'}
              </h3>
              <p className="text-gray-600 mb-6">
                {hasActiveFilters 
                  ? 'Попробуйте изменить параметры фильтрации'
                  : 'Создайте первую заявку на обслуживание'
                }
              </p>
              {hasActiveFilters ? (
                <Button variant="outline" onClick={resetFilters}>Сбросить фильтры</Button>
              ) : (
                <Button onClick={() => setIsCreateModalOpen(true)}>
                  <i className="ri-add-line mr-2"></i>
                  Создать заявку
                </Button>
              )}
            </Card>
          ) : (
            filteredTickets.map((ticket) => (
              <Card key={ticket.id} className="p-4 md:p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className="text-base md:text-lg font-semibold text-gray-900">{ticket.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {getStatusText(ticket.status)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {getPriorityText(ticket.priority)}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3 text-sm">{ticket.description}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <i className="ri-building-line mr-1"></i>
                        {ticket.department}
                      </div>
                      {ticket.equipment && (
                        <div className="flex items-center">
                          <i className="ri-computer-line mr-1"></i>
                          {ticket.equipment.name}
                        </div>
                      )}
                      <div className="flex items-center">
                        <i className="ri-calendar-line mr-1"></i>
                        {new Date(ticket.created_at).toLocaleDateString('ru-RU')}
                      </div>
                      {ticket.assignee && (
                        <div className="flex items-center">
                          <i className="ri-user-line mr-1"></i>
                          {ticket.assignee.full_name}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 flex-shrink-0">
                    <button 
                      onClick={() => handleEditTicket(ticket)}
                      className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                    >
                      <i className="ri-edit-line"></i>
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchTickets}
      />

      {/* Edit Ticket Modal */}
      <EditTicketModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedTicket(null);
        }}
        onSuccess={fetchTickets}
        ticket={selectedTicket}
      />
    </div>
  );
}
