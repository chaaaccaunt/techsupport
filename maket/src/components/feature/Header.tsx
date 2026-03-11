import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../base/Button';

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();

  const notifications = [
    { id: 1, text: 'Просрочено ТО для оборудования ПК-001', type: 'warning', time: '5 мин назад' },
    { id: 2, text: 'Новая заявка на ремонт принтера', type: 'info', time: '10 мин назад' },
    { id: 3, text: 'Оборудование передано новому ответственному', type: 'success', time: '1 час назад' }
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 gap-3">
        {/* Left: hamburger (mobile) + title */}
        <div className="flex items-center space-x-3 min-w-0">
          {/* Hamburger — mobile only */}
          <button
            onClick={onMenuClick}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer lg:hidden flex-shrink-0"
            aria-label="Открыть меню"
          >
            <i className="ri-menu-line text-xl"></i>
          </button>
          <h2 className="text-base md:text-xl font-semibold text-gray-900 truncate">
            Система учёта оборудования
          </h2>
        </div>

        <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
          {/* Search — hidden on small screens */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Поиск по серийному номеру..."
              className="w-64 lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
            <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>

          {/* Search icon — mobile only */}
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer md:hidden">
            <i className="ri-search-line text-xl"></i>
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setIsNotificationsOpen(!isNotificationsOpen); setIsDropdownOpen(false); }}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg cursor-pointer relative"
            >
              <i className="ri-notification-line text-xl"></i>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-72 md:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900">Уведомления</h3>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.type === 'warning' ? 'bg-yellow-500' :
                          notification.type === 'info' ? 'bg-teal-500' : 'bg-green-500'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-900">{notification.text}</p>
                          <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setIsNotificationsOpen(false);
                      navigate('/notifications');
                    }}
                  >
                    Показать все уведомления
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => { setIsDropdownOpen(!isDropdownOpen); setIsNotificationsOpen(false); }}
              className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg px-2 md:px-3 py-2 transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-user-line text-white text-sm"></i>
              </div>
              <span className="text-sm font-medium hidden sm:block">Администратор</span>
              <i className="ri-arrow-down-s-line text-sm hidden sm:block"></i>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <i className="ri-user-settings-line mr-3"></i>
                  Профиль
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  <i className="ri-settings-line mr-3"></i>
                  Настройки
                </Link>
                <hr className="my-2" />
                <a href="#" className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md">
                  <i className="ri-logout-box-line mr-3"></i>
                  Выход
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
