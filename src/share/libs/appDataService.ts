import {
  buildings,
  departments,
  equipmentCategories,
  equipments,
  equipmentStatuses,
  getDashboardStats,
  getDepartmentViewItems,
  getEquipmentViewItems,
  getLocationViewItems,
  getMaintenanceViewItems,
  getNotificationViewItems,
  getPositionViewItems,
  roles,
  getTicketViewItems,
  getTransferViewItems,
  getUserViewItems,
  locations,
  positions,
  ticketPriorities,
  ticketStatuses,
} from "@/share/mocks/schemaMocks";

export type RouteDataKey =
  | "dashboard"
  | "equipment"
  | "maintenance"
  | "tickets"
  | "users"
  | "notifications"
  | "locations"
  | "departments";

export const routeDataKeyByRouteName: Partial<Record<string, RouteDataKey>> = {
  Dashboard: "dashboard",
  Equipment: "equipment",
  Maintenance: "maintenance",
  Tickets: "tickets",
  Users: "users",
  Notifications: "notifications",
  Locations: "locations",
  Departments: "departments",
};

export interface StaticCatalogs {
  buildings: typeof buildings;
  departments: typeof departments;
  positions: typeof positions;
  locations: typeof locations;
  equipmentCategories: typeof equipmentCategories;
  equipmentStatuses: typeof equipmentStatuses;
  ticketStatuses: typeof ticketStatuses;
  ticketPriorities: typeof ticketPriorities;
  roles: typeof roles;
  equipmentOptions: Array<{ id: number; name: string; inventoryNumber: string }>;
}

export interface DashboardRouteData {
  stats: ReturnType<typeof getDashboardStats>;
  tickets: ReturnType<typeof getTicketViewItems>;
  transfers: ReturnType<typeof getTransferViewItems>;
}

export interface EquipmentRouteData {
  items: ReturnType<typeof getEquipmentViewItems>;
}

export interface MaintenanceRouteData {
  items: ReturnType<typeof getMaintenanceViewItems>;
  tickets: ReturnType<typeof getTicketViewItems>;
}

export interface TicketsRouteData {
  items: ReturnType<typeof getTicketViewItems>;
}

export interface UsersRouteData {
  items: ReturnType<typeof getUserViewItems>;
}

export interface NotificationsRouteData {
  items: ReturnType<typeof getNotificationViewItems>;
}

export interface LocationsRouteData {
  items: ReturnType<typeof getLocationViewItems>;
  equipmentOptions: typeof equipments;
}

export interface DepartmentsRouteData {
  departments: ReturnType<typeof getDepartmentViewItems>;
  positions: ReturnType<typeof getPositionViewItems>;
}

export interface RouteDataMap {
  dashboard: DashboardRouteData;
  equipment: EquipmentRouteData;
  maintenance: MaintenanceRouteData;
  tickets: TicketsRouteData;
  users: UsersRouteData;
  notifications: NotificationsRouteData;
  locations: LocationsRouteData;
  departments: DepartmentsRouteData;
}

export async function loadStaticCatalogs(): Promise<StaticCatalogs> {
  return {
    buildings,
    departments,
    positions,
    locations,
    equipmentCategories,
    equipmentStatuses,
    ticketStatuses,
    ticketPriorities,
    roles,
    equipmentOptions: equipments.map((item) => ({
      id: item.id,
      name: item.name,
      inventoryNumber: item.inventoryNumber,
    })),
  };
}

export async function loadRouteData<K extends RouteDataKey>(key: K): Promise<RouteDataMap[K]> {
  switch (key) {
    case "dashboard":
      return {
        stats: getDashboardStats(),
        tickets: getTicketViewItems(),
        transfers: getTransferViewItems(),
      } as RouteDataMap[K];
    case "equipment":
      return {
        items: getEquipmentViewItems(),
      } as RouteDataMap[K];
    case "maintenance":
      return {
        items: getMaintenanceViewItems(),
        tickets: getTicketViewItems(),
      } as RouteDataMap[K];
    case "tickets":
      return {
        items: getTicketViewItems(),
      } as RouteDataMap[K];
    case "users":
      return {
        items: getUserViewItems(),
      } as RouteDataMap[K];
    case "notifications":
      return {
        items: getNotificationViewItems(),
      } as RouteDataMap[K];
    case "locations":
      return {
        items: getLocationViewItems(),
        equipmentOptions: equipments,
      } as RouteDataMap[K];
    case "departments":
      return {
        departments: getDepartmentViewItems(),
        positions: getPositionViewItems(),
      } as RouteDataMap[K];
    default:
      throw new Error(`Unsupported route data key: ${key}`);
  }
}
