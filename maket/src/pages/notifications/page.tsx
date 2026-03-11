import { useState } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';

type NotificationType = 'warning' | 'info' | 'success' | 'error';
type FilterType = 'all' | NotificationType;

interface Notification {
  id: number;
  text: string;
  type: NotificationType;
  time: string;
  date: string;
  read: boolean;
  category: string;
}

const allNotifications: Notification[] = [
  { id: 1, text: 'Просрочено ТО для оборудования ПК-001', type: 'warning', time: '5 мин назад', date: 'Сегодня', read: false, category: 'Обслуживание' },
  { id: 2, text: 'Новая заявка на ремонт принтера ПР-67890', type: 'info', time: '10 мин назад', date: 'Сегодня', read: false, category: 'Заявки' },
  { id: 3, text: 'Оборудование НБ-12345 передано новому ответственному — Петров П.П.', type: 'success', time: '1 час назад', date: 'Сегодня', read: false, category: 'Передача' },
  { id: 4, text: 'Сканер СК-11111 переведён в статус «Неисправен»', type: 'error', time: '2 часа назад', date: 'Сегодня', read: true, category: 'Оборудование' },
  { id: 5, text: 'Плановое ТО для ПК-002 запланировано на завтра', type: 'info', time: '3 часа назад', date: 'Сегодня', read: true, category: 'Обслуживание' },
  { id: 6, text: 'Заявка T-045 закрыта — проблема устранена', type: 'success', time: '5 часов назад', date: 'Сегодня', read: true, category: 'Заявки' },
  { id: 7, text: 'Просрочено ТО для 3 единиц оборудования в отделе ИТ', type: 'warning', time: 'Вчера, 16:30', date: 'Вчера', read: true, category: 'Обслуживание' },
  { id: 8, text: 'Новый пользователь Козлов К.К. добавлен в систему', type: 'info', time: 'Вчера, 14:15', date: 'Вчера', read: true, category: 'Пользователи' },
  { id: 9, text: 'Принтер ПР-00234 успешно отремонтирован', type: 'success', time: 'Вчера, 11:00', date: 'Вчера', read: true, category: 'Заявки' },
  { id: 10, text: 'Критическая неисправность: сервер СВ-001 не отвечает', type: 'error', time: 'Вчера, 09:45', date: 'Вчера', read: true, category: 'Оборудование' },
  { id: 11, text: 'Отчёт за ноябрь успешно сформирован', type: 'success', time: '18 дек, 17:00', date: '18 декабря', read: true, category: 'Отчёты' },
  { id: 12, text: 'Истекает гарантия на ПК-003 через 7 дней', type: 'warning', time: '18 дек, 10:30', date: '18 декабря', read: true, category: 'Оборудование' },
  { id: 13, text: 'Добавлено 5 новых единиц оборудования в локацию «Офис 3»', type: 'info', time: '17 дек, 15:20', date: '17 декабря', read: true, category: 'Оборудование' },
  { id: 14, text: 'Заявка T-038 назначена технику Сидорову С.С.', type: 'info', time: '17 дек, 12:00', date: '17 декабря', read: true, category: 'Заявки' },
  { id: 15, text: 'Плановое ТО завершено для 12 единиц оборудования', type: 'success', time: '16 дек, 18:00', date: '16 декабря', read: true, category: 'Обслуживание' },
];

const typeConfig: Record<NotificationType, { icon: string; color: string; bg: string; label: string }> = {
  warning: { icon: 'ri-error-warning-line', color: 'text-yellow-600', bg: 'bg-yellow-100', label: 'Предупреждение' },
  info:    { icon: 'ri-information-line',   color: 'text-teal-600',   bg: 'bg-teal-100',   label: 'Информация' },
  success: { icon: 'ri-checkbox-circle-line', color: 'text-green-600', bg: 'bg-green-100', label: 'Успешно' },
  error:   { icon: 'ri-close-circle-line',  color: 'text-red-600',   bg: 'bg-red-100',    label: 'Ошибка' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(allNotifications);
  const [filter, setFilter] = useState<FilterType>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n => {
    if (showUnreadOnly && n.read) return false;
    if (filter !== 'all' && n.type !== filter) return false;
    return true;
  });

  const grouped = filtered.reduce<Record<string, Notification[]>>((acc, n) => {
    if (!acc[n.date]) acc[n.date] = [];
    acc[n.date].push(n);
    return acc;
  }, {});

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const deleteNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filters: { value: FilterType; label: string; icon: string }[] = [
    { value: 'all',     label: 'Все',             icon: 'ri-list-check' },
    { value: 'warning', label: 'Предупреждения',  icon: 'ri-error-warning-line' },
    { value: 'error',   label: 'Ошибки',          icon: 'ri-close-circle-line' },
    { value: 'info',    label: 'Информация',       icon: 'ri-information-line' },
    { value: 'success', label: 'Успешные',         icon: 'ri-checkbox-circle-line' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Уведомления</h1>
          <p className="text-gray-500 text-sm mt-1">
            {unreadCount > 0 ? `${unreadCount} непрочитанных` : 'Все уведомления прочитаны'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <i className="ri-check-double-line mr-2"></i>
              Прочитать все
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex flex-wrap gap-2 flex-1">
            {filters.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filter === f.value
                    ? 'bg-teal-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <i className={`${f.icon} text-sm`}></i>
                {f.label}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowUnreadOnly(!showUnreadOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
              showUnreadOnly
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <i className="ri-eye-off-line text-sm"></i>
            Только непрочитанные
          </button>
        </div>
      </Card>

      {/* Notifications list */}
      {Object.keys(grouped).length === 0 ? (
        <Card>
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
              <i className="ri-notification-off-line text-3xl"></i>
            </div>
            <p className="text-base font-medium text-gray-500">Нет уведомлений</p>
            <p className="text-sm mt-1">Попробуйте изменить фильтры</p>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-1">{date}</p>
              <div className="space-y-2">
                {items.map(notification => {
                  const cfg = typeConfig[notification.type];
                  return (
                    <div
                      key={notification.id}
                      className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${
                        !notification.read
                          ? 'bg-white border-teal-200 shadow-sm'
                          : 'bg-gray-50/60 border-gray-100'
                      }`}
                    >
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full flex-shrink-0 ${cfg.bg}`}>
                        <i className={`${cfg.icon} text-lg ${cfg.color}`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm leading-snug ${!notification.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                          {notification.text}
                        </p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs text-gray-400">{notification.time}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color}`}>
                            {notification.category}
                          </span>
                          {!notification.read && (
                            <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {!notification.read && (
                          <button
                            onClick={() => markRead(notification.id)}
                            title="Отметить как прочитанное"
                            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <i className="ri-check-line text-base"></i>
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          title="Удалить"
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        >
                          <i className="ri-delete-bin-line text-base"></i>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
