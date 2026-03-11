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
  departmentId: number | null;
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
  { id: 1, name: "Компьютер Dell OptiPlex 7090", serialNumber: "DL789456123", inventoryNumber: "ИН-2024-001", categoryId: 1, statusId: 1, locationId: 1, departmentId: 1, responsibleId: 1, createdAt: "2024-02-01T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 2, name: "Принтер HP LaserJet Pro 400", serialNumber: "HP456789012", inventoryNumber: "ИН-2024-002", categoryId: 2, statusId: 2, locationId: 2, departmentId: 2, responsibleId: 2, createdAt: "2024-02-05T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 3, name: "Монитор Samsung 24 F24T450FQI", serialNumber: "SM123456789", inventoryNumber: "ИН-2024-003", categoryId: 3, statusId: 1, locationId: 1, departmentId: 1, responsibleId: 1, createdAt: "2024-02-10T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
  { id: 4, name: "Сканер Canon CanoScan LiDE 300", serialNumber: "CN987654321", inventoryNumber: "ИН-2024-004", categoryId: 4, statusId: 3, locationId: 3, departmentId: 1, responsibleId: 3, createdAt: "2024-02-15T09:00:00", updatedAt: "2024-12-18T09:00:00", deletedAt: null },
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
