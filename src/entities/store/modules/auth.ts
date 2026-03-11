import { Module } from "vuex";
import { RootState } from "..";
import { AuthCookieUser, emptyAuthCookieUser, parseUserCookie } from "@/share/libs/authCookie";

export interface AuthState {
  currentUser: AuthCookieUser;
  passwordChanged: boolean;
}

export const auth: Module<AuthState, RootState> = {
  namespaced: true,
  state: () => ({
    currentUser: emptyAuthCookieUser,
    passwordChanged: false,
  }),
  getters: {
    currentUser: (state) => state.currentUser,
  },
  mutations: {
    SET_CURRENT_USER(state, user: AuthCookieUser) {
      state.currentUser = user;
    },
    SET_PASSWORD_CHANGED(state, value: boolean) {
      state.passwordChanged = value;
    },
  },
  actions: {
    initFromCookie({ commit }) {
      const user = parseUserCookie();
      commit("SET_CURRENT_USER", user);
      return user;
    },
    setCurrentUser({ commit }, user: AuthCookieUser) {
      commit("SET_CURRENT_USER", user);
    },
  },
};
