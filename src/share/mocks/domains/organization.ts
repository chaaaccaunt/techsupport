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

export interface BuildingRecord {
  id: number;
  name: string;
  address: string;
  organizationId: number;
}

export const organizations: OrganizationRecord[] = [
  {
    id: 1,
    shortName: "Техподдержка",
    fullName: "ООО Техподдержка",
    createdAt: "2024-01-10T09:00:00",
    updatedAt: "2024-12-18T09:00:00",
    deletedAt: null,
  },
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

export const buildings: BuildingRecord[] = [
  { id: 1, name: "Главное здание", address: "ул. Ленина, 10", organizationId: 1 },
  { id: 2, name: "Склад", address: "ул. Промышленная, 5", organizationId: 1 },
];
