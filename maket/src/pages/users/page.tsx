import { useState } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  roleText: string;
  department: string;
  position: string;
  status: string;
  lastLogin: string;
  equipmentCount: number;
  ticketsCount: number;
};

export default function UsersPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [viewingUser, setViewingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState('all');

  const roles = [
    { value: 'all', label: 'Все роли' },
    { value: 'admin', label: 'Администратор' },
    { value: 'manager', label: 'Менеджер' },
    { value: 'technician', label: 'Техник' },
    { value: 'user', label: 'Пользователь' }
  ];

  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Иванов Иван Иванович',
      email: 'ivanov@company.ru',
      phone: '+7 (999) 123-45-67',
      role: 'admin',
      roleText: 'Администратор',
      department: 'IT отдел',
      position: 'Системный администратор',
      status: 'active',
      lastLogin: '2024-12-18 09:30',
      equipmentCount: 3,
      ticketsCount: 12
    },
    {
      id: 2,
      name: 'Петров Петр Петрович',
      email: 'petrov@company.ru',
      phone: '+7 (999) 234-56-78',
      role: 'manager',
      roleText: 'Менеджер',
      department: 'Бухгалтерия',
      position: 'Главный бухгалтер',
      status: 'active',
      lastLogin: '2024-12-18 08:15',
      equipmentCount: 2,
      ticketsCount: 5
    },
    {
      id: 3,
      name: 'Сидоров Сидор Сидорович',
      email: 'sidorov@company.ru',
      phone: '+7 (999) 345-67-89',
      role: 'technician',
      roleText: 'Техник',
      department: 'Технический отдел',
      position: 'Техник по обслуживанию',
      status: 'active',
      lastLogin: '2024-12-17 17:45',
      equipmentCount: 1,
      ticketsCount: 23
    },
    {
      id: 4,
      name: 'Козлов Константин Константинович',
      email: 'kozlov@company.ru',
      phone: '+7 (999) 456-78-90',
      role: 'user',
      roleText: 'Пользователь',
      department: 'Отдел продаж',
      position: 'Менеджер по продажам',
      status: 'active',
      lastLogin: '2024-12-18 10:20',
      equipmentCount: 2,
      ticketsCount: 3
    },
    {
      id: 5,
      name: 'Васильева Анна Васильевна',
      email: 'vasilieva@company.ru',
      phone: '+7 (999) 567-89-01',
      role: 'user',
      roleText: 'Пользователь',
      department: 'HR отдел',
      position: 'Специалист по кадрам',
      status: 'inactive',
      lastLogin: '2024-12-10 16:30',
      equipmentCount: 1,
      ticketsCount: 1
    }
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'manager': return 'bg-blue-100 text-blue-800';
      case 'technician': return 'bg-green-100 text-green-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'inactive': return 'Неактивен';
      default: return 'Неизвестно';
    }
  };

  const filteredUsers = users.filter(user =>
    selectedRole === 'all' || user.role === selectedRole
  );

  const [editForm, setEditForm] = useState({
    lastName: '',
    firstName: '',
    middleName: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    position: '',
    status: ''
  });

  const openEditModal = (user: User) => {
    const nameParts = user.name.split(' ');
    setEditForm({
      lastName: nameParts[0] || '',
      firstName: nameParts[1] || '',
      middleName: nameParts[2] || '',
      email: user.email,
      phone: user.phone,
      role: user.role,
      department: user.department,
      position: user.position,
      status: user.status
    });
    setEditingUser(user);
  };

  const handleDeleteUser = (user: User) => {
    setUsers(users.filter(u => u.id !== user.id));
    setDeletingUser(null);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Пользователи</h1>
          <p className="text-gray-600 mt-1 text-sm">Управление пользователями и их правами доступа</p>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button variant="outline" className="whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Экспорт
          </Button>
          <Button onClick={() => setShowAddModal(true)} className="whitespace-nowrap">
            <i className="ri-user-add-line mr-2"></i>
            <span className="hidden sm:inline">Добавить пользователя</span>
            <span className="sm:hidden">Добавить</span>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-user-line text-lg md:text-xl text-teal-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{users.length}</p>
          <p className="text-xs md:text-sm text-gray-600">Всего пользователей</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-user-check-line text-lg md:text-xl text-green-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{users.filter(u => u.status === 'active').length}</p>
          <p className="text-xs md:text-sm text-gray-600">Активных</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-admin-line text-lg md:text-xl text-purple-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'admin').length}</p>
          <p className="text-xs md:text-sm text-gray-600">Администраторов</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-tools-line text-lg md:text-xl text-orange-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'technician').length}</p>
          <p className="text-xs md:text-sm text-gray-600">Техников</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <Input placeholder="Поиск по имени, email, телефону..." className="w-full" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Роль:</span>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {roles.map(role => (
                <option key={role.value} value={role.value}>{role.label}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Users Table */}
      <Card>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-[800px] px-4 md:px-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Пользователь</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Контакты</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Роль</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Отдел / Должность</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Статус</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Активность</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                          <span className="text-white font-medium text-sm">
                            {user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-500">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm text-gray-900">{user.email}</p>
                        <p className="text-sm text-gray-500">{user.phone}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                        {user.roleText}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm text-gray-900">{user.department}</p>
                        <p className="text-sm text-gray-500">{user.position}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="text-sm text-gray-900">Последний вход:</p>
                        <p className="text-sm text-gray-500">{user.lastLogin}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            <i className="ri-computer-line mr-1"></i>{user.equipmentCount} ед.
                          </span>
                          <span className="text-xs text-gray-500">
                            <i className="ri-customer-service-line mr-1"></i>{user.ticketsCount} заявок
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-1">
                        <button onClick={() => setViewingUser(user)} className="p-2 text-gray-400 hover:text-teal-600 cursor-pointer" title="Просмотр">
                          <i className="ri-eye-line"></i>
                        </button>
                        <button onClick={() => openEditModal(user)} className="p-2 text-gray-400 hover:text-green-600 cursor-pointer" title="Редактировать">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button onClick={() => setDeletingUser(user)} className="p-2 text-gray-400 hover:text-red-600 cursor-pointer" title="Удалить">
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

      {/* View User Modal */}
      {viewingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Профиль пользователя</h3>
              <button
                onClick={() => setViewingUser(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            {/* Avatar & Name */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xl">
                  {viewingUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </span>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-900">{viewingUser.name}</h4>
                <p className="text-sm text-gray-500">{viewingUser.position}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getRoleColor(viewingUser.role)}`}>
                    {viewingUser.roleText}
                  </span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusColor(viewingUser.status)}`}>
                    {getStatusText(viewingUser.status)}
                  </span>
                </div>
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Email</p>
                <p className="text-sm font-medium text-gray-900 break-all">{viewingUser.email}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Телефон</p>
                <p className="text-sm font-medium text-gray-900">{viewingUser.phone}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Отдел</p>
                <p className="text-sm font-medium text-gray-900">{viewingUser.department}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Должность</p>
                <p className="text-sm font-medium text-gray-900">{viewingUser.position}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Оборудование</p>
                <div className="flex items-center space-x-1">
                  <i className="ri-computer-line text-gray-600 text-sm"></i>
                  <p className="text-sm font-medium text-gray-900">{viewingUser.equipmentCount} единиц</p>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500 mb-1">Заявки</p>
                <div className="flex items-center space-x-1">
                  <i className="ri-customer-service-line text-gray-600 text-sm"></i>
                  <p className="text-sm font-medium text-gray-900">{viewingUser.ticketsCount} заявок</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-6">
              <p className="text-xs text-gray-500 mb-1">Последний вход в систему</p>
              <div className="flex items-center space-x-2">
                <i className="ri-time-line text-gray-500 text-sm"></i>
                <p className="text-sm font-medium text-gray-900">{viewingUser.lastLogin}</p>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setViewingUser(null)}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Закрыть
              </button>
              <button
                onClick={() => {
                  setViewingUser(null);
                  openEditModal(viewingUser);
                }}
                className="px-4 py-2 text-sm text-white bg-gray-900 rounded-lg hover:bg-gray-700 cursor-pointer whitespace-nowrap flex items-center space-x-2"
              >
                <i className="ri-edit-line"></i>
                <span>Редактировать</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Добавить пользователя</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                  <Input placeholder="Введите фамилию" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <Input placeholder="Введите имя" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отчество</label>
                  <Input placeholder="Введите отчество" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input type="email" placeholder="user@company.ru" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <Input placeholder="+7 (999) 123-45-67" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                    <option value="">Выберите роль</option>
                    <option value="admin">Администратор</option>
                    <option value="manager">Менеджер</option>
                    <option value="technician">Техник</option>
                    <option value="user">Пользователь</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отдел</label>
                  <Input placeholder="Название отдела" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
                  <Input placeholder="Должность сотрудника" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
                <Input type="password" placeholder="Временный пароль" />
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button variant="outline" onClick={() => setShowAddModal(false)} className="whitespace-nowrap">
                  Отмена
                </Button>
                <Button type="submit" className="whitespace-nowrap">
                  Добавить пользователя
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <i className="ri-edit-line text-green-600"></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Редактировать пользователя</h3>
                  <p className="text-sm text-gray-500">ID: {editingUser.id} — {editingUser.name}</p>
                </div>
              </div>
              <button
                onClick={() => setEditingUser(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setEditingUser(null);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                  <Input
                    value={editForm.lastName}
                    onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
                    placeholder="Введите фамилию"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                  <Input
                    value={editForm.firstName}
                    onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
                    placeholder="Введите имя"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отчество</label>
                  <Input
                    value={editForm.middleName}
                    onChange={(e) => setEditForm({ ...editForm, middleName: e.target.value })}
                    placeholder="Введите отчество"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <Input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    placeholder="user@company.ru"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                  <Input
                    value={editForm.phone}
                    onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
                  <select
                    value={editForm.role}
                    onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                  >
                    <option value="admin">Администратор</option>
                    <option value="manager">Менеджер</option>
                    <option value="technician">Техник</option>
                    <option value="user">Пользователь</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отдел</label>
                  <Input
                    value={editForm.department}
                    onChange={(e) => setEditForm({ ...editForm, department: e.target.value })}
                    placeholder="Название отдела"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Должность</label>
                  <Input
                    value={editForm.position}
                    onChange={(e) => setEditForm({ ...editForm, position: e.target.value })}
                    placeholder="Должность сотрудника"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8"
                >
                  <option value="active">Активен</option>
                  <option value="inactive">Неактивен</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Новый пароль <span className="text-gray-400 font-normal">(оставьте пустым, чтобы не менять)</span>
                </label>
                <Input type="password" placeholder="Введите новый пароль" />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <Button variant="outline" type="button" onClick={() => setEditingUser(null)} className="whitespace-nowrap">
                  Отмена
                </Button>
                <Button type="submit" className="whitespace-nowrap">
                  <i className="ri-save-line mr-2"></i>
                  Сохранить изменения
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete User Modal */}
      {deletingUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <i className="ri-delete-bin-line text-red-600"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Удаление пользователя</h3>
              </div>
              <button
                onClick={() => setDeletingUser(null)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="mb-6">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-medium text-sm">
                    {deletingUser.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{deletingUser.name}</p>
                  <p className="text-sm text-gray-500">{deletingUser.roleText} • {deletingUser.department}</p>
                  <p className="text-sm text-gray-500">{deletingUser.email}</p>
                </div>
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-start space-x-3">
                  <i className="ri-alert-line text-red-600 text-lg mt-0.5"></i>
                  <div>
                    <p className="font-medium text-red-800 mb-1">Внимание! Это действие необратимо</p>
                    <p className="text-sm text-red-700">
                      После удаления пользователя будут потеряны все связанные с ним данные:
                    </p>
                    <ul className="text-sm text-red-700 mt-2 space-y-1">
                      <li>• История заявок и обращений</li>
                      <li>• Назначенное оборудование</li>
                      <li>• Права доступа к системе</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600">
                Вы действительно хотите удалить этого пользователя из системы?
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeletingUser(null)}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap"
              >
                Отмена
              </button>
              <button
                onClick={() => handleDeleteUser(deletingUser)}
                className="px-4 py-2 text-sm text-white bg-red-600 rounded-lg hover:bg-red-700 cursor-pointer whitespace-nowrap flex items-center space-x-2"
              >
                <i className="ri-delete-bin-line"></i>
                <span>Удалить пользователя</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
