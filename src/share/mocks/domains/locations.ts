export interface LocationRecord {
  id: number;
  name: string;
  buildingId: number;
  area: number | null;
  description: string | null;
}

export const locations: LocationRecord[] = [
  { id: 1, name: "Офис 101", buildingId: 1, area: 42.5, description: "Рабочая зона IT-отдела" },
  { id: 2, name: "Офис 205", buildingId: 1, area: 36, description: "Кабинет бухгалтерии" },
  { id: 3, name: "Серверная", buildingId: 2, area: 18, description: "Помещение для серверного оборудования" },
];
