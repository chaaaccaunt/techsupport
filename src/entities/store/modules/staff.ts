import { Module } from "vuex";
import { RootState } from "..";

export interface iDepartment {
  id: number
  fullName: string
  shortName: string
}

export interface iStaffState {
  departments: iDepartment[]
}

export const staff: Module<iStaffState, RootState> = {
  namespaced: true,
  mutations: {
    SET_DEPARTMENTS_LIST(state, payload: iDepartment[]) {
      state.departments = payload
    },
    ADD_DEPARTMENT_TO_LIST(state, payload: iDepartment) {
      state.departments.push(payload)
    },
    UPDATE_DEPARTMENT_IN_LIST(state, payload: iDepartment) {
      const exist = state.departments.findIndex((d) => d.id === payload.id)
      if (exist !== -1) state.departments[exist] = payload
    },
    DELETE_DEPARTMENT_FROM_LIST(state, payload: iDepartment) {
      const exist = state.departments.findIndex((d) => d.id === payload.id)
      if (exist !== -1) state.departments.splice(exist, 1)
    }
  },
  getters: {
    GET_DEPARTMENTS(state) {
      return state.departments
    }
  }
}