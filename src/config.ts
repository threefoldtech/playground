import type { App, Component } from 'vue'

import PasswordInputWrapper from './components/password_input_wrapper.vue'
import WebletLayout from './components/weblet_layout.vue'

const GLOBAL_COMPONENTS: { [key: string]: Component } = {
  PasswordInputWrapper,
  WebletLayout
}

export function defineGlobalComponents(app: App<Element>) {
  for (const key in GLOBAL_COMPONENTS) {
    app.component(key, GLOBAL_COMPONENTS[key])
  }
}
