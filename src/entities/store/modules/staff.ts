import { Module } from "vuex";
import { RootState } from "..";

export interface StaffState { }

export const staff: Module<StaffState, RootState> = {
  namespaced: true,
};
