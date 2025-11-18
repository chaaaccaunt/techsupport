import { createApp } from 'vue'
import { router, store } from './entities'
import App from './App.vue'
import { uiElements } from './share/components'

const app = createApp(App)

uiElements.forEach((comp) => {
  if (!comp.__file) return
  const name = comp.__file.split("/")[comp.__file.split("/").length - 1].split(".")[0]
  console.log(name)
  app.component(`c-${name.toLowerCase()}`, comp)
})

app.use(store)
app.use(router)
app.mount('#app')
