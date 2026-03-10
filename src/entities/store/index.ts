import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { auth, iUserState } from './modules/auth';
import { iUsersState, users } from './modules/users';
import { iStaffState, staff } from './modules/staff';
import { iModalState, modal } from './modules/modal';

export interface RootState {
  auth: iUserState,
  users: iUsersState
  staff: iStaffState
  modal: iModalState
}


export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    auth,
    users,
    staff,
    modal
  }
});

export function useStore() {
  return baseUseStore(key);
}
