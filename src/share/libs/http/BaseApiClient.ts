import { RootState } from "@/entities/store";
import { Store } from "vuex";

type iMethods = "GET" | "POST" | "PATCH" | "DELETE";

export interface iParams extends RequestInit {
  method: iMethods;
  url: string;
}

interface iResponse<T> {
  error: boolean;
  status: number;
  result: T;
}

interface RequestOptions {
  notifyOnError?: boolean;
}

export class BaseApiClient {
  private headers = {
    "Content-Security-Policy": "default-src 'none';",
    "X-Content-Type-Options": "nosniff",
  };
  store: Store<RootState>
  constructor(store: Store<RootState>) {
    this.store = store;
  }

  private getDefaultErrorMessage(status?: number) {
    switch (status) {
      case 401:
        return "Ошибка авторизации. Проверьте учетные данные.";
      case 403:
        return "Недостаточно прав для выполнения операции.";
      case 404:
        return "Запрашиваемая сущность не найдена.";
      default:
        return "Не удалось выполнить запрос.";
    }
  }

  private pushApiError(message: string, status?: number) {
    this.store.dispatch("feedback/push", {
      type: "error",
      message,
      source: "api",
      status,
    });
  }

  request<T = never>(params: iParams, options?: RequestOptions): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      params.headers = {
        ...this.headers,
        ...params.headers,
      };
      params.credentials = "include";

      fetch(`${process.env.VUE_APP_BASE_URL}/v1/gateway${params.url}`, params)
        .then((response) => response.json())
        .then((response: iResponse<T>) => {
          if (response.error) {
            const message = typeof response.result === "string" ? response.result : this.getDefaultErrorMessage(response.status);
            if (options?.notifyOnError !== false) {
              this.pushApiError(message, response.status);
            }
            return reject(response.result);
          }

          return resolve(response.result);
        })
        .catch((error) => {
          const message = error instanceof Error ? error.message : "Не удалось выполнить запрос к серверу.";
          if (options?.notifyOnError !== false) {
            this.pushApiError(message);
          }
          reject(error);
        });
    });
  }
}
