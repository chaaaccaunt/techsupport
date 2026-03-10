import { useState } from 'react';
import { departments, positions } from '../../mocks/departments';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

interface Department {
  id: string;
  name: string;
  description: string;
  head: string;
  employeeCount: number;
  created_at: string;
}

interface Position {
  id: string;
  name: string;
  departmentId: string | null;
  level: string;
  description: string;
  employeeCount: number;
}

export default function DepartmentsPage() {
  const [activeTab, setActiveTab] = useState<'departments' | 'positions'>('departments');
  const [departmentsList, setDepartmentsList] = useState<Department[]>(departments);
  const [positionsList, setPositionsList] = useState<Position[]>(positions);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDepartmentModal, setShowDepartmentModal] = useState(false);
  const [showPositionModal, setShowPositionModal] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [editingPosition, setEditingPosition] = useState<Position | null>(null);

  const [departmentForm, setDepartmentForm] = useState({
    name: '',
    description: '',
    head: ''
  });

  const [positionForm, setPositionForm] = useState({
    name: '',
    departmentId: '',
    level: 'specialist',
    description: ''
  });

  const filteredDepartments = departmentsList.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPositions = positionsList.filter(pos =>
    pos.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pos.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = () => {
    if (!departmentForm.name.trim()) return;

    const newDepartment: Department = {
      id: String(Date.now()),
      name: departmentForm.name,
      description: departmentForm.description,
      head: departmentForm.head,
      employeeCount: 0,
      created_at: new Date().toISOString().split('T')[0]
    };

    setDepartmentsList([...departmentsList, newDepartment]);
    setDepartmentForm({ name: '', description: '', head: '' });
    setShowDepartmentModal(false);
  };

  const handleUpdateDepartment = () => {
    if (!editingDepartment || !departmentForm.name.trim()) return;

    setDepartmentsList(departmentsList.map(dept =>
      dept.id === editingDepartment.id
        ? { ...dept, ...departmentForm }
        : dept
    ));
    setEditingDepartment(null);
    setDepartmentForm({ name: '', description: '', head: '' });
    setShowDepartmentModal(false);
  };

  const handleDeleteDepartment = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить этот отдел?')) {
      setDepartmentsList(departmentsList.filter(dept => dept.id !== id));
    }
  };

  const handleAddPosition = () => {
    if (!positionForm.name.trim()) return;

    const newPosition: Position = {
      id: String(Date.now()),
      name: positionForm.name,
      departmentId: positionForm.departmentId || null,
      level: positionForm.level,
      description: positionForm.description,
      employeeCount: 0
    };

    setPositionsList([...positionsList, newPosition]);
    setPositionForm({ name: '', departmentId: '', level: 'specialist', description: '' });
    setShowPositionModal(false);
  };

  const handleUpdatePosition = () => {
    if (!editingPosition || !positionForm.name.trim()) return;

    setPositionsList(positionsList.map(pos =>
      pos.id === editingPosition.id
        ? { ...pos, ...positionForm, departmentId: positionForm.departmentId || null }
        : pos
    ));
    setEditingPosition(null);
    setPositionForm({ name: '', departmentId: '', level: 'specialist', description: '' });
    setShowPositionModal(false);
  };

  const handleDeletePosition = (id: string) => {
    if (window.confirm('Вы уверены, что хотите удалить эту должность?')) {
      setPositionsList(positionsList.filter(pos => pos.id !== id));
    }
  };

  const openEditDepartment = (dept: Department) => {
    setEditingDepartment(dept);
    setDepartmentForm({
      name: dept.name,
      description: dept.description,
      head: dept.head
    });
    setShowDepartmentModal(true);
  };

  const openEditPosition = (pos: Position) => {
    setEditingPosition(pos);
    setPositionForm({
      name: pos.name,
      departmentId: pos.departmentId || '',
      level: pos.level,
      description: pos.description
    });
    setShowPositionModal(true);
  };

  const getLevelLabel = (level: string) => {
    const labels: { [key: string]: string } = {
      executive: 'Руководство',
      manager: 'Менеджер',
      supervisor: 'Супервайзер',
      specialist: 'Специалист'
    };
    return labels[level] || level;
  };

  const getDepartmentName = (departmentId: string | null) => {
    if (!departmentId) return 'Без отдела';
    const dept = departmentsList.find(d => d.id === departmentId);
    return dept ? dept.name : 'Неизвестно';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Отделы и должности</h1>
        <p className="text-sm text-gray-600">Управление организационной структурой компании</p>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('departments')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'departments'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-building-line mr-2"></i>
            Отделы ({departmentsList.length})
          </button>
          <button
            onClick={() => setActiveTab('positions')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap ${
              activeTab === 'positions'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <i className="ri-user-star-line mr-2"></i>
            Должности ({positionsList.length})
          </button>
        </div>

        <Button
          onClick={() => {
            if (activeTab === 'departments') {
              setEditingDepartment(null);
              setDepartmentForm({ name: '', description: '', head: '' });
              setShowDepartmentModal(true);
            } else {
              setEditingPosition(null);
              setPositionForm({ name: '', departmentId: '', level: 'specialist', description: '' });
              setShowPositionModal(true);
            }
          }}
        >
          <i className="ri-add-line mr-2"></i>
          {activeTab === 'departments' ? 'Добавить отдел' : 'Добавить должность'}
        </Button>
      </div>

      <div className="mb-6">
        <Input
          placeholder={activeTab === 'departments' ? 'Поиск отделов...' : 'Поиск должностей...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
        />
      </div>

      {activeTab === 'departments' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDepartments.map((dept) => (
            <Card key={dept.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <i className="ri-building-line text-xl text-teal-600"></i>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditDepartment(dept)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded-md transition-colors"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDeleteDepartment(dept.id)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">{dept.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{dept.description}</p>

              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm">
                  <i className="ri-user-line text-gray-400 mr-2 w-4 h-4"></i>
                  <span className="text-gray-600">Руководитель:</span>
                  <span className="ml-2 text-gray-900 font-medium">{dept.head}</span>
                </div>
                <div className="flex items-center text-sm">
                  <i className="ri-team-line text-gray-400 mr-2 w-4 h-4"></i>
                  <span className="text-gray-600">Сотрудников:</span>
                  <span className="ml-2 text-gray-900 font-medium">{dept.employeeCount}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPositions.map((pos) => (
            <Card key={pos.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-user-star-line text-xl text-blue-600"></i>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditPosition(pos)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <i className="ri-edit-line"></i>
                  </button>
                  <button
                    onClick={() => handleDeletePosition(pos.id)}
                    className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <i className="ri-delete-bin-line"></i>
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-1">{pos.name}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{pos.description}</p>

              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex items-center text-sm">
                  <i className="ri-building-line text-gray-400 mr-2 w-4 h-4"></i>
                  <span className="text-gray-600">Отдел:</span>
                  <span className="ml-2 text-gray-900 font-medium">{getDepartmentName(pos.departmentId)}</span>
                </div>
                <div className="flex items-center text-sm">
                  <i className="ri-medal-line text-gray-400 mr-2 w-4 h-4"></i>
                  <span className="text-gray-600">Уровень:</span>
                  <span className="ml-2 text-gray-900 font-medium">{getLevelLabel(pos.level)}</span>
                </div>
                <div className="flex items-center text-sm">
                  <i className="ri-team-line text-gray-400 mr-2 w-4 h-4"></i>
                  <span className="text-gray-600">Сотрудников:</span>
                  <span className="ml-2 text-gray-900 font-medium">{pos.employeeCount}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Модальное окно для отдела */}
      {showDepartmentModal && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingDepartment ? 'Редактировать отдел' : 'Добавить отдел'}
              </h2>
              <button
                onClick={() => {
                  setShowDepartmentModal(false);
                  setEditingDepartment(null);
                }}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название отдела <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Введите название отдела"
                  value={departmentForm.name}
                  onChange={(e) => setDepartmentForm({ ...departmentForm, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  placeholder="Введите описание отдела"
                  value={departmentForm.description}
                  onChange={(e) => setDepartmentForm({ ...departmentForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Руководитель
                </label>
                <Input
                  placeholder="ФИО руководителя"
                  value={departmentForm.head}
                  onChange={(e) => setDepartmentForm({ ...departmentForm, head: e.target.value })}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowDepartmentModal(false);
                  setEditingDepartment(null);
                }}
              >
                Отмена
              </Button>
              <Button
                onClick={editingDepartment ? handleUpdateDepartment : handleAddDepartment}
                disabled={!departmentForm.name.trim()}
              >
                {editingDepartment ? 'Сохранить' : 'Добавить'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для должности */}
      {showPositionModal && (
        <div className="fixed inset-0 bg-black bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPosition ? 'Редактировать должность' : 'Добавить должность'}
              </h2>
              <button
                onClick={() => {
                  setShowPositionModal(false);
                  setEditingPosition(null);
                }}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
              >
                <i className="ri-close-line text-xl"></i>
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Название должности <span className="text-red-500">*</span>
                </label>
                <Input
                  placeholder="Введите название должности"
                  value={positionForm.name}
                  onChange={(e) => setPositionForm({ ...positionForm, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Отдел
                </label>
                <select
                  value={positionForm.departmentId}
                  onChange={(e) => setPositionForm({ ...positionForm, departmentId: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Без отдела</option>
                  {departmentsList.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Уровень
                </label>
                <select
                  value={positionForm.level}
                  onChange={(e) => setPositionForm({ ...positionForm, level: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="executive">Руководство</option>
                  <option value="manager">Менеджер</option>
                  <option value="supervisor">Супервайзер</option>
                  <option value="specialist">Специалист</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Описание
                </label>
                <textarea
                  placeholder="Введите описание должности"
                  value={positionForm.description}
                  onChange={(e) => setPositionForm({ ...positionForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <Button
                variant="secondary"
                onClick={() => {
                  setShowPositionModal(false);
                  setEditingPosition(null);
                }}
              >
                Отмена
              </Button>
              <Button
                onClick={editingPosition ? handleUpdatePosition : handleAddPosition}
                disabled={!positionForm.name.trim()}
              >
                {editingPosition ? 'Сохранить' : 'Добавить'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
