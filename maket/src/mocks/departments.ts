export const departments = [
  {
    id: '1',
    name: 'IT',
    description: 'Отдел информационных технологий',
    head: 'Иванов Иван Иванович',
    employeeCount: 12,
    created_at: '2024-01-15'
  },
  {
    id: '2',
    name: 'Бухгалтерия',
    description: 'Финансовый отдел',
    head: 'Петрова Мария Сергеевна',
    employeeCount: 8,
    created_at: '2024-01-15'
  },
  {
    id: '3',
    name: 'HR',
    description: 'Отдел кадров',
    head: 'Сидорова Анна Петровна',
    employeeCount: 5,
    created_at: '2024-01-15'
  },
  {
    id: '4',
    name: 'Продажи',
    description: 'Отдел продаж',
    head: 'Козлов Дмитрий Александрович',
    employeeCount: 15,
    created_at: '2024-01-15'
  },
  {
    id: '5',
    name: 'Маркетинг',
    description: 'Отдел маркетинга',
    head: 'Новикова Елена Викторовна',
    employeeCount: 7,
    created_at: '2024-01-15'
  },
  {
    id: '6',
    name: 'Производство',
    description: 'Производственный отдел',
    head: 'Смирнов Алексей Николаевич',
    employeeCount: 25,
    created_at: '2024-01-15'
  },
  {
    id: '7',
    name: 'Логистика',
    description: 'Отдел логистики',
    head: 'Морозов Сергей Владимирович',
    employeeCount: 10,
    created_at: '2024-01-15'
  }
];

export const positions = [
  {
    id: '1',
    name: 'Генеральный директор',
    departmentId: null,
    level: 'executive',
    description: 'Высшее руководство компании',
    employeeCount: 1
  },
  {
    id: '2',
    name: 'Системный администратор',
    departmentId: '1',
    level: 'specialist',
    description: 'Управление IT-инфраструктурой',
    employeeCount: 3
  },
  {
    id: '3',
    name: 'Программист',
    departmentId: '1',
    level: 'specialist',
    description: 'Разработка программного обеспечения',
    employeeCount: 6
  },
  {
    id: '4',
    name: 'Руководитель IT-отдела',
    departmentId: '1',
    level: 'manager',
    description: 'Управление IT-отделом',
    employeeCount: 1
  },
  {
    id: '5',
    name: 'Главный бухгалтер',
    departmentId: '2',
    level: 'manager',
    description: 'Управление финансовым отделом',
    employeeCount: 1
  },
  {
    id: '6',
    name: 'Бухгалтер',
    departmentId: '2',
    level: 'specialist',
    description: 'Ведение бухгалтерского учета',
    employeeCount: 5
  },
  {
    id: '7',
    name: 'HR-менеджер',
    departmentId: '3',
    level: 'specialist',
    description: 'Управление персоналом',
    employeeCount: 3
  },
  {
    id: '8',
    name: 'Менеджер по продажам',
    departmentId: '4',
    level: 'specialist',
    description: 'Продажа продукции',
    employeeCount: 10
  },
  {
    id: '9',
    name: 'Руководитель отдела продаж',
    departmentId: '4',
    level: 'manager',
    description: 'Управление отделом продаж',
    employeeCount: 1
  },
  {
    id: '10',
    name: 'Маркетолог',
    departmentId: '5',
    level: 'specialist',
    description: 'Маркетинговые исследования',
    employeeCount: 4
  },
  {
    id: '11',
    name: 'Инженер',
    departmentId: '6',
    level: 'specialist',
    description: 'Производственная деятельность',
    employeeCount: 18
  },
  {
    id: '12',
    name: 'Мастер смены',
    departmentId: '6',
    level: 'supervisor',
    description: 'Управление производственной сменой',
    employeeCount: 4
  },
  {
    id: '13',
    name: 'Логист',
    departmentId: '7',
    level: 'specialist',
    description: 'Управление поставками',
    employeeCount: 6
  },
  {
    id: '14',
    name: 'Начальник склада',
    departmentId: '7',
    level: 'supervisor',
    description: 'Управление складскими операциями',
    employeeCount: 2
  }
];
