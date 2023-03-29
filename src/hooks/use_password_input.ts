import { ref, reactive, computed } from 'vue'

export function usePasswordInput() {
  const show = ref(false)

  return reactive({
    props: {
      type: computed(() => (show.value ? 'text' : 'password')),
      'append-inner-icon': computed(() => (show.value ? 'mdi-eye-outline' : 'mdi-eye-off-outline'))
    },
    handlers: {
      'click:append-inner': () => (show.value = !show.value)
    }
  })
}
