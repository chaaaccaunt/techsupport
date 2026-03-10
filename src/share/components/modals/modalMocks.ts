import {
  formatInitials,
  formatPerson,
  getChatRoomItems,
  getDepartmentById,
  getDepartmentViewItems,
  getMaintenanceViewItems,
  getPositionViewItems,
  getTicketViewItems,
  getUserByUid,
  getUserViewItems,
  staff,
} from "@/share/mocks/schemaMocks";

export const dashboardTickets = getTicketViewItems().map((item) => ({
  id: String(item.id),
  equipment: item.equipment,
  description: item.description,
  priority: item.priorityText,
  status: item.statusText,
}));

export const modalUsers = getUserViewItems();

export const modalDepartments = getDepartmentViewItems().map((item) => ({
  id: String(item.id),
  shortName: item.shortName,
  name: item.name,
  employeeCount: item.employeeCount,
}));

export const modalPositions = getPositionViewItems().map((item) => ({
  id: String(item.id),
  shortName: item.shortName,
  name: item.name,
  employeeCount: item.employeeCount,
}));

export const maintenanceCalendarItems = getMaintenanceViewItems();

export const chatMembers = staff.map((staffItem) => {
  const user = getUserByUid(staffItem.userUid);
  const department = getDepartmentById(staffItem.departmentId);

  return {
    id: String(staffItem.id),
    name: formatPerson(user),
    dept: department?.fullName ?? "Без отдела",
    avatar: formatInitials(user),
  };
});

export const chatRooms = getChatRoomItems();
