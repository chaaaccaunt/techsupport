import "remixicon/fonts/remixicon.css"
import "@/share/css/modules/tailwind.css"

import { createApp } from 'vue'
import { router, store, key } from './entities'
import App from './App.vue'
import { uiElements } from './share/components'
import { ApiClient } from "./share/libs/http/ApiClient"
import { io } from "socket.io-client"

const app = createApp(App)

uiElements.forEach((comp) => {
  if (!comp.__file) return
  const name = comp.__file.split("/")[comp.__file.split("/").length - 1].split(".")[0]
  app.component(`c-${name.toLowerCase()}`, comp)
})

app.use(store, key)
app.use(router)
app.mount('#app')

export const socket = io("http://localhost", {
  withCredentials: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  path: "/v1/connections",
  autoConnect: false,
  transports: ["websocket"],
})

export const apiClient = new ApiClient(store)