import { Module } from "vuex";
import { RootState } from "..";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "full";

export interface iModalDescriptor {
  id: string;
  key: string;
  title?: string;
  description?: string;
  size?: ModalSize;
  payload?: unknown;
  dismissible?: boolean;
  confirmText?: string;
  cancelText?: string;
}

export interface iOpenModalPayload extends Omit<iModalDescriptor, "id"> {}

export interface iModalState {
  stack: iModalDescriptor[];
}

const createModalId = () => `modal-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export const modal: Module<iModalState, RootState> = {
  namespaced: true,
  state: () => ({
    stack: [],
  }),
  getters: {
    GET_STACK: (state) => state.stack,
    GET_ACTIVE_MODAL: (state) => state.stack[state.stack.length - 1] ?? null,
    HAS_OPEN_MODAL: (state) => state.stack.length > 0,
  },
  mutations: {
    PUSH_MODAL(state, payload: iModalDescriptor) {
      state.stack.push(payload);
    },
    POP_MODAL(state) {
      state.stack.pop();
    },
    CLOSE_MODAL_BY_ID(state, modalId: string) {
      state.stack = state.stack.filter((item) => item.id !== modalId);
    },
    CLOSE_ALL_MODALS(state) {
      state.stack = [];
    },
    UPDATE_MODAL_PAYLOAD(state, payload: { id: string; data: unknown }) {
      const target = state.stack.find((item) => item.id === payload.id);
      if (!target) return;
      target.payload = payload.data;
    },
  },
  actions: {
    open({ commit }, payload: iOpenModalPayload) {
      const descriptor: iModalDescriptor = {
        id: createModalId(),
        size: "md",
        dismissible: true,
        cancelText: "Отмена",
        confirmText: "Подтвердить",
        ...payload,
      };
      commit("PUSH_MODAL", descriptor);
      return descriptor.id;
    },
    close({ commit, getters }, modalId?: string) {
      if (modalId) {
        commit("CLOSE_MODAL_BY_ID", modalId);
        return;
      }

      const activeModal = getters.GET_ACTIVE_MODAL as iModalDescriptor | null;
      if (!activeModal) return;
      commit("CLOSE_MODAL_BY_ID", activeModal.id);
    },
    closeAll({ commit }) {
      commit("CLOSE_ALL_MODALS");
    },
    updatePayload({ commit }, payload: { id: string; data: unknown }) {
      commit("UPDATE_MODAL_PAYLOAD", payload);
    },
  },
};
