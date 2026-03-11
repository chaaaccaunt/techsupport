export interface RoomRecord {
  id: string;
  type: "global" | "organization" | "department" | "group" | "private" | "ticket";
  name: string | null;
  organizationId: number | null;
  departmentId: number | null;
  ticketId: number | null;
}

export interface RoomParticipantRecord {
  id: string;
  staffId: number;
  roomId: string;
}

export interface MessageRecord {
  id: string;
  content: string;
  roomId: string;
  staffId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export const rooms: RoomRecord[] = [
  { id: "room-general", type: "global", name: "Общий чат", organizationId: 1, departmentId: null, ticketId: null },
  { id: "room-it", type: "department", name: "IT отдел", organizationId: 1, departmentId: 1, ticketId: null },
  { id: "room-ticket-1", type: "ticket", name: "Заявка #1", organizationId: 1, departmentId: null, ticketId: 1 },
];

export const roomParticipants: RoomParticipantRecord[] = [
  { id: "rp-1", roomId: "room-general", staffId: 1 },
  { id: "rp-2", roomId: "room-general", staffId: 2 },
  { id: "rp-3", roomId: "room-general", staffId: 3 },
  { id: "rp-4", roomId: "room-general", staffId: 4 },
  { id: "rp-5", roomId: "room-it", staffId: 1 },
  { id: "rp-6", roomId: "room-it", staffId: 3 },
  { id: "rp-7", roomId: "room-ticket-1", staffId: 1 },
  { id: "rp-8", roomId: "room-ticket-1", staffId: 3 },
];

export const messages: MessageRecord[] = [
  { id: "m-1", content: "Коллеги, напоминаю про плановое обслуживание завтра.", roomId: "room-general", staffId: 1, createdAt: "2024-12-18T10:15:00", updatedAt: "2024-12-18T10:15:00", deletedAt: null },
  { id: "m-2", content: "Принято, подготовлю список оборудования.", roomId: "room-general", staffId: 3, createdAt: "2024-12-18T10:18:00", updatedAt: "2024-12-18T10:18:00", deletedAt: null },
  { id: "m-3", content: "Нужен доступ в серверную на 14:00.", roomId: "room-general", staffId: 2, createdAt: "2024-12-18T10:20:00", updatedAt: "2024-12-18T10:20:00", deletedAt: null },
];
