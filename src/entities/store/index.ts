import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import { auth, AuthState } from "./modules/auth";
import { chat, ChatState } from "./modules/chat";
import { equipment, EquipmentState } from "./modules/equipment";
import { feedback, FeedbackState } from "./modules/feedback";
import { locations, LocationsState } from "./modules/locations";
import { notifications, NotificationsState } from "./modules/notifications";
import { organizations, OrganizationsState } from "./modules/organizations";
import { staff, StaffState } from "./modules/staff";
import { tickets, TicketsState } from "./modules/tickets";

export interface RootState {
  auth: AuthState;
  organizations: OrganizationsState;
  staff: StaffState;
  locations: LocationsState;
  equipment: EquipmentState;
  tickets: TicketsState;
  notifications: NotificationsState;
  feedback: FeedbackState;
  chat: ChatState;
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    auth,
    organizations,
    staff,
    locations,
    equipment,
    tickets,
    notifications,
    feedback,
    chat,
  },
});

export function useStore() {
  return baseUseStore(key);
}
