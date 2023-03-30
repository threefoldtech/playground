import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from '@/plugins/vuetify'
import { defineGlobalComponents } from './config'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
defineGlobalComponents(app)

app.mount('#app')
