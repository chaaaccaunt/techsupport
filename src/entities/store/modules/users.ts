import { Module } from "vuex";
import { RootState } from "..";

export interface iUsersState {
  users: []
}

export const users: Module<iUsersState, RootState> = {
}