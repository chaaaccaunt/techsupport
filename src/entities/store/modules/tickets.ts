import { Module } from "vuex";
import { RootState } from "..";

export interface TicketsState { }

export const tickets: Module<TicketsState, RootState> = {
  namespaced: true,
};
