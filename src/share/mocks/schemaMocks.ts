import { buildings, departments, positions } from "./domains/organization";
import { roles, staff, staffRoles, users } from "./domains/staff";
import { locations } from "./domains/locations";
import {
  equipmentCategories,
  equipments,
  equipmentMaintenances,
  equipmentStatuses,
  equipmentTransfers,
} from "./domains/equipment";
import { ticketPriorities, tickets, ticketStatuses } from "./domains/tickets";
import { notifications } from "./domains/notifications";
import { messages, roomParticipants, rooms } from "./domains/chat";

export * from "./domains/organization";
export * from "./domains/staff";
export * from "./domains/locations";
export * from "./domains/equipment";
export * from "./domains/tickets";
export * from "./domains/notifications";
export * from "./domains/chat";

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

export function getBuildingById(id: number | null | undefined) {
  return buildings.find((item) => item.id === id);
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

export function formatPerson(user: { firstName: string; lastName: string; surname: string | null } | undefined) {
  if (!user) return "Не указан";
  return [user.lastName, user.firstName, user.surname].filter(Boolean).join(" ");
}

export function formatInitials(user: { firstName: string; lastName: string; surname: string | null } | undefined) {
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
  if (!value) return "Не назначено";
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
    const building = getBuildingById(location?.buildingId);
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
        status?.name === "working"
          ? "Исправно"
          : status?.name === "broken"
            ? "Неисправно"
            : status?.name === "maintenance"
              ? "На ТО"
              : "Списано",
      location: [building?.name, location?.name].filter(Boolean).join(" / ") || "Не указана",
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
    building: getBuildingById(item.buildingId)?.name ?? "Не указано",
    area: item.area,
    description: item.description,
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
      const fromText = [fromDepartment?.shortName, formatPerson(fromResponsibleUser)].filter((value) => value && value !== "Не указан").join(" / ");
      const toText = [toDepartment?.shortName, formatPerson(toResponsibleUser)].filter((value) => value && value !== "Не указан").join(" / ");

      return {
        id: item.id,
        equipment: equipment?.name ?? "Не найдено",
        inventoryNumber: equipment?.inventoryNumber ?? "Не указан",
        from: fromText || "Не указано",
        to: toText || "Не указано",
        comment: item.comment ?? "Без комментария",
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

export function getNotificationViewItems() {
  const now = new Date("2024-12-19T12:00:00");

  return notifications
    .map((item) => {
      const createdDate = new Date(item.createdAt);
      const diffMinutes = Math.max(1, Math.floor((now.getTime() - createdDate.getTime()) / 60000));
      const diffHours = Math.floor(diffMinutes / 60);
      const diffDays = Math.floor(diffHours / 24);

      let time = `${diffMinutes} мин назад`;
      if (diffHours >= 1 && diffHours < 24) {
        time = `${diffHours} ч назад`;
      } else if (diffDays >= 1) {
        time = createdDate.toLocaleString("ru-RU", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
      }

      let date = "Сегодня";
      if (diffDays === 1) {
        date = "Вчера";
      } else if (diffDays > 1) {
        date = createdDate.toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
      }

      return {
        id: item.id,
        text: item.text,
        type: item.severity,
        time,
        date,
        read: item.isRead,
        category: item.category,
        kind: item.kind,
        severity: item.severity,
        entityType: item.entityType,
        staffId: item.staffId,
        readAt: item.readAt,
        createdAt: item.createdAt,
      };
    })
    .sort((left, right) => right.createdAt.localeCompare(left.createdAt));
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
