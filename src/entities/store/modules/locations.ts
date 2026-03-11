import { Module } from "vuex";
import { RootState } from "..";

export interface LocationsState { }

export const locations: Module<LocationsState, RootState> = {
  namespaced: true,
};
