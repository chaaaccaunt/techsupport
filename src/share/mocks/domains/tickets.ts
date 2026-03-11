export interface TicketStatusRecord {
  id: number;
  name: string;
  label: string;
}

export interface TicketPriorityRecord {
  id: number;
  name: string;
  label: string;
}

export interface TicketRecord {
  id: number;
  title: string;
  description: string;
  adminComment: string | null;
  rejectReason: string | null;
  completedAt: string | null;
  organizationId: number;
  equipmentId: number | null;
  requesterStaffId: number;
  assigneeStaffId: number | null;
  statusId: number;
  priorityId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export const ticketStatuses: TicketStatusRecord[] = [
  { id: 1, name: "open", label: "Открыта" },
  { id: 2, name: "in_progress", label: "В работе" },
  { id: 3, name: "resolved", label: "Решена" },
  { id: 4, name: "closed", label: "Закрыта" },
];

export const ticketPriorities: TicketPriorityRecord[] = [
  { id: 1, name: "low", label: "Низкий" },
  { id: 2, name: "medium", label: "Средний" },
  { id: 3, name: "high", label: "Высокий" },
  { id: 4, name: "critical", label: "Критический" },
];

export const tickets: TicketRecord[] = [
  { id: 1, title: "Не включается монитор", description: "После запуска рабочей станции монитор остается черным.", adminComment: null, rejectReason: null, completedAt: null, organizationId: 1, equipmentId: 1, requesterStaffId: 1, assigneeStaffId: 3, statusId: 1, priorityId: 3, createdAt: "2024-12-18T10:30:00", updatedAt: "2024-12-18T10:30:00", deletedAt: null },
  { id: 2, title: "Замятие бумаги в принтере", description: "Принтер HP LaserJet постоянно зажевывает бумагу.", adminComment: null, rejectReason: null, completedAt: null, organizationId: 1, equipmentId: 2, requesterStaffId: 2, assigneeStaffId: 3, statusId: 2, priorityId: 2, createdAt: "2024-12-17T12:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 3, title: "Не сканирует документы", description: "Сканер не определяется системой после перезагрузки.", adminComment: null, rejectReason: null, completedAt: "2024-12-15T18:00:00", organizationId: 1, equipmentId: 4, requesterStaffId: 4, assigneeStaffId: 3, statusId: 3, priorityId: 1, createdAt: "2024-12-15T09:00:00", updatedAt: "2024-12-15T18:00:00", deletedAt: null },
];
