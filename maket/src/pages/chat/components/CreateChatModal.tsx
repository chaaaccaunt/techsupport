
import { useState } from 'react';

interface CreateChatModalProps {
  onClose: () => void;
  onCreate: (name: string, description: string) => void;
}

const availableMembers = [
  { id: 'u2', name: 'Петрова Мария', dept: 'Бухгалтерия', avatar: 'ПМ' },
  { id: 'u3', name: 'Козлов Дмитрий', dept: 'Продажи', avatar: 'КД' },
  { id: 'u4', name: 'Новикова Елена', dept: 'Маркетинг', avatar: 'НЕ' },
  { id: 'u5', name: 'Смирнов Алексей', dept: 'Производство', avatar: 'СА' },
  { id: 'u6', name: 'Иванов Иван', dept: 'IT', avatar: 'ИИ' },
  { id: 'u7', name: 'Морозов Сергей', dept: 'Логистика', avatar: 'МС' },
  { id: 'u8', name: 'Кузнецов Павел', dept: 'IT', avatar: 'КП' },
  { id: 'u9', name: 'Лебедев Антон', dept: 'IT', avatar: 'ЛА' },
  { id: 'u10', name: 'Сидорова Анна', dept: 'HR', avatar: 'СА' },
];

export default function CreateChatModal({ onClose, onCreate }: CreateChatModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const filtered = availableMembers.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.dept.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMember = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate(name.trim(), description.trim());
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">Создать новый чат</h3>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg cursor-pointer">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Название чата <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Например: Проект X"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Описание</label>
            <input
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Краткое описание чата"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Добавить участников</label>
            <div className="relative mb-2">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Поиск сотрудников..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="max-h-44 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
              {filtered.map(member => (
                <label key={member.id} className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selected.includes(member.id)}
                    onChange={() => toggleMember(member.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                    {member.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{member.name}</p>
                    <p className="text-xs text-gray-500">{member.dept}</p>
                  </div>
                </label>
              ))}
            </div>
            {selected.length > 0 && (
              <p className="text-xs text-blue-600 mt-1">Выбрано: {selected.length} участников</p>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer whitespace-nowrap">
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg cursor-pointer whitespace-nowrap"
          >
            Создать чат
          </button>
        </div>
      </div>
    </div>
  );
}
