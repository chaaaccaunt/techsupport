import ChatCreateModal from "./ChatCreateModal.vue";
import ChatPanelModal from "./ChatPanelModal.vue";
import ConfirmActionModal from "./ConfirmActionModal.vue";
import DashboardExportModal from "./DashboardExportModal.vue";
import DepartmentsModal from "./DepartmentsModal.vue";
import EquipmentModal from "./EquipmentModal.vue";
import LocationsModal from "./LocationsModal.vue";
import LocationsCreateModal from "./LocationsCreateModal.vue";
import MaintenanceModal from "./MaintenanceModal.vue";
import UsersModal from "./UsersModal.vue";
import {
  AddEquipmentModal,
  CreateTicketModal,
  EditMaintenanceModal,
  EditTicketModal,
  MaintenanceHistoryModal,
  QRScannerModal,
  TransferHistoryModal,
  ViewMaintenanceModal,
} from "@/share/features";

export const modalComponentRegistry = {
  "dashboard.export": DashboardExportModal,
  "dashboard.edit-ticket": EditTicketModal,
  "equipment.create": AddEquipmentModal,
  "equipment.view": EquipmentModal,
  "equipment.edit": EquipmentModal,
  "equipment.delete": EquipmentModal,
  "equipment.qr-scan": QRScannerModal,
  "equipment.transfer-history": TransferHistoryModal,
  "locations.create": LocationsCreateModal,
  "locations.view": LocationsModal,
  "locations.edit": LocationsModal,
  "locations.delete": LocationsModal,
  "locations.equipment": LocationsModal,
  "users.view": UsersModal,
  "users.create": UsersModal,
  "users.edit": UsersModal,
  "users.delete": UsersModal,
  "departments.create": DepartmentsModal,
  "departments.edit": DepartmentsModal,
  "departments.delete": ConfirmActionModal,
  "positions.create": DepartmentsModal,
  "positions.edit": DepartmentsModal,
  "positions.delete": ConfirmActionModal,
  "maintenance.create": MaintenanceModal,
  "maintenance.view": ViewMaintenanceModal,
  "maintenance.edit": EditMaintenanceModal,
  "maintenance.delete": ConfirmActionModal,
  "maintenance.history": MaintenanceHistoryModal,
  "maintenance.calendar": MaintenanceModal,
  "tickets.create": CreateTicketModal,
  "tickets.edit": EditTicketModal,
  "tickets.delete": ConfirmActionModal,
  "chat.create": ChatCreateModal,
  "chat.info": ChatPanelModal,
  "chat.members": ChatPanelModal,
  "chat.clear-history": ChatPanelModal,
  "chat.delete": ChatPanelModal,
} as const;
