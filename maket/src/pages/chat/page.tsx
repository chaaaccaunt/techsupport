import { useState } from 'react';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import CreateChatModal from './components/CreateChatModal';
import { mockChats, mockMessages, Chat, ChatMessage } from '../../mocks/chats';

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>(mockChats);
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(mockMessages);
  const [selectedChatId, setSelectedChatId] = useState<string | null>('general');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const selectedChat = chats.find(c => c.id === selectedChatId) ?? null;
  const currentMessages = selectedChatId ? (messages[selectedChatId] ?? []) : [];

  const handleSendMessage = (text: string) => {
    if (!selectedChatId) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      chatId: selectedChatId,
      senderId: 'admin',
      senderName: 'Администратор',
      senderAvatar: 'АД',
      text,
      timestamp: timeStr,
      isOwn: true
    };
    setMessages(prev => ({
      ...prev,
      [selectedChatId]: [...(prev[selectedChatId] ?? []), newMsg]
    }));
    setChats(prev => prev.map(c =>
      c.id === selectedChatId
        ? { ...c, lastMessage: text, lastMessageTime: timeStr, unreadCount: 0 }
        : c
    ));
  };

  const handleSelectChat = (chatId: string) => {
    setSelectedChatId(chatId);
    setChats(prev => prev.map(c => c.id === chatId ? { ...c, unreadCount: 0 } : c));
  };

  const handleCreateChat = (name: string, description: string) => {
    const newChat: Chat = {
      id: `personal-${Date.now()}`,
      type: 'personal',
      name,
      description,
      lastMessage: 'Чат создан',
      lastMessageTime: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      unreadCount: 0,
      members: 1
    };
    setChats(prev => [...prev, newChat]);
    setMessages(prev => ({ ...prev, [newChat.id]: [] }));
    setSelectedChatId(newChat.id);
    setShowCreateModal(false);
  };

  const handleClearHistory = (chatId: string) => {
    setMessages(prev => ({ ...prev, [chatId]: [] }));
    setChats(prev => prev.map(c =>
      c.id === chatId ? { ...c, lastMessage: 'История очищена', unreadCount: 0 } : c
    ));
  };

  const handleDeleteChat = (chatId: string) => {
    setChats(prev => prev.filter(c => c.id !== chatId));
    setMessages(prev => {
      const next = { ...prev };
      delete next[chatId];
      return next;
    });
    setSelectedChatId(null);
  };

  return (
    <div className="flex h-full overflow-hidden">
      <ChatSidebar
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={handleSelectChat}
        onCreateChat={() => setShowCreateModal(true)}
      />
      {selectedChat ? (
        <ChatWindow
          chat={selectedChat}
          messages={currentMessages}
          onSendMessage={handleSendMessage}
          onDeleteChat={handleDeleteChat}
          onClearHistory={handleClearHistory}
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 text-gray-400">
          <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-full mb-4">
            <i className="ri-chat-3-line text-3xl"></i>
          </div>
          <p className="text-base font-medium text-gray-500">Выберите чат</p>
          <p className="text-sm mt-1">Выберите чат из списка слева, чтобы начать общение</p>
        </div>
      )}
      {showCreateModal && (
        <CreateChatModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateChat}
        />
      )}
    </div>
  );
}
