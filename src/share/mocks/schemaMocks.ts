export interface OrganizationRecord {
  id: number;
  shortName: string;
  fullName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DepartmentRecord {
  id: number;
  shortName: string;
  fullName: string;
  organizationId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PositionRecord {
  id: number;
  shortName: string;
  fullName: string;
  organizationId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface UserRecord {
  uid: string;
  login: string;
  phone: string | null;
  password: string;
  firstName: string;
  lastName: string;
  surname: string | null;
  avatarFileId: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface RoleRecord {
  id: number;
  name: string;
  description: string | null;
  organizationId: number;
}

export interface StaffRecord {
  id: number;
  userUid: string;
  organizationId: number | null;
  departmentId: number | null;
  positionId: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface StaffRoleRecord {
  id: number;
  staffId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
}

export interface BuildingRecord {
  id: number;
  name: string;
  address: string;
}

export interface LocationRecord {
  id: number;
  name: string;
}

export interface EquipmentCategoryRecord {
  id: number;
  name: string;
}

export interface EquipmentStatusRecord {
  id: number;
  name: string;
}

export interface EquipmentRecord {
  id: number;
  name: string;
  serialNumber: string;
  inventoryNumber: string;
  categoryId: number;
  statusId: number;
  locationId: number;
  responsibleId: number | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EquipmentMaintenanceRecord {
  id: number;
  last: string | null;
  next: string | null;
  equipmentId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface EquipmentTransferRecord {
  id: number;
  transferDate: string;
  comment: string | null;
  equipmentId: number;
  fromResponsibleId: number | null;
  toResponsibleId: number | null;
  fromDepartmentId: number | null;
  toDepartmentId: number | null;
  createdByStaffId: number;
  createdAt: string;
  updatedAt: string;
}

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

export const organizations: OrganizationRecord[] = [
  { id: 1, shortName: "Техподдержка", fullName: "ООО Техподдержка", createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
];

export const departments: DepartmentRecord[] = [
  { id: 1, shortName: "IT", fullName: "IT отдел", organizationId: 1, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 2, shortName: "БУХ", fullName: "Бухгалтерия", organizationId: 1, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 3, shortName: "ПРОД", fullName: "Отдел продаж", organizationId: 1, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
];

export const positions: PositionRecord[] = [
  { id: 1, shortName: "Сисадмин", fullName: "Системный администратор", organizationId: 1, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 2, shortName: "Главбух", fullName: "Главный бухгалтер", organizationId: 1, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 3, shortName: "Менеджер", fullName: "Менеджер по продажам", organizationId: 1, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
];

export const users: UserRecord[] = [
  { uid: "u-001", login: "ivanov@company.ru", phone: "9991234567", password: "stub", firstName: "Иван", lastName: "Иванов", surname: "Иванович", avatarFileId: null, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T09:30:00", deletedAt: null },
  { uid: "u-002", login: "petrov@company.ru", phone: "9992345678", password: "stub", firstName: "Петр", lastName: "Петров", surname: "Петрович", avatarFileId: null, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T08:15:00", deletedAt: null },
  { uid: "u-003", login: "sidorov@company.ru", phone: "9993456789", password: "stub", firstName: "Сидор", lastName: "Сидоров", surname: "Сидорович", avatarFileId: null, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-17T17:45:00", deletedAt: null },
  { uid: "u-004", login: "kozlov@company.ru", phone: "9994567890", password: "stub", firstName: "Константин", lastName: "Козлов", surname: "Константинович", avatarFileId: null, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T10:20:00", deletedAt: null },
];

export const roles: RoleRecord[] = [
  { id: 1, name: "admin", description: "Администратор", organizationId: 1 },
  { id: 2, name: "manager", description: "Менеджер", organizationId: 1 },
  { id: 3, name: "technician", description: "Техник", organizationId: 1 },
  { id: 4, name: "user", description: "Пользователь", organizationId: 1 },
];

export const staff: StaffRecord[] = [
  { id: 1, userUid: "u-001", organizationId: 1, departmentId: 1, positionId: 1, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T09:30:00", deletedAt: null },
  { id: 2, userUid: "u-002", organizationId: 1, departmentId: 2, positionId: 2, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T08:15:00", deletedAt: null },
  { id: 3, userUid: "u-003", organizationId: 1, departmentId: 1, positionId: 1, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-17T17:45:00", deletedAt: null },
  { id: 4, userUid: "u-004", organizationId: 1, departmentId: 3, positionId: 3, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T10:20:00", deletedAt: null },
];

export const staffRoles: StaffRoleRecord[] = [
  { id: 1, staffId: 1, roleId: 1, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-01-10T09:00:00" },
  { id: 2, staffId: 2, roleId: 2, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-01-10T09:00:00" },
  { id: 3, staffId: 3, roleId: 3, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-01-10T09:00:00" },
  { id: 4, staffId: 4, roleId: 4, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-01-10T09:00:00" },
];

export const buildings: BuildingRecord[] = [
  { id: 1, name: "Главное здание", address: "ул. Ленина, 10" },
  { id: 2, name: "Склад", address: "ул. Промышленная, 5" },
];

export const locations: LocationRecord[] = [
  { id: 1, name: "Офис 101" },
  { id: 2, name: "Офис 205" },
  { id: 3, name: "Серверная" },
];

export const equipmentCategories: EquipmentCategoryRecord[] = [
  { id: 1, name: "Компьютеры" },
  { id: 2, name: "Принтеры" },
  { id: 3, name: "Мониторы" },
  { id: 4, name: "Сканеры" },
];

export const equipmentStatuses: EquipmentStatusRecord[] = [
  { id: 1, name: "working" },
  { id: 2, name: "broken" },
  { id: 3, name: "maintenance" },
  { id: 4, name: "disposed" },
];

export const equipments: EquipmentRecord[] = [
  { id: 1, name: "Компьютер Dell OptiPlex 7090", serialNumber: "DL789456123", inventoryNumber: "ИН-2024-001", categoryId: 1, statusId: 1, locationId: 1, responsibleId: 1, createdAt: "2024-02-01T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 2, name: "Принтер HP LaserJet Pro 400", serialNumber: "HP456789012", inventoryNumber: "ИН-2024-002", categoryId: 2, statusId: 2, locationId: 2, responsibleId: 2, createdAt: "2024-02-05T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 3, name: "Монитор Samsung 24 F24T450FQI", serialNumber: "SM123456789", inventoryNumber: "ИН-2024-003", categoryId: 3, statusId: 1, locationId: 1, responsibleId: 1, createdAt: "2024-02-10T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 4, name: "Сканер Canon CanoScan LiDE 300", serialNumber: "CN987654321", inventoryNumber: "ИН-2024-004", categoryId: 4, statusId: 3, locationId: 3, responsibleId: 3, createdAt: "2024-02-15T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
];

export const equipmentMaintenances: EquipmentMaintenanceRecord[] = [
  { id: 1, last: "2024-12-15", next: "2025-03-15", equipmentId: 1, createdAt: "2024-12-15T14:30:00", updatedAt: "2024-12-15T14:30:00", deletedAt: null },
  { id: 2, last: null, next: "2024-12-20", equipmentId: 2, createdAt: "2024-12-10T09:00:00", updatedAt: "2024-12-10T09:00:00", deletedAt: null },
  { id: 3, last: "2024-12-10", next: "2025-06-10", equipmentId: 3, createdAt: "2024-12-10T11:00:00", updatedAt: "2024-12-10T11:00:00", deletedAt: null },
  { id: 4, last: null, next: "2024-12-01", equipmentId: 4, createdAt: "2024-11-25T11:00:00", updatedAt: "2024-11-25T11:00:00", deletedAt: null },
];

export const equipmentTransfers: EquipmentTransferRecord[] = [
  { id: 1, transferDate: "2024-12-18T09:15:00", comment: "Передано для нового сотрудника отдела продаж.", equipmentId: 1, fromResponsibleId: 1, toResponsibleId: 4, fromDepartmentId: 1, toDepartmentId: 3, createdByStaffId: 3, createdAt: "2024-12-18T09:00:00", updatedAt: "2024-12-18T09:15:00" },
  { id: 2, transferDate: "2024-12-17T15:40:00", comment: "Возврат принтера после диагностики.", equipmentId: 2, fromResponsibleId: 3, toResponsibleId: 2, fromDepartmentId: 1, toDepartmentId: 2, createdByStaffId: 1, createdAt: "2024-12-17T15:00:00", updatedAt: "2024-12-17T15:40:00" },
  { id: 3, transferDate: "2024-12-16T11:20:00", comment: "Монитор передан в переговорную.", equipmentId: 3, fromResponsibleId: 1, toResponsibleId: null, fromDepartmentId: 1, toDepartmentId: 3, createdByStaffId: 3, createdAt: "2024-12-16T11:00:00", updatedAt: "2024-12-16T11:20:00" },
  { id: 4, transferDate: "2024-12-12T10:05:00", comment: "Сканер принят в IT для обслуживания.", equipmentId: 4, fromResponsibleId: 4, toResponsibleId: 3, fromDepartmentId: 3, toDepartmentId: 1, createdByStaffId: 1, createdAt: "2024-12-12T09:30:00", updatedAt: "2024-12-12T10:05:00" },
];

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

export function getUserByUid(uid: string) {
  return users.find((item) => item.uid === uid);
}

export function getStaffById(id: number | null | undefined) {
  return staff.find((item) => item.id === id);
}

export function getDepartmentById(id: number | null | undefined) {
  return departments.find((item) => item.id === id);
}

export function getPositionById(id: number | null | undefined) {
  return positions.find((item) => item.id === id);
}

export function getRoleByStaffId(staffId: number) {
  const link = staffRoles.find((item) => item.staffId === staffId);
  return roles.find((item) => item.id === link?.roleId);
}

export function getEquipmentById(id: number | null | undefined) {
  return equipments.find((item) => item.id === id);
}

export function getLocationById(id: number | null | undefined) {
  return locations.find((item) => item.id === id);
}

export function getCategoryById(id: number | null | undefined) {
  return equipmentCategories.find((item) => item.id === id);
}

export function getEquipmentStatusById(id: number | null | undefined) {
  return equipmentStatuses.find((item) => item.id === id);
}

export function getMaintenanceByEquipmentId(equipmentId: number) {
  return equipmentMaintenances.find((item) => item.equipmentId === equipmentId) ?? null;
}

export function getTicketStatusById(id: number) {
  return ticketStatuses.find((item) => item.id === id);
}

export function getTicketPriorityById(id: number) {
  return ticketPriorities.find((item) => item.id === id);
}

export function formatPerson(user: UserRecord | undefined) {
  if (!user) return "Не указан";
  return [user.lastName, user.firstName, user.surname].filter(Boolean).join(" ");
}

export function formatInitials(user: UserRecord | undefined) {
  const fullName = formatPerson(user);
  return fullName
    .split(" ")
    .map((item) => item[0] ?? "")
    .join("")
    .slice(0, 2);
}

export function formatPhone(phone: string | null) {
  if (!phone) return "Не указан";
  return `+7 (${phone.slice(0, 3)}) ${phone.slice(3, 6)}-${phone.slice(6, 8)}-${phone.slice(8, 10)}`;
}

export function formatDate(value: string | null) {
  if (!value) return "Не назначено";
  return value.slice(0, 10);
}

export function formatDateTime(value: string | null) {
  if (!value) return "РќРµ РЅР°Р·РЅР°С‡РµРЅРѕ";
  return value.replace("T", " ").slice(0, 16);
}

export function getUserViewItems() {
  return staff.map((staffItem) => {
    const user = getUserByUid(staffItem.userUid);
    const department = getDepartmentById(staffItem.departmentId);
    const position = getPositionById(staffItem.positionId);
    const role = getRoleByStaffId(staffItem.id);
    const equipmentCount = equipments.filter((item) => item.responsibleId === staffItem.id).length;
    const ticketsCount = tickets.filter((item) => item.requesterStaffId === staffItem.id || item.assigneeStaffId === staffItem.id).length;

    return {
      id: staffItem.id,
      uid: user?.uid ?? "",
      name: formatPerson(user),
      initials: formatInitials(user),
      email: user?.login ?? "",
      phone: formatPhone(user?.phone ?? null),
      role: role?.name ?? "user",
      roleText: role?.description ?? "Пользователь",
      department: department?.fullName ?? "Не назначен",
      position: position?.fullName ?? "Не назначена",
      updatedAt: user?.updatedAt ?? staffItem.updatedAt,
      equipmentCount,
      ticketsCount,
      status: user?.deletedAt ? "Неактивен" : "Активен",
    };
  });
}

export function getEquipmentViewItems() {
  return equipments.map((item) => {
    const category = getCategoryById(item.categoryId);
    const status = getEquipmentStatusById(item.statusId);
    const location = getLocationById(item.locationId);
    const responsibleStaff = getStaffById(item.responsibleId);
    const responsibleUser = getUserByUid(responsibleStaff?.userUid ?? "");
    const maintenance = getMaintenanceByEquipmentId(item.id);

    return {
      id: item.id,
      code: item.inventoryNumber,
      name: item.name,
      serial: item.serialNumber,
      category: category?.name ?? "",
      status: status?.name ?? "",
      statusText:
        status?.name === "working" ? "Исправно" :
        status?.name === "broken" ? "Неисправно" :
        status?.name === "maintenance" ? "На ТО" : "Списано",
      location: location?.name ?? "Не указана",
      responsible: formatPerson(responsibleUser),
      nextMaintenance: formatDate(maintenance?.next ?? null),
    };
  });
}

export function getTicketViewItems() {
  return tickets.map((item) => {
    const status = getTicketStatusById(item.statusId);
    const priority = getTicketPriorityById(item.priorityId);
    const equipment = getEquipmentById(item.equipmentId);
    const requester = getStaffById(item.requesterStaffId);
    const assignee = getStaffById(item.assigneeStaffId);
    const requesterDepartment = getDepartmentById(requester?.departmentId);
    const assigneeUser = getUserByUid(assignee?.userUid ?? "");

    return {
      id: item.id,
      title: item.title,
      description: item.description,
      department: requesterDepartment?.fullName ?? "Не указан",
      status: status?.name ?? "open",
      statusText: status?.label ?? "Открыта",
      priority: priority?.name ?? "low",
      priorityText: priority?.label ?? "Низкий",
      equipment: equipment?.inventoryNumber ?? "Не выбрано",
      date: formatDate(item.createdAt),
      assignee: formatPerson(assigneeUser),
    };
  });
}

export function getDepartmentViewItems() {
  return departments.map((item) => ({
    id: item.id,
    shortName: item.shortName,
    name: item.fullName,
    employeeCount: staff.filter((entry) => entry.departmentId === item.id).length,
  }));
}

export function getPositionViewItems() {
  return positions.map((item) => ({
    id: item.id,
    shortName: item.shortName,
    name: item.fullName,
    employeeCount: staff.filter((entry) => entry.positionId === item.id).length,
  }));
}

export function getLocationViewItems() {
  return locations.map((item) => ({
    id: item.id,
    name: item.name,
    equipmentCount: equipments.filter((entry) => entry.locationId === item.id).length,
  }));
}

export function getMaintenanceViewItems() {
  return equipmentMaintenances.map((item) => {
    const equipment = getEquipmentById(item.equipmentId);
    const responsibleStaff = equipment ? getStaffById(equipment.responsibleId) : null;
    const responsibleUser = getUserByUid(responsibleStaff?.userUid ?? "");
    const nextDate = item.next ?? "";
    const status = item.last ? "completed" : nextDate < "2024-12-18" ? "overdue" : "scheduled";

    return {
      id: item.id,
      equipmentId: item.equipmentId,
      equipment: equipment?.name ?? "Не найдено",
      date: formatDate(item.next ?? item.last),
      last: formatDate(item.last),
      next: formatDate(item.next),
      responsible: formatPerson(responsibleUser),
      status,
      statusText: status === "completed" ? "Выполнено" : status === "overdue" ? "Просрочено" : "Запланировано",
      statusTone: status === "completed" ? "green" : status === "overdue" ? "red" : "blue",
    };
  });
}

export function getTransferViewItems() {
  return equipmentTransfers
    .map((item) => {
      const equipment = getEquipmentById(item.equipmentId);
      const fromResponsible = getStaffById(item.fromResponsibleId);
      const toResponsible = getStaffById(item.toResponsibleId);
      const createdBy = getStaffById(item.createdByStaffId);
      const fromDepartment = getDepartmentById(item.fromDepartmentId);
      const toDepartment = getDepartmentById(item.toDepartmentId);
      const fromResponsibleUser = getUserByUid(fromResponsible?.userUid ?? "");
      const toResponsibleUser = getUserByUid(toResponsible?.userUid ?? "");
      const createdByUser = getUserByUid(createdBy?.userUid ?? "");
      const fromText = [fromDepartment?.shortName, formatPerson(fromResponsibleUser)].filter((value) => value && value !== "РќРµ СѓРєР°Р·Р°РЅ").join(" / ");
      const toText = [toDepartment?.shortName, formatPerson(toResponsibleUser)].filter((value) => value && value !== "РќРµ СѓРєР°Р·Р°РЅ").join(" / ");

      return {
        id: item.id,
        equipment: equipment?.name ?? "РќРµ РЅР°Р№РґРµРЅРѕ",
        inventoryNumber: equipment?.inventoryNumber ?? "РќРµ СѓРєР°Р·Р°РЅ",
        from: fromText || "РќРµ СѓРєР°Р·Р°РЅРѕ",
        to: toText || "РќРµ СѓРєР°Р·Р°РЅРѕ",
        comment: item.comment ?? "Р‘РµР· РєРѕРјРјРµРЅС‚Р°СЂРёСЏ",
        date: formatDate(item.transferDate),
        dateTime: formatDateTime(item.transferDate),
        createdBy: formatPerson(createdByUser),
      };
    })
    .sort((left, right) => right.dateTime.localeCompare(left.dateTime));
}

export function getDashboardStats() {
  return [
    { title: "Всего оборудования", value: String(equipments.length), icon: "ri-computer-line", tone: "blue" },
    { title: "Исправное", value: String(equipments.filter((item) => item.statusId === 1).length), icon: "ri-checkbox-circle-line", tone: "green" },
    { title: "Неисправное", value: String(equipments.filter((item) => item.statusId === 2).length), icon: "ri-error-warning-line", tone: "red" },
    { title: "На ТО", value: String(equipments.filter((item) => item.statusId === 3).length), icon: "ri-tools-line", tone: "yellow" },
    { title: "Без ответственного", value: String(equipments.filter((item) => !item.responsibleId).length), icon: "ri-user-unfollow-line", tone: "orange" },
    { title: "Просроченное ТО", value: String(getMaintenanceViewItems().filter((item) => item.status === "overdue").length), icon: "ri-time-line", tone: "purple" },
  ];
}

export function getChatRoomItems() {
  return rooms.map((room) => {
    const lastMessage = messages
      .filter((item) => item.roomId === room.id)
      .sort((left, right) => right.createdAt.localeCompare(left.createdAt))[0];
    return {
      id: room.id,
      name: room.name ?? `Комната ${room.id}`,
      type: room.type,
      membersCount: roomParticipants.filter((item) => item.roomId === room.id).length,
      lastMessage: lastMessage?.content ?? "",
      lastMessageTime: lastMessage ? lastMessage.createdAt.slice(11, 16) : "",
    };
  });
}

export function getChatMessageItems(roomId: string) {
  return messages
    .filter((item) => item.roomId === roomId)
    .map((item) => {
      const messageStaff = getStaffById(item.staffId);
      const user = getUserByUid(messageStaff?.userUid ?? "");
      return {
        id: item.id,
        senderAvatar: formatInitials(user),
        senderName: formatPerson(user),
        text: item.content,
        timestamp: item.createdAt.slice(11, 16),
        isOwn: item.staffId === 3,
      };
    });
}
