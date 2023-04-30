import PasswordInputWrapper from './components/password_input_wrapper.vue'
import WebletLayout from './components/weblet_layout.vue'
import CopyInputWrapper from './components/copy_input_wrapper.vue'
import DTabs from './components/dynamic_tabs.vue'
import InputValidator from './components/input_validator.vue'
import FormValidator from './components/form_validator.vue'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    PasswordInputWrapper: typeof PasswordInputWrapper
    WebletLayout: typeof WebletLayout
    CopyInputWrapper: typeof CopyInputWrapper
    DTabs: typeof DTabs
    InputValidator: typeof InputValidator
    FormValidator: typeof FormValidator
  }
}
