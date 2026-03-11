import { Module } from "vuex";
import { RootState } from "..";

export type FeedbackType = "success" | "error" | "info" | "warning";

export interface FeedbackItem {
  id: number;
  type: FeedbackType;
  message: string;
  source?: "api" | "ui";
  status?: number;
}

export interface FeedbackState {
  items: FeedbackItem[];
}

interface PushFeedbackPayload {
  type: FeedbackType;
  message: string;
  source?: "api" | "ui";
  status?: number;
  duration?: number;
}

export const feedback: Module<FeedbackState, RootState> = {
  namespaced: true,
  state: () => ({
    items: [],
  }),
  getters: {
    items: (state) => state.items,
  },
  mutations: {
    PUSH(state, item: FeedbackItem) {
      state.items.push(item);
    },
    REMOVE(state, id: number) {
      state.items = state.items.filter((item) => item.id !== id);
    },
  },
  actions: {
    push({ commit }, payload: PushFeedbackPayload) {
      const id = Date.now() + Math.floor(Math.random() * 1000);
      commit("PUSH", {
        id,
        type: payload.type,
        message: payload.message,
        source: payload.source ?? "ui",
        status: payload.status,
      });

      const duration = payload.duration ?? (payload.type === "error" ? 6000 : 4000);
      setTimeout(() => {
        commit("REMOVE", id);
      }, duration);

      return id;
    },
    remove({ commit }, id: number) {
      commit("REMOVE", id);
    },
  },
};
