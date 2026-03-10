import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { path: '/', icon: 'ri-dashboard-line', label: 'Панель управления' },
    { path: '/equipment', icon: 'ri-computer-line', label: 'Оборудование' },
    { path: '/maintenance', icon: 'ri-tools-line', label: 'Техническое обслуживание' },
    { path: '/tickets', icon: 'ri-customer-service-line', label: 'Заявки' },
    { path: '/chat', icon: 'ri-chat-3-line', label: 'Чат' },
    { path: '/users', icon: 'ri-user-line', label: 'Пользователи' },
    { path: '/locations', icon: 'ri-map-pin-line', label: 'Локации' },
    { path: '/reports', icon: 'ri-bar-chart-line', label: 'Отчеты' },
  ];

  return (
    <aside className={`bg-gray-900 text-white transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col h-full`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {!isCollapsed && (
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 flex-shrink-0 bg-teal-600 rounded-lg flex items-center justify-center">
              <i className="ri-settings-3-line text-xl"></i>
            </div>
            <div className="min-w-0">
              <h1 className="font-bold text-lg truncate">EquipManager</h1>
              <p className="text-xs text-gray-400 truncate">Управление оборудованием</p>
            </div>
          </div>
        )}
        <div className="flex items-center space-x-1 flex-shrink-0">
          {/* Close button — mobile only */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer lg:hidden"
              aria-label="Закрыть меню"
            >
              <i className="ri-close-line text-lg"></i>
            </button>
          )}
          {/* Collapse button — desktop only */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer hidden lg:block"
          >
            <i className={`ri-${isCollapsed ? 'menu-unfold' : 'menu-fold'}-line`}></i>
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                location.pathname === item.path
                  ? 'bg-teal-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <i className={`${item.icon} text-xl flex-shrink-0`}></i>
              {!isCollapsed && <span className="text-sm truncate">{item.label}</span>}
            </Link>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="w-10 h-10 flex-shrink-0 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">АД</span>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Администратор</p>
              <p className="text-xs text-gray-400 truncate">admin@company.ru</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
