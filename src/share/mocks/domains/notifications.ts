export interface NotificationRecord {
  id: number;
  kind: string;
  category: string;
  severity: "info" | "warning" | "success" | "error";
  text: string;
  entityType: "created" | "updated" | "deleted";
  isRead: boolean;
  readAt: string | null;
  staffId: number;
  createdAt: string;
  updatedAt: string;
}

export const notifications: NotificationRecord[] = [
  { id: 1, kind: "maintenance_overdue", category: "Обслуживание", severity: "warning", text: "Просрочено ТО для оборудования ПК-001", entityType: "updated", isRead: false, readAt: null, staffId: 1, createdAt: "2024-12-19T11:55:00", updatedAt: "2024-12-19T11:55:00" },
  { id: 2, kind: "ticket_created", category: "Заявки", severity: "info", text: "Новая заявка на ремонт принтера ПР-67890", entityType: "created", isRead: false, readAt: null, staffId: 1, createdAt: "2024-12-19T11:50:00", updatedAt: "2024-12-19T11:50:00" },
  { id: 3, kind: "transfer_completed", category: "Передача", severity: "success", text: "Оборудование НБ-12345 передано новому ответственному", entityType: "updated", isRead: false, readAt: null, staffId: 1, createdAt: "2024-12-19T11:00:00", updatedAt: "2024-12-19T11:00:00" },
  { id: 4, kind: "equipment_broken", category: "Оборудование", severity: "error", text: "Сканер СК-11111 переведен в статус \"Неисправен\"", entityType: "updated", isRead: true, readAt: "2024-12-19T10:10:00", staffId: 1, createdAt: "2024-12-19T10:00:00", updatedAt: "2024-12-19T10:10:00" },
  { id: 5, kind: "maintenance_scheduled", category: "Обслуживание", severity: "info", text: "Плановое ТО для ПК-002 запланировано на завтра", entityType: "created", isRead: true, readAt: "2024-12-19T09:30:00", staffId: 1, createdAt: "2024-12-19T09:00:00", updatedAt: "2024-12-19T09:30:00" },
  { id: 6, kind: "ticket_closed", category: "Заявки", severity: "success", text: "Заявка T-045 закрыта, проблема устранена", entityType: "updated", isRead: true, readAt: "2024-12-19T07:30:00", staffId: 1, createdAt: "2024-12-19T07:00:00", updatedAt: "2024-12-19T07:30:00" },
  { id: 7, kind: "maintenance_overdue", category: "Обслуживание", severity: "warning", text: "Просрочено ТО для 3 единиц оборудования в отделе IT", entityType: "updated", isRead: true, readAt: "2024-12-18T17:00:00", staffId: 1, createdAt: "2024-12-18T16:30:00", updatedAt: "2024-12-18T17:00:00" },
  { id: 8, kind: "user_created", category: "Пользователи", severity: "info", text: "Новый пользователь Козлов К.К. добавлен в систему", entityType: "created", isRead: true, readAt: "2024-12-18T14:30:00", staffId: 1, createdAt: "2024-12-18T14:15:00", updatedAt: "2024-12-18T14:30:00" },
  { id: 9, kind: "ticket_closed", category: "Заявки", severity: "success", text: "Принтер ПР-00234 успешно отремонтирован", entityType: "updated", isRead: true, readAt: "2024-12-18T11:15:00", staffId: 1, createdAt: "2024-12-18T11:00:00", updatedAt: "2024-12-18T11:15:00" },
  { id: 10, kind: "equipment_broken", category: "Оборудование", severity: "error", text: "Критическая неисправность: сервер СВ-001 не отвечает", entityType: "updated", isRead: true, readAt: "2024-12-18T10:00:00", staffId: 1, createdAt: "2024-12-18T09:45:00", updatedAt: "2024-12-18T10:00:00" },
];
