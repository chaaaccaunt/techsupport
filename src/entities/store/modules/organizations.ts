import { Module } from "vuex";
import { RootState } from "..";

export interface OrganizationsState { }

export const organizations: Module<OrganizationsState, RootState> = {
  namespaced: true,
};
