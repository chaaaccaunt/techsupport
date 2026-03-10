
export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Chat {
  id: string;
  type: 'general' | 'department' | 'personal';
  name: string;
  description?: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  members?: number;
}

export const mockChats: Chat[] = [
  {
    id: 'general',
    type: 'general',
    name: 'Общий чат организации',
    description: 'Общий чат для всех сотрудников компании',
    lastMessage: 'Напоминаю: завтра корпоративное собрание в 10:00',
    lastMessageTime: '10:45',
    unreadCount: 5,
    members: 82
  },
  {
    id: 'dept-it',
    type: 'department',
    name: 'IT отдел',
    description: 'Чат отдела информационных технологий',
    lastMessage: 'Сервер обновлён, можно работать',
    lastMessageTime: '09:30',
    unreadCount: 2,
    members: 12
  },
  {
    id: 'personal-1',
    type: 'personal',
    name: 'Проект: Обновление инфраструктуры',
    description: 'Рабочая группа по обновлению серверной инфраструктуры',
    lastMessage: 'Смета готова, отправил на почту',
    lastMessageTime: 'Вчера',
    unreadCount: 0,
    members: 5
  },
  {
    id: 'personal-2',
    type: 'personal',
    name: 'Инвентаризация 2025',
    description: 'Координация ежегодной инвентаризации оборудования',
    lastMessage: 'Список оборудования обновлён',
    lastMessageTime: 'Вчера',
    unreadCount: 1,
    members: 4
  },
  {
    id: 'personal-3',
    type: 'personal',
    name: 'Закупка оборудования',
    description: 'Обсуждение закупки нового оборудования',
    lastMessage: 'Согласовали бюджет на Q1',
    lastMessageTime: '13 янв',
    unreadCount: 0,
    members: 3
  }
];

export const mockMessages: Record<string, ChatMessage[]> = {
  'general': [
    {
      id: 'm1',
      chatId: 'general',
      senderId: 'u2',
      senderName: 'Петрова Мария',
      senderAvatar: 'ПМ',
      text: 'Доброе утро всем! Напоминаю, что сегодня в 14:00 плановое совещание по итогам квартала.',
      timestamp: '08:05',
      isOwn: false
    },
    {
      id: 'm2',
      chatId: 'general',
      senderId: 'u3',
      senderName: 'Козлов Дмитрий',
      senderAvatar: 'КД',
      text: 'Принято, буду.',
      timestamp: '08:12',
      isOwn: false
    },
    {
      id: 'm3',
      chatId: 'general',
      senderId: 'u4',
      senderName: 'Новикова Елена',
      senderAvatar: 'НЕ',
      text: 'Я тоже подключусь онлайн, буду в командировке.',
      timestamp: '08:20',
      isOwn: false
    },
    {
      id: 'm4',
      chatId: 'general',
      senderId: 'admin',
      senderName: 'Администратор',
      senderAvatar: 'АД',
      text: 'Хорошо, ссылку на конференцию пришлю за 10 минут до начала.',
      timestamp: '08:35',
      isOwn: true
    },
    {
      id: 'm5',
      chatId: 'general',
      senderId: 'u5',
      senderName: 'Смирнов Алексей',
      senderAvatar: 'СА',
      text: 'Коллеги, на складе закончились картриджи для принтеров. Кто отвечает за закупку?',
      timestamp: '09:10',
      isOwn: false
    },
    {
      id: 'm6',
      chatId: 'general',
      senderId: 'u6',
      senderName: 'Иванов Иван',
      senderAvatar: 'ИИ',
      text: 'Алексей, это к Марии из бухгалтерии. Она занимается закупками расходников.',
      timestamp: '09:15',
      isOwn: false
    },
    {
      id: 'm7',
      chatId: 'general',
      senderId: 'u2',
      senderName: 'Петрова Мария',
      senderAvatar: 'ПМ',
      text: 'Да, уже оформила заявку. Картриджи будут завтра.',
      timestamp: '09:22',
      isOwn: false
    },
    {
      id: 'm8',
      chatId: 'general',
      senderId: 'u7',
      senderName: 'Морозов Сергей',
      senderAvatar: 'МС',
      text: 'Всем привет! Напоминаю про корпоративный тренинг по безопасности 15 января. Участие обязательно для всех.',
      timestamp: '10:00',
      isOwn: false
    },
    {
      id: 'm9',
      chatId: 'general',
      senderId: 'admin',
      senderName: 'Администратор',
      senderAvatar: 'АД',
      text: 'Напоминаю: завтра корпоративное собрание в 10:00. Явка обязательна для всех руководителей отделов.',
      timestamp: '10:45',
      isOwn: true
    }
  ],
  'dept-it': [
    {
      id: 'dm1',
      chatId: 'dept-it',
      senderId: 'u6',
      senderName: 'Иванов Иван',
      senderAvatar: 'ИИ',
      text: 'Ребята, сегодня ночью проводим плановое обновление серверов. Начало в 02:00.',
      timestamp: '08:00',
      isOwn: false
    },
    {
      id: 'dm2',
      chatId: 'dept-it',
      senderId: 'u8',
      senderName: 'Кузнецов Павел',
      senderAvatar: 'КП',
      text: 'Понял, буду на связи.',
      timestamp: '08:05',
      isOwn: false
    },
    {
      id: 'dm3',
      chatId: 'dept-it',
      senderId: 'admin',
      senderName: 'Администратор',
      senderAvatar: 'АД',
      text: 'Я тоже подключусь. Нужно проверить резервные копии перед обновлением.',
      timestamp: '08:10',
      isOwn: true
    },
    {
      id: 'dm4',
      chatId: 'dept-it',
      senderId: 'u9',
      senderName: 'Лебедев Антон',
      senderAvatar: 'ЛА',
      text: 'Резервные копии сделаны вчера в 23:00. Всё в порядке.',
      timestamp: '08:15',
      isOwn: false
    },
    {
      id: 'dm5',
      chatId: 'dept-it',
      senderId: 'u6',
      senderName: 'Иванов Иван',
      senderAvatar: 'ИИ',
      text: 'Отлично. Также нужно проверить заявку #7 — сканер на складе. Кто возьмёт?',
      timestamp: '08:50',
      isOwn: false
    },
    {
      id: 'dm6',
      chatId: 'dept-it',
      senderId: 'u8',
      senderName: 'Кузнецов Павел',
      senderAvatar: 'КП',
      text: 'Я займусь, поеду после обеда.',
      timestamp: '08:55',
      isOwn: false
    },
    {
      id: 'dm7',
      chatId: 'dept-it',
      senderId: 'u6',
      senderName: 'Иванов Иван',
      senderAvatar: 'ИИ',
      text: 'Сервер обновлён, можно работать. Всё прошло штатно.',
      timestamp: '09:30',
      isOwn: false
    }
  ],
  'personal-1': [
    {
      id: 'p1m1',
      chatId: 'personal-1',
      senderId: 'u6',
      senderName: 'Иванов Иван',
      senderAvatar: 'ИИ',
      text: 'Коллеги, собрал предварительный список оборудования для обновления инфраструктуры.',
      timestamp: '12 янв, 14:00',
      isOwn: false
    },
    {
      id: 'p1m2',
      chatId: 'personal-1',
      senderId: 'admin',
      senderName: 'Администратор',
      senderAvatar: 'АД',
      text: 'Хорошо. Нужно согласовать с финансовым отделом бюджет.',
      timestamp: '12 янв, 14:10',
      isOwn: true
    },
    {
      id: 'p1m3',
      chatId: 'personal-1',
      senderId: 'u2',
      senderName: 'Петрова Мария',
      senderAvatar: 'ПМ',
      text: 'Пришлите список, посмотрю что можно включить в бюджет Q1.',
      timestamp: '12 янв, 15:00',
      isOwn: false
    },
    {
      id: 'p1m4',
      chatId: 'personal-1',
      senderId: 'u6',
      senderName: 'Иванов Иван',
      senderAvatar: 'ИИ',
      text: 'Смета готова, отправил на почту.',
      timestamp: '13 янв, 09:00',
      isOwn: false
    }
  ],
  'personal-2': [
    {
      id: 'p2m1',
      chatId: 'personal-2',
      senderId: 'admin',
      senderName: 'Администратор',
      senderAvatar: 'АД',
      text: 'Начинаем подготовку к ежегодной инвентаризации. Нужно составить список всего оборудования по отделам.',
      timestamp: '10 янв, 10:00',
      isOwn: true
    },
    {
      id: 'p2m2',
      chatId: 'personal-2',
      senderId: 'u8',
      senderName: 'Кузнецов Павел',
      senderAvatar: 'КП',
      text: 'Уже начал собирать данные по IT-оборудованию.',
      timestamp: '10 янв, 10:30',
      isOwn: false
    },
    {
      id: 'p2m3',
      chatId: 'personal-2',
      senderId: 'u5',
      senderName: 'Смирнов Алексей',
      senderAvatar: 'СА',
      text: 'По производству тоже подготовлю список к пятнице.',
      timestamp: '10 янв, 11:00',
      isOwn: false
    },
    {
      id: 'p2m4',
      chatId: 'personal-2',
      senderId: 'u8',
      senderName: 'Кузнецов Павел',
      senderAvatar: 'КП',
      text: 'Список оборудования обновлён. Добавил серийные номера.',
      timestamp: '13 янв, 16:00',
      isOwn: false
    }
  ],
  'personal-3': [
    {
      id: 'p3m1',
      chatId: 'personal-3',
      senderId: 'admin',
      senderName: 'Администратор',
      senderAvatar: 'АД',
      text: 'Нужно обсудить закупку новых рабочих станций для отдела продаж.',
      timestamp: '8 янв, 09:00',
      isOwn: true
    },
    {
      id: 'p3m2',
      chatId: 'personal-3',
      senderId: 'u3',
      senderName: 'Козлов Дмитрий',
      senderAvatar: 'КД',
      text: 'Нам нужно минимум 5 новых машин. Старые уже не справляются с CRM.',
      timestamp: '8 янв, 09:15',
      isOwn: false
    },
    {
      id: 'p3m3',
      chatId: 'personal-3',
      senderId: 'u2',
      senderName: 'Петрова Мария',
      senderAvatar: 'ПМ',
      text: 'Согласовали бюджет на Q1. Можем закупить до 8 единиц.',
      timestamp: '13 янв, 11:00',
      isOwn: false
    }
  ]
};
