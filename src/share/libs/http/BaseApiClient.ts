type iMethods = 'GET' | 'POST' | 'UPDATE' | 'DELETE'

export interface iParams extends RequestInit {
  method: iMethods
  url: string
}

interface iResponse<T> {
  error: boolean
  result: T
}

export class BaseApiClient {
  private headers = {
    "Content-Security-Policy": "default-src 'none';",
    "X-Content-Type-Options": "nosniff",
  }
  constructor() { }
  request<T = never>(params: iParams): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      params.headers = {
        ...this.headers,
        ...params.headers
      }
      params.credentials = "include"
      fetch(`${process.env.VUE_APP_BASE_URL}/v1/gateway${params.url}`, params)
        .then((response) => response.json())
        .then((response) => {
          if (response.error) return reject(response.result)
          return resolve(response.result)
        })
        .catch((error) => reject(error))
    })
  }
}