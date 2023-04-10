<template>
  <slot :props="{ onInput, errorMessages }"></slot>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { watch } from 'vue'

// export type SyncRule = (value?: unknown) => string | undefined | null
const props = defineProps<{ rules: any[]; asyncRules?: [] }>()
//states
let inputValue = ref('')
let errorMessages = ref('')

//varaibles

//methods
const onInput = (event: any) => {
  inputValue.value = event.target.value
}

const validateSyncRules = (value: unknown) => {
  for (var i = 0; i < props.rules.length; ++i) {
    if (props.rules[i](value)) {
      return props.rules[i](value)
    }
  }
  return ''
}
//hooks
watch(inputValue, (inputValue) => {
  errorMessages.value = validateSyncRules(inputValue)
})
</script>

<script lang="ts">
export default {
  name: 'InputValidator'
}
</script>
