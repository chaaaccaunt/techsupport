import { Module } from "vuex";
import { RootState } from "..";

export interface EquipmentState { }

export const equipment: Module<EquipmentState, RootState> = {
  namespaced: true,
};
