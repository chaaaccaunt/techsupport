import { Module } from "vuex";
import { RootState } from "..";

export interface NotificationsState { }

export const notifications: Module<NotificationsState, RootState> = {
  namespaced: true,
};
