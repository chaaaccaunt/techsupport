
import { useState } from 'react';
import { Chat } from '../../../mocks/chats';

interface ChatSidebarProps {
  chats: Chat[];
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onCreateChat: () => void;
}

const typeLabels: Record<string, string> = {
  general: 'Общий',
  department: 'Отдел',
  personal: 'Личный'
};

const typeColors: Record<string, string> = {
  general: 'bg-emerald-100 text-emerald-700',
  department: 'bg-amber-100 text-amber-700',
  personal: 'bg-sky-100 text-sky-700'
};

const typeIcons: Record<string, string> = {
  general: 'ri-global-line',
  department: 'ri-building-line',
  personal: 'ri-chat-private-line'
};

export default function ChatSidebar({ chats, selectedChatId, onSelectChat, onCreateChat }: ChatSidebarProps) {
  const [search, setSearch] = useState('');

  const filtered = chats.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = {
    general: filtered.filter(c => c.type === 'general'),
    department: filtered.filter(c => c.type === 'department'),
    personal: filtered
      .filter(c => c.type === 'personal')
      .sort((a, b) => {
        if (b.unreadCount > 0 && a.unreadCount === 0) return 1;
        if (a.unreadCount > 0 && b.unreadCount === 0) return -1;
        return 0;
      }),
  };

  const renderGroup = (type: 'general' | 'department' | 'personal', label: string) => {
    const items = grouped[type];
    if (items.length === 0) return null;
    return (
      <div key={type} className="mb-4">
        <div className="flex items-center px-3 mb-1">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</span>
        </div>
        {items.map(chat => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors cursor-pointer text-left ${
              selectedChatId === chat.id ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
            }`}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[chat.type]}`}>
              <i className={`${typeIcons[chat.type]} text-lg`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 truncate">{chat.name}</span>
                <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{chat.lastMessageTime}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-gray-500 truncate">{chat.lastMessage}</span>
                {chat.unreadCount > 0 && (
                  <span className="ml-2 flex-shrink-0 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="w-72 flex-shrink-0 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-semibold text-gray-900">Чаты</h2>
          <button
            onClick={onCreateChat}
            className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer transition-colors"
            title="Создать чат"
          >
            <i className="ri-add-line text-lg"></i>
          </button>
        </div>
        <div className="relative">
          <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
          <input
            type="text"
            placeholder="Поиск чатов..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-3">
        {renderGroup('general', 'Общий')}
        {renderGroup('department', 'Отдел')}
        {renderGroup('personal', 'Мои чаты')}
        {filtered.length === 0 && (
          <div className="text-center py-8 text-gray-400 text-sm">Чаты не найдены</div>
        )}
      </div>
    </div>
  );
}
