import { useState, useRef, useEffect } from 'react';
import Card from '../../components/base/Card';
import Button from '../../components/base/Button';
import Input from '../../components/base/Input';

export default function EquipmentPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);
  const exportRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'computers', label: 'Компьютеры' },
    { value: 'printers', label: 'Принтеры' },
    { value: 'scanners', label: 'Сканеры' },
    { value: 'monitors', label: 'Мониторы' },
    { value: 'network', label: 'Сетевое оборудование' }
  ];

  const statuses = [
    { value: 'all', label: 'Все статусы' },
    { value: 'working', label: 'Исправное' },
    { value: 'broken', label: 'Неисправное' },
    { value: 'maintenance', label: 'На ТО' },
    { value: 'disposed', label: 'Списанное' }
  ];

  const equipment = [
    {
      id: 'ПК-001',
      name: 'Компьютер Dell OptiPlex 7090',
      category: 'Компьютеры',
      status: 'working',
      statusText: 'Исправно',
      location: 'Офис 101',
      responsible: 'Иванов И.И.',
      lastMaintenance: '2024-10-15',
      nextMaintenance: '2025-01-15',
      serialNumber: 'DL789456123',
      inventoryNumber: 'ИВ-2024-001'
    },
    {
      id: 'ПР-002',
      name: 'Принтер HP LaserJet Pro 400',
      category: 'Принтеры',
      status: 'broken',
      statusText: 'Неисправно',
      location: 'Офис 205',
      responsible: 'Петров П.П.',
      lastMaintenance: '2024-09-20',
      nextMaintenance: '2024-12-20',
      serialNumber: 'HP456789012',
      inventoryNumber: 'ИВ-2024-002'
    },
    {
      id: 'МН-003',
      name: 'Монитор Samsung 24" F24T450FQI',
      category: 'Мониторы',
      status: 'working',
      statusText: 'Исправно',
      location: 'Офис 101',
      responsible: 'Иванов И.И.',
      lastMaintenance: '2024-11-01',
      nextMaintenance: '2025-02-01',
      serialNumber: 'SM123456789',
      inventoryNumber: 'ИВ-2024-003'
    },
    {
      id: 'СК-004',
      name: 'Сканер Canon CanoScan LiDE 300',
      category: 'Сканеры',
      status: 'maintenance',
      statusText: 'На ТО',
      location: 'Офис 150',
      responsible: 'Сидоров С.С.',
      lastMaintenance: '2024-08-15',
      nextMaintenance: '2024-11-15',
      serialNumber: 'CN987654321',
      inventoryNumber: 'ИВ-2024-004'
    },
    {
      id: 'СВ-005',
      name: 'Коммутатор D-Link DGS-1024D',
      category: 'Сетевое оборудование',
      status: 'working',
      statusText: 'Исправно',
      location: 'Серверная',
      responsible: 'Козлов К.К.',
      lastMaintenance: '2024-12-01',
      nextMaintenance: '2025-03-01',
      serialNumber: 'DL555666777',
      inventoryNumber: 'ИВ-2024-005'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'working': return 'bg-green-100 text-green-800';
      case 'broken': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'disposed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredEquipment = equipment.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === categories.find(c => c.value === selectedCategory)?.label;
    const statusMatch = selectedStatus === 'all' || item.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setShowExportMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const exportToCSV = () => {
    const headers = ['ID', 'Название', 'Категория', 'Статус', 'Расположение', 'Ответственный', 'Серийный номер', 'Инвентарный номер', 'Последнее ТО', 'Следующее ТО'];
    const rows = filteredEquipment.map(item => [
      item.id,
      item.name,
      item.category,
      item.statusText,
      item.location,
      item.responsible,
      item.serialNumber,
      item.inventoryNumber,
      item.lastMaintenance,
      item.nextMaintenance
    ]);
    const csvContent = [headers, ...rows].map(row => row.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipment.csv';
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
    setExportSuccess('CSV');
    setTimeout(() => setExportSuccess(null), 3000);
  };

  const exportToExcel = () => {
    const headers = ['ID', 'Название', 'Категория', 'Статус', 'Расположение', 'Ответственный', 'Серийный номер', 'Инвентарный номер', 'Последнее ТО', 'Следующее ТО'];
    const rows = filteredEquipment.map(item => [
      item.id, item.name, item.category, item.statusText,
      item.location, item.responsible, item.serialNumber,
      item.inventoryNumber, item.lastMaintenance, item.nextMaintenance
    ]);
    const tableRows = [headers, ...rows].map(row =>
      '<tr>' + row.map(v => `<td>${v}</td>`).join('') + '</tr>'
    ).join('');
    const html = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"><head><meta charset="UTF-8"></head><body><table>${tableRows}</table></body></html>`;
    const blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipment.xls';
    a.click();
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
    setExportSuccess('Excel');
    setTimeout(() => setExportSuccess(null), 3000);
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Оборудование</h1>
          <p className="text-gray-600 mt-1 text-sm">Управление парком оборудования</p>
        </div>
        <div className="flex items-center space-x-2 flex-wrap gap-2">
          {/* Export Button with Dropdown */}
          <div className="relative" ref={exportRef}>
            <Button
              variant="outline"
              className="whitespace-nowrap"
              onClick={() => setShowExportMenu(prev => !prev)}
            >
              <i className="ri-download-line mr-2"></i>
              Экспорт
              <i className={`ri-arrow-down-s-line ml-1 transition-transform ${showExportMenu ? 'rotate-180' : ''}`}></i>
            </Button>
            {showExportMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
                <button
                  onClick={exportToCSV}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-md mr-3">
                    <i className="ri-file-text-line text-green-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">CSV</p>
                    <p className="text-xs text-gray-400">Таблица с разделителями</p>
                  </div>
                </button>
                <div className="border-t border-gray-100"></div>
                <button
                  onClick={exportToExcel}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-emerald-100 rounded-md mr-3">
                    <i className="ri-file-excel-line text-emerald-600"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Excel</p>
                    <p className="text-xs text-gray-400">Файл Microsoft Excel</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          <Button onClick={() => setShowAddModal(true)} className="whitespace-nowrap">
            <i className="ri-add-line mr-2"></i>
            <span className="hidden sm:inline">Добавить оборудование</span>
            <span className="sm:hidden">Добавить</span>
          </Button>
        </div>
      </div>

      {/* Export success toast */}
      {exportSuccess && (
        <div className="fixed bottom-6 right-4 md:right-6 z-50 flex items-center bg-white border border-green-200 shadow-lg rounded-lg px-4 py-3">
          <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-full mr-3">
            <i className="ri-check-line text-green-600"></i>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Экспорт завершён</p>
            <p className="text-xs text-gray-500">Файл {exportSuccess} успешно скачан</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
          <div className="flex-1 min-w-0">
            <Input
              placeholder="Поиск по названию, серийному номеру..."
              className="w-full"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Категория:</span>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>{category.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 whitespace-nowrap">Статус:</span>
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            >
              {statuses.map(status => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg self-start sm:self-auto">
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 cursor-pointer ${viewMode === 'list' ? 'bg-teal-100 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <i className="ri-list-unordered text-sm"></i>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 cursor-pointer ${viewMode === 'grid' ? 'bg-teal-100 text-teal-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <i className="ri-grid-line text-sm"></i>
            </button>
          </div>
        </div>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-computer-line text-lg md:text-xl text-teal-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">1,247</p>
          <p className="text-xs md:text-sm text-gray-600">Всего оборудования</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-checkbox-circle-line text-lg md:text-xl text-green-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">1,156</p>
          <p className="text-xs md:text-sm text-gray-600">Исправное</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-error-warning-line text-lg md:text-xl text-red-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">23</p>
          <p className="text-xs md:text-sm text-gray-600">Неисправное</p>
        </Card>
        <Card className="text-center">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-2 md:mb-3">
            <i className="ri-tools-line text-lg md:text-xl text-yellow-600"></i>
          </div>
          <p className="text-xl md:text-2xl font-bold text-gray-900">45</p>
          <p className="text-xs md:text-sm text-gray-600">На ТО</p>
        </Card>
      </div>

      {/* Equipment List */}
      <Card>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="min-w-[700px] px-4 md:px-0">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Оборудование</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Категория</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Статус</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Расположение</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Ответственный</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Следующее ТО</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.id} • {item.serialNumber}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{item.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                        {item.statusText}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{item.location}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{item.responsible}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm text-gray-600">{item.nextMaintenance}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-gray-400 hover:text-teal-600 cursor-pointer">
                          <i className="ri-eye-line"></i>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-green-600 cursor-pointer">
                          <i className="ri-edit-line"></i>
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 cursor-pointer">
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

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Добавить оборудование</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Название оборудования</label>
                  <Input placeholder="Введите название" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Категория</label>
                  <select className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-8">
                    <option value="">Выберите категорию</option>
                    <option value="computers">Компьютеры</option>
                    <option value="printers">Принтеры</option>
                    <option value="scanners">Сканеры</option>
                    <option value="monitors">Мониторы</option>
                    <option value="network">Сетевое оборудование</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Серийный номер</label>
                  <Input placeholder="Введите серийный номер" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Инвентарный номер</label>
                  <Input placeholder="Введите инвентарный номер" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Расположение</label>
                  <Input placeholder="Введите расположение" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ответственный</label>
                  <Input placeholder="Введите ФИО ответственного" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
                <textarea
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Дополнительная информация об оборудовании"
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
                  Добавить оборудование
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
