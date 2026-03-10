
export const mockTickets = [
  {
    id: '1',
    title: 'Не работает принтер в бухгалтерии',
    description: 'Принтер HP LaserJet Pro M404n перестал печатать. При попытке печати выдаёт ошибку "Замятие бумаги", хотя бумага не замята. Требуется диагностика и ремонт.',
    status: 'open',
    priority: 'high',
    department: 'Бухгалтерия',
    created_at: '2025-01-10T09:15:00Z',
    equipment: { name: 'HP LaserJet Pro M404n' },
    assignee: null
  },
  {
    id: '2',
    title: 'Сбой сети в серверной комнате',
    description: 'Периодически пропадает соединение с сервером баз данных. Проблема наблюдается с 08:00, затрагивает работу всего отдела продаж. Необходима срочная проверка сетевого оборудования.',
    status: 'in_progress',
    priority: 'critical',
    department: 'IT',
    created_at: '2025-01-12T08:00:00Z',
    equipment: { name: 'Cisco Catalyst 2960' },
    assignee: { full_name: 'Иванов Иван Иванович' }
  },
  {
    id: '3',
    title: 'Замена картриджа в МФУ',
    description: 'В МФУ Canon imageRUNNER закончился тонер. Необходима замена картриджа. Устройство используется для сканирования входящей документации.',
    status: 'resolved',
    priority: 'low',
    department: 'HR',
    created_at: '2025-01-08T11:30:00Z',
    equipment: { name: 'Canon imageRUNNER 2625i' },
    assignee: { full_name: 'Петров Алексей Сергеевич' }
  },
  {
    id: '4',
    title: 'Не включается рабочая станция',
    description: 'Компьютер менеджера Козловой Е.В. не включается после выходных. При нажатии кнопки питания никакой реакции нет. Предположительно неисправен блок питания.',
    status: 'in_progress',
    priority: 'high',
    department: 'Продажи',
    created_at: '2025-01-13T09:45:00Z',
    equipment: { name: 'Dell OptiPlex 7090' },
    assignee: { full_name: 'Смирнов Дмитрий Олегович' }
  },
  {
    id: '5',
    title: 'Обновление антивирусного ПО',
    description: 'Истёк срок лицензии антивируса Kaspersky Endpoint Security на 15 рабочих станциях отдела маркетинга. Необходимо продление лицензии и обновление баз.',
    status: 'open',
    priority: 'medium',
    department: 'Маркетинг',
    created_at: '2025-01-11T14:20:00Z',
    equipment: null,
    assignee: null
  },
  {
    id: '6',
    title: 'Шум в системе охлаждения сервера',
    description: 'Сервер Dell PowerEdge R740 издаёт посторонний шум. Предположительно неисправен один из вентиляторов охлаждения. Температура процессора в норме, но требуется профилактика.',
    status: 'open',
    priority: 'medium',
    department: 'IT',
    created_at: '2025-01-09T16:00:00Z',
    equipment: { name: 'Dell PowerEdge R740' },
    assignee: null
  },
  {
    id: '7',
    title: 'Не работает сканер штрих-кодов',
    description: 'Сканер штрих-кодов на складе перестал считывать коды. Устройство подключено, индикатор горит, но сканирование не происходит. Работа склада частично остановлена.',
    status: 'in_progress',
    priority: 'critical',
    department: 'Логистика',
    created_at: '2025-01-13T07:30:00Z',
    equipment: { name: 'Zebra DS2208' },
    assignee: { full_name: 'Морозов Сергей Владимирович' }
  },
  {
    id: '8',
    title: 'Установка программного обеспечения',
    description: 'Необходима установка AutoCAD 2024 на рабочую станцию инженера Новикова А.П. Лицензионный ключ имеется. Также требуется настройка принтера для вывода чертежей.',
    status: 'closed',
    priority: 'low',
    department: 'Производство',
    created_at: '2025-01-06T10:00:00Z',
    equipment: { name: 'HP Z4 G4 Workstation' },
    assignee: { full_name: 'Иванов Иван Иванович' }
  },
  {
    id: '9',
    title: 'Монитор мигает и гаснет',
    description: 'Монитор Samsung 27" на рабочем месте главного бухгалтера периодически мигает и гаснет. Проблема появилась после грозы. Возможно повреждение блока питания монитора.',
    status: 'open',
    priority: 'medium',
    department: 'Бухгалтерия',
    created_at: '2025-01-12T13:10:00Z',
    equipment: { name: 'Samsung S27A600UUU' },
    assignee: null
  },
  {
    id: '10',
    title: 'Настройка VPN для удалённой работы',
    description: 'Необходима настройка VPN-подключения для 3 сотрудников HR-отдела, переходящих на удалённый формат работы. Требуется создание учётных записей и инструктаж.',
    status: 'resolved',
    priority: 'medium',
    department: 'HR',
    created_at: '2025-01-07T15:00:00Z',
    equipment: null,
    assignee: { full_name: 'Петров Алексей Сергеевич' }
  },
  {
    id: '11',
    title: 'Перегрев ноутбука',
    description: 'Ноутбук Lenovo ThinkPad менеджера по продажам сильно греется и самопроизвольно выключается. Требуется чистка системы охлаждения и замена термопасты.',
    status: 'in_progress',
    priority: 'high',
    department: 'Продажи',
    created_at: '2025-01-11T10:30:00Z',
    equipment: { name: 'Lenovo ThinkPad E15' },
    assignee: { full_name: 'Смирнов Дмитрий Олегович' }
  },
  {
    id: '12',
    title: 'Не работает проектор в переговорной',
    description: 'Проектор Epson в переговорной комнате №2 не подключается к ноутбукам через HDMI. Завтра запланирована важная презентация для клиентов. Требуется срочное устранение.',
    status: 'open',
    priority: 'high',
    department: 'Маркетинг',
    created_at: '2025-01-13T11:00:00Z',
    equipment: { name: 'Epson EB-X51' },
    assignee: null
  }
];
