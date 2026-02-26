import { Module } from "vuex";
import { RootState } from "..";

interface iRoles {
  id: number,
  name: string,
  description: string
}

export interface iUserInfo {
  id: number,
  fullName: string
  firstName: string
  lastName: string
  surname: string | null,
  email: string
  phone: string
  staff: iStaff
}

interface iStaff {
  organization: iOrganization,
  position: {
    id: number,
    fullName: string
  }
  department: {
    id: number,
    fullName: string
  }
  roles: iRoles[]
}
interface iOrganization {
  id: number,
  shortName: string
  fullName: string
}

interface iRoles {
  name: string
  description: string
}

export interface iUserState {
  user: iUserInfo
}

export const auth: Module<iUserState, RootState> = {
  namespaced: true,
  mutations: {
    SET_USER(state, payload: iUserInfo) {
      state.user = payload
    }
  },
  getters: {
    GET_USER: (store) => store.user
  }
}