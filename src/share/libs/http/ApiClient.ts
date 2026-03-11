import { RootState } from "@/entities/store";
import { Store } from "vuex";
import { parseUserCookie } from "@/share/libs/authCookie";
import { BaseApiClient, iParams } from "./BaseApiClient";

export class ApiClient extends BaseApiClient {
  private jsonHeader = { "Content-Type": "application/json; charset=utf-8" };
  store: Store<RootState>

  constructor(store: Store<RootState>) {
    super(store);
    this.store = store;
  }

  authorize(payload: { login: string; password: string }, mutation: string): Promise<boolean> {
    const params: iParams = {
      url: "/authorization/login",
      method: "POST",
      body: JSON.stringify(payload),
      headers: this.jsonHeader,
    };

    return this.request<{ shortName: string; id: number }[]>(params).then((response) => {
      const user = parseUserCookie();
      this.store.commit(mutation, user);

      const hasOrganizations = response.length > 0;
      if (hasOrganizations) {
        localStorage.setItem(
          "selectOrg",
          JSON.stringify({
            select: response,
            name: `${user.lastName ?? ""} ${user.firstName ?? ""}`.trim(),
          }),
        );
      }

      return hasOrganizations;
    });
  }

  select(payload: { id: number }, mutation: string): Promise<void> {
    const params: iParams = {
      url: "/authorization/select",
      method: "POST",
      body: JSON.stringify(payload),
      headers: this.jsonHeader,
    };

    return this.request(params).then(() => {
      const user = parseUserCookie();
      this.store.dispatch("auth/initFromCookie");
      this.store.commit(mutation, user);
    });
  }

  logout(): Promise<void> {
    localStorage.removeItem("selectOrg");
    const params: iParams = {
      url: "/authorization/logout",
      method: "GET",
    };

    return this.request<void>(params).then(() => {
      const user = parseUserCookie();
      this.store.commit("auth/SET_CURRENT_USER", user);
    });
  }

  private commitResult<T>(mutation: string, result: T): T {
    this.store.commit(mutation, result);
    return result;
  }

  get<T>(url: string, mutation: string): Promise<T> {
    const params: iParams = {
      url,
      method: "GET",
    };

    return this.request<T>(params).then((result) => this.commitResult(mutation, result));
  }

  post<T>(url: string, payload: Record<string, unknown> | unknown[], mutation: string): Promise<T> {
    const params: iParams = {
      url,
      method: "POST",
      body: JSON.stringify(payload),
      headers: this.jsonHeader,
    };

    return this.request<T>(params).then((result) => this.commitResult(mutation, result));
  }

  update<T>(url: string, payload: Record<string, unknown> | unknown[], mutation: string): Promise<T> {
    const params: iParams = {
      url,
      method: "PATCH",
      body: JSON.stringify(payload),
      headers: this.jsonHeader,
    };

    return this.request<T>(params).then((result) => this.commitResult(mutation, result));
  }

  delete<T>(url: string, mutation: string): Promise<T> {
    const params: iParams = {
      url,
      method: "DELETE",
    };

    return this.request<T>(params).then((result) => this.commitResult(mutation, result));
  }
}
