import { useState, useRef, useEffect } from 'react';
import { Chat, ChatMessage } from '../../../mocks/chats';

interface ChatWindowProps {
  chat: Chat;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  onDeleteChat?: (chatId: string) => void;
  onClearHistory?: (chatId: string) => void;
}

const typeIcons: Record<string, string> = {
  general: 'ri-global-line',
  department: 'ri-building-line',
  personal: 'ri-chat-private-line'
};

const typeColors: Record<string, string> = {
  general: 'bg-emerald-100 text-emerald-700',
  department: 'bg-amber-100 text-amber-700',
  personal: 'bg-sky-100 text-sky-700'
};

const typeLabels: Record<string, string> = {
  general: 'Общий чат',
  department: 'Чат отдела',
  personal: 'Групповой чат'
};

const chatMembers: Record<string, { name: string; avatar: string; role: string; online: boolean }[]> = {
  general: [
    { name: 'Администратор', avatar: 'АД', role: 'Администратор', online: true },
    { name: 'Петрова Мария', avatar: 'ПМ', role: 'Бухгалтер', online: true },
    { name: 'Козлов Дмитрий', avatar: 'КД', role: 'Менеджер продаж', online: false },
    { name: 'Новикова Елена', avatar: 'НЕ', role: 'HR-специалист', online: true },
    { name: 'Смирнов Алексей', avatar: 'СА', role: 'Инженер', online: false },
    { name: 'Иванов Иван', avatar: 'ИИ', role: 'IT-специалист', online: true },
  ],
  'dept-it': [
    { name: 'Администратор', avatar: 'АД', role: 'Администратор', online: true },
    { name: 'Иванов Иван', avatar: 'ИИ', role: 'IT-специалист', online: true },
    { name: 'Кузнецов Павел', avatar: 'КП', role: 'Системный администратор', online: false },
    { name: 'Лебедев Антон', avatar: 'ЛА', role: 'DevOps-инженер', online: true },
  ],
  'personal-1': [
    { name: 'Администратор', avatar: 'АД', role: 'Администратор', online: true },
    { name: 'Иванов Иван', avatar: 'ИИ', role: 'IT-специалист', online: true },
    { name: 'Петрова Мария', avatar: 'ПМ', role: 'Бухгалтер', online: true },
    { name: 'Козлов Дмитрий', avatar: 'КД', role: 'Менеджер', online: false },
    { name: 'Смирнов Алексей', avatar: 'СА', role: 'Инженер', online: false },
  ],
  'personal-2': [
    { name: 'Администратор', avatar: 'АД', role: 'Администратор', online: true },
    { name: 'Кузнецов Павел', avatar: 'КП', role: 'Системный администратор', online: false },
    { name: 'Смирнов Алексей', avatar: 'СА', role: 'Инженер', online: false },
    { name: 'Иванов Иван', avatar: 'ИИ', role: 'IT-специалист', online: true },
  ],
  'personal-3': [
    { name: 'Администратор', avatar: 'АД', role: 'Администратор', online: true },
    { name: 'Козлов Дмитрий', avatar: 'КД', role: 'Менеджер продаж', online: false },
    { name: 'Петрова Мария', avatar: 'ПМ', role: 'Бухгалтер', online: true },
  ],
};

export default function ChatWindow({ chat, messages, onSendMessage, onDeleteChat, onClearHistory }: ChatWindowProps) {
  const [input, setInput] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [showMembersPanel, setShowMembersPanel] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset panels when chat changes
  useEffect(() => {
    setShowInfoPanel(false);
    setShowMembersPanel(false);
    setShowMenu(false);
    setShowClearConfirm(false);
    setShowDeleteConfirm(false);
  }, [chat.id]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed && !attachedFile) return;

    let messageText = trimmed;
    if (attachedFile) {
      const fileIcon = getFileIcon(attachedFile.name);
      const fileSize = formatFileSize(attachedFile.size);
      messageText = trimmed
        ? `${trimmed}\n📎 ${attachedFile.name} (${fileSize})`
        : `📎 ${attachedFile.name} (${fileSize})`;
      void fileIcon;
    }

    onSendMessage(messageText);
    setInput('');
    setAttachedFile(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAttachedFile(file);
    }
    e.target.value = '';
  };

  const getFileIcon = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase() ?? '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return 'ri-image-line';
    if (['pdf'].includes(ext)) return 'ri-file-pdf-line';
    if (['doc', 'docx'].includes(ext)) return 'ri-file-word-line';
    if (['xls', 'xlsx'].includes(ext)) return 'ri-file-excel-line';
    if (['zip', 'rar', '7z'].includes(ext)) return 'ri-file-zip-line';
    if (['mp4', 'avi', 'mov'].includes(ext)) return 'ri-video-line';
    if (['mp3', 'wav', 'ogg'].includes(ext)) return 'ri-music-line';
    return 'ri-file-line';
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} Б`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} КБ`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} МБ`;
  };

  const members = chatMembers[chat.id] ?? [];
  const onlineCount = members.filter(m => m.online).length;

  return (
    <div className="flex-1 flex h-full min-w-0 overflow-hidden">
      <div className="flex-1 flex flex-col h-full min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white flex-shrink-0">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${typeColors[chat.type]}`}>
            <i className={`${typeIcons[chat.type]} text-lg`}></i>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{chat.name}</h3>
            <p className="text-xs text-gray-500">
              {typeLabels[chat.type]}{chat.members ? ` · ${chat.members} участников` : ''}
              {onlineCount > 0 && <span className="text-emerald-500"> · {onlineCount} онлайн</span>}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { setShowInfoPanel(v => !v); setShowMembersPanel(false); }}
              className={`w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${showInfoPanel ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Поиск"
            >
              <i className="ri-search-line text-lg"></i>
            </button>
            <button
              onClick={() => { setShowMembersPanel(v => !v); setShowInfoPanel(false); }}
              className={`w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${showMembersPanel ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
              title="Участники"
            >
              <i className="ri-user-add-line text-lg"></i>
            </button>
            {/* More menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowMenu(v => !v)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg cursor-pointer transition-colors ${showMenu ? 'bg-gray-100 text-gray-700' : 'text-gray-500 hover:bg-gray-100'}`}
                title="Ещё"
              >
                <i className="ri-more-2-line text-lg"></i>
              </button>
              {showMenu && (
                <div className="absolute right-0 top-10 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-1 overflow-hidden">
                  <button
                    onClick={() => { setShowInfoPanel(true); setShowMembersPanel(false); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-information-line text-base text-gray-500"></i>
                    </div>
                    Информация о чате
                  </button>
                  <button
                    onClick={() => { setShowMembersPanel(true); setShowInfoPanel(false); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-group-line text-base text-gray-500"></i>
                    </div>
                    Участники ({members.length})
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => { setShowClearConfirm(true); setShowMenu(false); }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-amber-600 hover:bg-amber-50 cursor-pointer transition-colors"
                  >
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-delete-bin-line text-base"></i>
                    </div>
                    Очистить историю
                  </button>
                  {chat.type === 'personal' && (
                    <button
                      onClick={() => { setShowDeleteConfirm(true); setShowMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                    >
                      <div className="w-5 h-5 flex items-center justify-center">
                        <i className="ri-logout-box-line text-base"></i>
                      </div>
                      Удалить чат
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 bg-gray-50">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-full mb-3">
                <i className="ri-chat-3-line text-2xl"></i>
              </div>
              <p className="text-sm">Нет сообщений. Начните общение!</p>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`flex items-end gap-2 ${msg.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
              {!msg.isOwn && (
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 text-xs font-semibold text-gray-700">
                  {msg.senderAvatar}
                </div>
              )}
              <div className={`max-w-[65%] ${msg.isOwn ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                {!msg.isOwn && (
                  <span className="text-xs text-gray-500 ml-1">{msg.senderName}</span>
                )}
                <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.isOwn
                    ? 'bg-blue-600 text-white rounded-br-sm'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm shadow-sm'
                }`}>
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400 mx-1">{msg.timestamp}</span>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 bg-white border-t border-gray-200 flex-shrink-0">
          {/* Attached file preview */}
          {attachedFile && (
            <div className="flex items-center gap-2 mb-2 px-3 py-2 bg-gray-100 rounded-lg border border-gray-200">
              <div className="w-5 h-5 flex items-center justify-center text-gray-500">
                <i className={`${getFileIcon(attachedFile.name)} text-base`}></i>
              </div>
              <span className="flex-1 text-xs text-gray-700 truncate">{attachedFile.name}</span>
              <span className="text-xs text-gray-400 flex-shrink-0">{formatFileSize(attachedFile.size)}</span>
              <button
                onClick={() => setAttachedFile(null)}
                className="w-4 h-4 flex items-center justify-center text-gray-400 hover:text-red-500 cursor-pointer transition-colors flex-shrink-0"
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            </div>
          )}

          <div className="flex items-end gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.mp4,.mp3,.txt"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className={`w-6 h-6 flex items-center justify-center cursor-pointer flex-shrink-0 mb-0.5 transition-colors ${attachedFile ? 'text-emerald-500 hover:text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
              title="Прикрепить файл"
            >
              <i className="ri-attachment-2 text-lg"></i>
            </button>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Написать сообщение..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none max-h-32"
              style={{ lineHeight: '1.5' }}
            />
            <button className="w-6 h-6 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer flex-shrink-0 mb-0.5">
              <i className="ri-emotion-line text-lg"></i>
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim() && !attachedFile}
              className="w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-lg cursor-pointer transition-colors flex-shrink-0"
            >
              <i className="ri-send-plane-fill text-sm"></i>
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-1.5 ml-1">Enter — отправить, Shift+Enter — новая строка</p>
        </div>
      </div>

      {/* Info Panel */}
      {showInfoPanel && (
        <div className="w-72 flex-shrink-0 border-l border-gray-200 bg-white flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900">Информация о чате</h4>
            <button onClick={() => setShowInfoPanel(false)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <i className="ri-close-line text-base"></i>
            </button>
          </div>
          <div className="p-4 flex flex-col items-center border-b border-gray-100">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${typeColors[chat.type]}`}>
              <i className={`${typeIcons[chat.type]} text-2xl`}></i>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 text-center">{chat.name}</h3>
            <span className="text-xs text-gray-500 mt-1">{typeLabels[chat.type]}</span>
          </div>
          <div className="p-4 space-y-3">
            {chat.description && (
              <div>
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Описание</p>
                <p className="text-sm text-gray-700">{chat.description}</p>
              </div>
            )}
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Участники</p>
              <p className="text-sm text-gray-700">{chat.members ?? members.length} человек</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Онлайн</p>
              <p className="text-sm text-emerald-600">{onlineCount} сейчас онлайн</p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Тип чата</p>
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${typeColors[chat.type]}`}>
                <i className={`${typeIcons[chat.type]} text-xs`}></i>
                {typeLabels[chat.type]}
              </span>
            </div>
          </div>
          <div className="px-4 pb-4">
            <button
              onClick={() => { setShowMembersPanel(true); setShowInfoPanel(false); }}
              className="w-full flex items-center justify-center gap-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <i className="ri-group-line"></i>
              Посмотреть участников
            </button>
          </div>
        </div>
      )}

      {/* Members Panel */}
      {showMembersPanel && (
        <div className="w-72 flex-shrink-0 border-l border-gray-200 bg-white flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900">Участники · {members.length}</h4>
            <button onClick={() => setShowMembersPanel(false)} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors">
              <i className="ri-close-line text-base"></i>
            </button>
          </div>
          <div className="p-3 space-y-1">
            {members.map((m, i) => (
              <div key={i} className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="relative flex-shrink-0">
                  <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
                    {m.avatar}
                  </div>
                  {m.online && (
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{m.name}</p>
                  <p className="text-xs text-gray-500 truncate">{m.role}</p>
                </div>
                {m.online ? (
                  <span className="text-xs text-emerald-500 flex-shrink-0">онлайн</span>
                ) : (
                  <span className="text-xs text-gray-400 flex-shrink-0">офлайн</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clear History Confirm */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
            <div className="w-12 h-12 flex items-center justify-center bg-amber-100 rounded-full mx-auto mb-4">
              <i className="ri-delete-bin-line text-xl text-amber-600"></i>
            </div>
            <h3 className="text-base font-semibold text-gray-900 text-center mb-2">Очистить историю?</h3>
            <p className="text-sm text-gray-500 text-center mb-5">Все сообщения в чате «{chat.name}» будут удалены. Это действие нельзя отменить.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors whitespace-nowrap"
              >
                Отмена
              </button>
              <button
                onClick={() => { onClearHistory?.(chat.id); setShowClearConfirm(false); }}
                className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors whitespace-nowrap"
              >
                Очистить
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Chat Confirm */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80">
            <div className="w-12 h-12 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4">
              <i className="ri-logout-box-line text-xl text-red-600"></i>
            </div>
            <h3 className="text-base font-semibold text-gray-900 text-center mb-2">Удалить чат?</h3>
            <p className="text-sm text-gray-500 text-center mb-5">Чат «{chat.name}» и все его сообщения будут удалены навсегда.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors whitespace-nowrap"
              >
                Отмена
              </button>
              <button
                onClick={() => { onDeleteChat?.(chat.id); setShowDeleteConfirm(false); }}
                className="flex-1 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium cursor-pointer transition-colors whitespace-nowrap"
              >
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
