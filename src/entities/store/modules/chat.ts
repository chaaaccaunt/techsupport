import { Module } from "vuex";
import { RootState } from "..";

export interface ChatState { }

export const chat: Module<ChatState, RootState> = {
  namespaced: true,
};
