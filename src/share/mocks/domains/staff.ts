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
  organizationId: number | null;
}

export interface StaffRecord {
  id: number;
  userUid: string;
  organizationId: number;
  departmentId: number;
  positionId: number;
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

export const users: UserRecord[] = [
  { uid: "u-001", login: "ivanov@company.ru", phone: "9991234567", password: "stub", firstName: "Иван", lastName: "Иванов", surname: "Иванович", avatarFileId: null, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T09:30:00", deletedAt: null },
  { uid: "u-002", login: "petrov@company.ru", phone: "9992345678", password: "stub", firstName: "Петр", lastName: "Петров", surname: "Петрович", avatarFileId: null, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T08:15:00", deletedAt: null },
  { uid: "u-003", login: "sidorov@company.ru", phone: "9993456789", password: "stub", firstName: "Сидор", lastName: "Сидоров", surname: "Сидорович", avatarFileId: null, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-17T17:45:00", deletedAt: null },
  { uid: "u-004", login: "kozlov@company.ru", phone: "9994567890", password: "stub", firstName: "Константин", lastName: "Козлов", surname: "Константинович", avatarFileId: null, createdAt: "2024-01-10T09:00:00", updatedAt: "2024-12-18T10:20:00", deletedAt: null },
];

export const roles: RoleRecord[] = [
  { id: 1, name: "admin", description: "Администратор", organizationId: null },
  { id: 2, name: "manager", description: "Менеджер", organizationId: null },
  { id: 3, name: "technician", description: "Техник", organizationId: null },
  { id: 4, name: "user", description: "Пользователь", organizationId: null },
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
