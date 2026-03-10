import { useState } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

interface Location {
  id: number;
  name: string;
  building: string;
  floor: number;
  area: number;
  capacity: number;
  equipmentCount: number;
  responsible: string;
  department: string;
  description: string;
  status: string;
}

const equipmentByLocation: Record<number, { id: number; name: string; type: string; status: string }[]> = {
  1: [
    { id: 1, name: 'Сервер Dell PowerEdge', type: 'Сервер', status: 'active' },
    { id: 2, name: 'Коммутатор Cisco', type: 'Сетевое', status: 'active' },
    { id: 3, name: 'ПК HP EliteDesk', type: 'Компьютер', status: 'active' },
    { id: 4, name: 'Монитор LG 27"', type: 'Монитор', status: 'active' },
    { id: 5, name: 'ИБП APC 1500VA', type: 'ИБП', status: 'active' },
    { id: 6, name: 'Принтер HP LaserJet', type: 'Принтер', status: 'maintenance' },
    { id: 7, name: 'Роутер MikroTik', type: 'Сетевое', status: 'active' },
    { id: 8, name: 'Веб-камера Logitech', type: 'Периферия', status: 'active' },
  ],
  2: [
    { id: 9, name: 'ПК Lenovo ThinkCentre', type: 'Компьютер', status: 'active' },
    { id: 10, name: 'Монитор Samsung 24"', type: 'Монитор', status: 'active' },
    { id: 11, name: 'Принтер Canon MF', type: 'Принтер', status: 'active' },
    { id: 12, name: 'Сканер Epson', type: 'Сканер', status: 'active' },
  ],
  3: [
    { id: 13, name: 'Сервер IBM System x', type: 'Сервер', status: 'active' },
    { id: 14, name: 'Сервер HP ProLiant', type: 'Сервер', status: 'active' },
    { id: 15, name: 'СХД NetApp', type: 'Хранилище', status: 'active' },
    { id: 16, name: 'Коммутатор HP ProCurve', type: 'Сетевое', status: 'active' },
    { id: 17, name: 'Кондиционер Daikin', type: 'Климат', status: 'active' },
  ],
  4: [
    { id: 18, name: 'Проектор Epson EB', type: 'Проектор', status: 'active' },
    { id: 19, name: 'Экран для проектора', type: 'Периферия', status: 'active' },
    { id: 20, name: 'Видеокамера Sony', type: 'Камера', status: 'active' },
    { id: 21, name: 'Система ВКС Polycom', type: 'ВКС', status: 'maintenance' },
    { id: 22, name: 'Микрофонная система', type: 'Аудио', status: 'active' },
    { id: 23, name: 'ТВ-панель Samsung 75"', type: 'Дисплей', status: 'active' },
  ],
  5: [
    { id: 24, name: 'Стеллаж серверный 42U', type: 'Стеллаж', status: 'active' },
    { id: 25, name: 'Погрузчик электрический', type: 'Техника', status: 'active' },
  ],
};

export default function LocationsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBuilding, setSelectedBuilding] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewLocation, setViewLocation] = useState<Location | null>(null);
  const [editLocation, setEditLocation] = useState<Location | null>(null);
  const [deleteLocation, setDeleteLocation] = useState<Location | null>(null);
  const [equipmentLocation, setEquipmentLocation] = useState<Location | null>(null);
  const [editForm, setEditForm] = useState<Partial<Location>>({});
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [locations, setLocations] = useState<Location[]>([
    {
      id: 1,
      name: 'Офис 101',
      building: 'Главное здание',
      floor: 1,
      area: 25,
      capacity: 4,
      equipmentCount: 8,
      responsible: 'Иванов И.И.',
      department: 'IT отдел',
      description: 'Кабинет системного администратора',
      status: 'active'
    },
    {
      id: 2,
      name: 'Офис 205',
      building: 'Главное здание',
      floor: 2,
      area: 30,
      capacity: 6,
      equipmentCount: 12,
      responsible: 'Петров П.П.',
      department: 'Бухгалтерия',
      description: 'Отдел бухгалтерского учета',
      status: 'active'
    },
    {
      id: 3,
      name: 'Серверная',
      building: 'Главное здание',
      floor: 1,
      area: 15,
      capacity: 2,
      equipmentCount: 25,
      responsible: 'Системный администратор',
      department: 'IT отдел',
      description: 'Серверное помещение с климат-контролем',
      status: 'restricted'
    },
    {
      id: 4,
      name: 'Конференц-зал А',
      building: 'Главное здание',
      floor: 3,
      area: 50,
      capacity: 20,
      equipmentCount: 6,
      responsible: 'Администратор',
      department: 'Общее пользование',
      description: 'Большой конференц-зал для совещаний',
      status: 'active'
    },
    {
      id: 5,
      name: 'Склад оборудования',
      building: 'Склад',
      floor: 1,
      area: 100,
      capacity: 10,
      equipmentCount: 156,
      responsible: 'Кладовщик',
      department: 'Логистика',
      description: 'Основной склад для хранения оборудования',
      status: 'active'
    }
  ]);

  const buildings = [
    { value: 'all', label: 'Все здания' },
    { value: 'main', label: 'Главное здание' },
    { value: 'warehouse', label: 'Склад' },
    { value: 'office2', label: 'Офис 2' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'restricted': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активная';
      case 'restricted': return 'Ограниченный доступ';
      case 'maintenance': return 'На обслуживании';
      default: return 'Неизвестно';
    }
  };

  const getEqStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getEqStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активно';
      case 'maintenance': return 'На ТО';
      default: return 'Неизвестно';
    }
  };

  const filteredLocations = locations.filter(location => {
    const matchBuilding = selectedBuilding === 'all' || location.building === buildings.find(b => b.value === selectedBuilding)?.label;
    const matchSearch = !searchQuery ||
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.responsible.toLowerCase().includes(searchQuery.toLowerCase()) ||
      location.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchBuilding && matchSearch;
  });

  const handleEditOpen = (location: Location) => {
    setEditLocation(location);
    setEditForm({ ...location });
  };

  const handleEditSave = () => {
    if (!editLocation) return;
    setLocations(prev => prev.map(l => l.id === editLocation.id ? { ...l, ...editForm } as Location : l));
    setEditLocation(null);
  };

  const handleDelete = () => {
    if (!deleteLocation) return;
    setLocations(prev => prev.filter(l => l.id !== deleteLocation.id));
    setDeleteLocation(null);
    setDeleteSuccess(true);
    setTimeout(() => setDeleteSuccess(false), 3000);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      {/* Success toast */}
      {deleteSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-2">
          <i className="ri-checkbox-circle-line"></i>
          <span>Локация успешно удалена</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Локации</h1>
          <p className="text-gray-600 mt-1 text-sm">Управление местоположениями и размещением оборудования</p>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button onClick={() => setShowAddModal(true)} className="whitespace-nowrap">
            <i className="ri-add-line mr-2"></i>
            <span className="hidden sm:inline">Добавить локацию</span>
            <span className="sm:hidden">Добавить</span>
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-building-line text-lg md:text-xl text-teal-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{locations.length}</p>
          <p className="text-xs md:text-sm text-gray-600">Всего локаций</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-checkbox-circle-line text-lg md:text-xl text-green-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{locations.filter(l => l.status === 'active').length}</p>
          <p className="text-xs md:text-sm text-gray-600">Активных</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-computer-line text-lg md:text-xl text-orange-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{locations.reduce((sum, l) => sum + l.equipmentCount, 0)}</p>
          <p className="text-xs md:text-sm text-gray-600">Единиц оборудования</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-group-line text-lg md:text-xl text-teal-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">{locations.reduce((sum, l) => sum + l.capacity, 0)}</p>
          <p className="text-xs md:text-sm text-gray-600">Общая вместимость</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <Input
              placeholder="Поиск по названию, ответственному..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Здание:</span>
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {buildings.map(building => (
                <option key={building.value} value={building.value}>{building.label}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredLocations.map((location) => (
          <Card key={location.id} className="hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="min-w-0 flex-1 mr-2">
                <h3 className="font-semibold text-gray-900 text-base md:text-lg">{location.name}</h3>
                <p className="text-sm text-gray-500">{location.building} • Этаж {location.floor}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getStatusColor(location.status)}`}>
                {getStatusText(location.status)}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Площадь:</span>
                <span className="font-medium">{location.area} м²</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Вместимость:</span>
                <span className="font-medium">{location.capacity} чел.</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Оборудование:</span>
                <span className="font-medium">{location.equipmentCount} ед.</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Ответственный:</span>
                <span className="font-medium truncate ml-2">{location.responsible}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Отдел:</span>
                <span className="font-medium truncate ml-2">{location.department}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg mb-4">
              <p className="text-sm text-gray-700">{location.description}</p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                <button
                  onClick={() => setViewLocation(location)}
                  title="Просмотр"
                  className="p-2 text-gray-400 hover:text-teal-600 cursor-pointer transition-colors"
                >
                  <i className="ri-eye-line"></i>
                </button>
                <button
                  onClick={() => handleEditOpen(location)}
                  title="Редактировать"
                  className="p-2 text-gray-400 hover:text-green-600 cursor-pointer transition-colors"
                >
                  <i className="ri-edit-line"></i>
                </button>
                <button
                  onClick={() => setDeleteLocation(location)}
                  title="Удалить"
                  className="p-2 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
                >
                  <i className="ri-delete-bin-line"></i>
                </button>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="whitespace-nowrap"
                onClick={() => setEquipmentLocation(location)}
              >
                <i className="ri-list-unordered mr-1"></i>
                Оборудование
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* ===== VIEW MODAL ===== */}
      {viewLocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Информация о локации</h3>
              <button onClick={() => setViewLocation(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">{viewLocation.name}</h2>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(viewLocation.status)}`}>
                  {getStatusText(viewLocation.status)}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Здание', value: viewLocation.building },
                  { label: 'Этаж', value: `${viewLocation.floor} этаж` },
                  { label: 'Площадь', value: `${viewLocation.area} м²` },
                  { label: 'Вместимость', value: `${viewLocation.capacity} чел.` },
                  { label: 'Оборудование', value: `${viewLocation.equipmentCount} ед.` },
                  { label: 'Отдел', value: viewLocation.department },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                    <p className="text-sm font-medium text-gray-900">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Ответственный</p>
                <p className="text-sm font-medium text-gray-900">{viewLocation.responsible}</p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-xs text-gray-500 mb-1">Описание</p>
                <p className="text-sm text-gray-700">{viewLocation.description}</p>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setViewLocation(null)} className="whitespace-nowrap">Закрыть</Button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EDIT MODAL ===== */}
      {editLocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Редактировать локацию</h3>
              <button onClick={() => setEditLocation(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Название локации</label>
                  <Input
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Здание</label>
                  <select
                    value={editForm.building || ''}
                    onChange={(e) => setEditForm(f => ({ ...f, building: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="Главное здание">Главное здание</option>
                    <option value="Склад">Склад</option>
                    <option value="Офис 2">Офис 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Этаж</label>
                  <Input
                    type="number"
                    value={editForm.floor || ''}
                    onChange={(e) => setEditForm(f => ({ ...f, floor: Number(e.target.value) }))}
                    min="1"
                    max="20"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Площадь (м²)</label>
                  <Input
                    type="number"
                    value={editForm.area || ''}
                    onChange={(e) => setEditForm(f => ({ ...f, area: Number(e.target.value) }))}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Вместимость (чел.)</label>
                  <Input
                    type="number"
                    value={editForm.capacity || ''}
                    onChange={(e) => setEditForm(f => ({ ...f, capacity: Number(e.target.value) }))}
                    min="1"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <select
                    value={editForm.status || ''}
                    onChange={(e) => setEditForm(f => ({ ...f, status: e.target.value }))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="active">Активная</option>
                    <option value="restricted">Ограниченный доступ</option>
                    <option value="maintenance">На обслуживании</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ответственный</label>
                  <Input
                    value={editForm.responsible || ''}
                    onChange={(e) => setEditForm(f => ({ ...f, responsible: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отдел</label>
                  <Input
                    value={editForm.department || ''}
                    onChange={(e) => setEditForm(f => ({ ...f, department: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  rows={3}
                  value={editForm.description || ''}
                  onChange={(e) => setEditForm(f => ({ ...f, description: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  maxLength={500}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setEditLocation(null)} className="whitespace-nowrap">Отмена</Button>
              <Button onClick={handleEditSave} className="whitespace-nowrap">Сохранить изменения</Button>
            </div>
          </div>
        </div>
      )}

      {/* ===== DELETE CONFIRM MODAL ===== */}
      {deleteLocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Удалить локацию</h3>
              <button onClick={() => setDeleteLocation(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="flex items-start space-x-3 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="ri-error-warning-line text-red-500 text-lg"></i>
              </div>
              <div>
                <p className="text-gray-700 text-sm">Вы уверены, что хотите удалить локацию <strong>«{deleteLocation.name}»</strong>?</p>
                <p className="text-gray-500 text-xs mt-1">Это действие нельзя отменить. Все данные о локации будут удалены.</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setDeleteLocation(null)} className="whitespace-nowrap">Отмена</Button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors cursor-pointer whitespace-nowrap"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== EQUIPMENT MODAL ===== */}
      {equipmentLocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Оборудование</h3>
                <p className="text-sm text-gray-500">{equipmentLocation.name} • {equipmentLocation.building}</p>
              </div>
              <button onClick={() => setEquipmentLocation(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Всего единиц: <strong>{equipmentLocation.equipmentCount}</strong>
              </span>
            </div>
            <div className="space-y-2">
              {(equipmentByLocation[equipmentLocation.id] || []).map(eq => (
                <div key={eq.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
                      <i className="ri-computer-line text-teal-600 text-sm"></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{eq.name}</p>
                      <p className="text-xs text-gray-500">{eq.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getEqStatusColor(eq.status)}`}>
                    {getEqStatusText(eq.status)}
                  </span>
                </div>
              ))}
              {(!equipmentByLocation[equipmentLocation.id] || equipmentByLocation[equipmentLocation.id].length === 0) && (
                <div className="text-center py-8 text-gray-400">
                  <i className="ri-inbox-line text-3xl mb-2 block"></i>
                  <p className="text-sm">Оборудование не найдено</p>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setEquipmentLocation(null)} className="whitespace-nowrap">Закрыть</Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Location Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Добавить локацию</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Название локации</label>
                  <Input placeholder="Например: Офис 301" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Здание</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option value="">Выберите здание</option>
                    <option value="main">Главное здание</option>
                    <option value="warehouse">Склад</option>
                    <option value="office2">Офис 2</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Этаж</label>
                  <Input type="number" placeholder="1" min="1" max="20" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Площадь (м²)</label>
                  <Input type="number" placeholder="25" min="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Вместимость (чел.)</label>
                  <Input type="number" placeholder="4" min="1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Статус</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                    <option value="">Выберите статус</option>
                    <option value="active">Активная</option>
                    <option value="restricted">Ограниченный доступ</option>
                    <option value="maintenance">На обслуживании</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ответственный</label>
                  <Input placeholder="ФИО ответственного" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Отдел</label>
                  <Input placeholder="Название отдела" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Дополнительная информация о локации"
                  maxLength={500}
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="whitespace-nowrap"
                >
                  Отмена
                </Button>
                <Button type="submit" className="whitespace-nowrap">
                  Добавить локацию
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
