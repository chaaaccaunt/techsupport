import { useState, useEffect } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'notifications' | 'security' | 'appearance'>('general');
  const [showSuccess, setShowSuccess] = useState(false);

  // Общие настройки
  const [generalSettings, setGeneralSettings] = useState({
    companyName: 'IT Equipment Management',
    email: 'admin@company.com',
    phone: '+7 (999) 123-45-67',
    address: 'Москва, ул. Примерная, д. 123',
    timezone: 'Europe/Moscow',
    language: 'ru'
  });

  // Настройки уведомлений
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newTickets: true,
    maintenanceReminders: true,
    equipmentAlerts: true,
    weeklyReports: false,
    smsNotifications: false
  });

  // Настройки безопасности
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorAuth: false,
    sessionTimeout: '30'
  });

  // Настройки внешнего вида
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    primaryColor: 'teal',
    compactMode: false,
    showAvatars: true
  });

  const handleSaveGeneral = async () => {
    setLoading(true);
    // Здесь будет сохранение в базу данных
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const handleSaveSecurity = async () => {
    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setSecuritySettings(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
    }, 1000);
  };

  const handleSaveAppearance = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'general', label: 'Общие', icon: 'ri-settings-3-line' },
    { id: 'notifications', label: 'Уведомления', icon: 'ri-notification-line' },
    { id: 'security', label: 'Безопасность', icon: 'ri-shield-line' },
    { id: 'appearance', label: 'Внешний вид', icon: 'ri-palette-line' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Заголовок */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Настройки</h1>
        <p className="text-sm text-gray-600 mt-1">Управление параметрами системы и личными настройками</p>
      </div>

      {/* Уведомление об успешном сохранении */}
      {showSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
          <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full mr-3">
            <i className="ri-check-line text-green-600 text-lg"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-green-900">Настройки успешно сохранены</p>
            <p className="text-xs text-green-700">Изменения вступили в силу</p>
          </div>
        </div>
      )}

      {/* Вкладки */}
      <div className="flex space-x-2 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-4 py-3 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap flex items-center ${
              activeTab === tab.id
                ? 'text-teal-600 border-b-2 border-teal-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className={`${tab.icon} mr-2`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Общие настройки */}
      {activeTab === 'general' && (
        <Card>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Основная информация</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Название компании
                  </label>
                  <Input
                    value={generalSettings.companyName}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Введите название"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <Input
                    type="email"
                    value={generalSettings.email}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="email@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Телефон
                  </label>
                  <Input
                    value={generalSettings.phone}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Часовой пояс
                  </label>
                  <select
                    value={generalSettings.timezone}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, timezone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
                  >
                    <option value="Europe/Moscow">Москва (UTC+3)</option>
                    <option value="Europe/London">Лондон (UTC+0)</option>
                    <option value="America/New_York">Нью-Йорк (UTC-5)</option>
                    <option value="Asia/Tokyo">Токио (UTC+9)</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Адрес
                  </label>
                  <Input
                    value={generalSettings.address}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Город, улица, дом"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Язык интерфейса
                  </label>
                  <select
                    value={generalSettings.language}
                    onChange={(e) => setGeneralSettings(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
                  >
                    <option value="ru">Русский</option>
                    <option value="en">English</option>
                    <option value="es">Español</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSaveGeneral} disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Сохранение...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line mr-2"></i>
                    Сохранить изменения
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Настройки уведомлений */}
      {activeTab === 'notifications' && (
        <Card>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Уведомления</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-lg mr-3">
                      <i className="ri-mail-line text-teal-600 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Email уведомления</p>
                      <p className="text-xs text-gray-600">Получать уведомления на почту</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.emailNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-orange-100 rounded-lg mr-3">
                      <i className="ri-ticket-line text-orange-600 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Новые заявки</p>
                      <p className="text-xs text-gray-600">Уведомления о создании заявок</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.newTickets}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, newTickets: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-lg mr-3">
                      <i className="ri-tools-line text-blue-600 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Напоминания об обслуживании</p>
                      <p className="text-xs text-gray-600">Уведомления о плановом обслуживании</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.maintenanceReminders}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, maintenanceReminders: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-red-100 rounded-lg mr-3">
                      <i className="ri-alert-line text-red-600 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Критические события</p>
                      <p className="text-xs text-gray-600">Уведомления о проблемах с оборудованием</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.equipmentAlerts}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, equipmentAlerts: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-lg mr-3">
                      <i className="ri-file-chart-line text-purple-600 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Еженедельные отчеты</p>
                      <p className="text-xs text-gray-600">Сводка по системе раз в неделю</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.weeklyReports}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, weeklyReports: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-green-100 rounded-lg mr-3">
                      <i className="ri-message-line text-green-600 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">SMS уведомления</p>
                      <p className="text-xs text-gray-600">Получать SMS на телефон</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={notificationSettings.smsNotifications}
                      onChange={(e) => setNotificationSettings(prev => ({ ...prev, smsNotifications: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSaveNotifications} disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Сохранение...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line mr-2"></i>
                    Сохранить изменения
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Настройки безопасности */}
      {activeTab === 'security' && (
        <Card>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Смена пароля</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Текущий пароль
                  </label>
                  <Input
                    type="password"
                    value={securitySettings.currentPassword}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Введите текущий пароль"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Новый пароль
                  </label>
                  <Input
                    type="password"
                    value={securitySettings.newPassword}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                    placeholder="Введите новый пароль"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Подтверждение пароля
                  </label>
                  <Input
                    type="password"
                    value={securitySettings.confirmPassword}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    placeholder="Повторите новый пароль"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Дополнительная безопасность</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-teal-100 rounded-lg mr-3">
                      <i className="ri-shield-check-line text-teal-600 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Двухфакторная аутентификация</p>
                      <p className="text-xs text-gray-600">Дополнительный уровень защиты аккаунта</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={securitySettings.twoFactorAuth}
                      onChange={(e) => setSecuritySettings(prev => ({ ...prev, twoFactorAuth: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тайм-аут сессии (минуты)
                  </label>
                  <select
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm cursor-pointer"
                  >
                    <option value="15">15 минут</option>
                    <option value="30">30 минут</option>
                    <option value="60">1 час</option>
                    <option value="120">2 часа</option>
                    <option value="0">Не выходить автоматически</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSaveSecurity} disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Сохранение...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line mr-2"></i>
                    Сохранить изменения
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Настройки внешнего вида */}
      {activeTab === 'appearance' && (
        <Card>
          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Тема интерфейса</h3>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setAppearanceSettings(prev => ({ ...prev, theme: 'light' }))}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    appearanceSettings.theme === 'light'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-white rounded-lg shadow-sm mx-auto mb-3">
                    <i className="ri-sun-line text-2xl text-yellow-500"></i>
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">Светлая</p>
                </button>

                <button
                  onClick={() => setAppearanceSettings(prev => ({ ...prev, theme: 'dark' }))}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    appearanceSettings.theme === 'dark'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gray-900 rounded-lg shadow-sm mx-auto mb-3">
                    <i className="ri-moon-line text-2xl text-blue-400"></i>
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">Темная</p>
                </button>

                <button
                  onClick={() => setAppearanceSettings(prev => ({ ...prev, theme: 'auto' }))}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    appearanceSettings.theme === 'auto'
                      ? 'border-teal-500 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-gray-900 to-white rounded-lg shadow-sm mx-auto mb-3">
                    <i className="ri-contrast-line text-2xl text-gray-500"></i>
                  </div>
                  <p className="text-sm font-medium text-gray-900 text-center">Авто</p>
                </button>
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Основной цвет</h3>
              <div className="grid grid-cols-6 gap-3">
                {[
                  { name: 'teal', color: 'bg-teal-500' },
                  { name: 'blue', color: 'bg-blue-500' },
                  { name: 'green', color: 'bg-green-500' },
                  { name: 'orange', color: 'bg-orange-500' },
                  { name: 'red', color: 'bg-red-500' },
                  { name: 'purple', color: 'bg-purple-500' }
                ].map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setAppearanceSettings(prev => ({ ...prev, primaryColor: color.name }))}
                    className={`w-12 h-12 ${color.color} rounded-lg transition-all cursor-pointer ${
                      appearanceSettings.primaryColor === color.name
                        ? 'ring-4 ring-offset-2 ring-gray-300'
                        : 'hover:scale-110'
                    }`}
                  >
                    {appearanceSettings.primaryColor === color.name && (
                      <i className="ri-check-line text-white text-xl"></i>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Дополнительные настройки</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg mr-3">
                      <i className="ri-layout-line text-gray-600 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Компактный режим</p>
                      <p className="text-xs text-gray-600">Уменьшенные отступы и элементы</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appearanceSettings.compactMode}
                      onChange={(e) => setAppearanceSettings(prev => ({ ...prev, compactMode: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-lg mr-3">
                      <i className="ri-user-line text-gray-600 text-lg"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Показывать аватары</p>
                      <p className="text-xs text-gray-600">Отображение фото пользователей</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appearanceSettings.showAvatars}
                      onChange={(e) => setAppearanceSettings(prev => ({ ...prev, showAvatars: e.target.checked }))}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-teal-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t">
              <Button onClick={handleSaveAppearance} disabled={loading}>
                {loading ? (
                  <>
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Сохранение...
                  </>
                ) : (
                  <>
                    <i className="ri-save-line mr-2"></i>
                    Сохранить изменения
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
