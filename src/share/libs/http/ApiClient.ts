import { RootState } from "@/entities/store";
import { Store } from "vuex";
import { BaseApiClient, iParams } from "./BaseApiClient";

export class ApiClient extends BaseApiClient {
  private jsonHeader = { "Content-Type": "application/json; charset=utf-8" }
  constructor(private readonly store: Store<RootState>) {
    super()
  }
  authorize(payload: { login: string, password: string }, mutation: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const params: iParams = {
        url: "/authorization/login",
        method: "POST",
        body: JSON.stringify(payload),
        headers: this.jsonHeader
      }
      this.request<{ shortName: string, id: number }[]>(params)
        .then((response) => {
          try {
            const user = JSON.parse(decodeURIComponent(document.cookie.split("=")[1]))
            this.store.commit(mutation, user)
            const existSelect = response.length ? true : false
            if (existSelect) localStorage.setItem("selectOrg", JSON.stringify({ select: response, name: `${user.lastName} ${user.firstName}` }))
            return resolve(existSelect)
          } catch (error) { }
        })
        .catch((error) => reject(error))
    })
  }
  select(payload: { id: number }, mutation: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const params: iParams = {
        url: "/authorization/select",
        method: "POST",
        body: JSON.stringify(payload),
        headers: this.jsonHeader
      }
      this.request(params)
        .then(() => {
          try {
            const user = JSON.parse(decodeURIComponent(document.cookie.split("=")[1]))
            this.store.commit(mutation, user)
            resolve()
          } catch (error) { }
        })
        .catch((error) => reject(error))
    })
  }
  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      const params: iParams = {
        url: "/authorization/logout",
        method: "GET",
      }
      this.request(params)
        .then(() => resolve())
        .catch((error) => reject(error))
    })
  }
  get(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const params: iParams = {
        url,
        method: "GET",
      }
      this.request(params)
        .then(() => { })
        .catch((error) => reject(error))
    })
  }
  post(url: string, payload: Record<any, any> | any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const params: iParams = {
        url,
        method: "POST",
        body: JSON.stringify(payload),
      }
      this.request(params)
        .then(() => { })
        .catch((error) => reject(error))
    })
  }
  update(url: string, payload: Record<any, any> | any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      const params: iParams = {
        url,
        method: "UPDATE",
        body: JSON.stringify(payload),
        headers: this.jsonHeader
      }
      this.request(params)
        .then(() => { })
        .catch((error) => reject(error))
    })
  }
  delete(url: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const params: iParams = {
        url,
        method: "DELETE",
      }
      this.request(params)
        .then(() => { })
        .catch((error) => reject(error))
    })
  }
}