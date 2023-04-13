<template>
  <slot
    :form="{
      onValid,
      onUnregister
    }"
  ></slot>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

defineProps<{ modelValue: boolean }>()
const emits = defineEmits<{ (events: 'update:modelValue', value: boolean): void }>()

const inputsValiadtion = ref<{ [uid: number]: boolean }>({})
const inputsReset = {} as { [uid: number]: () => void }

watch(
  inputsValiadtion,
  (inps) => {
    emits('update:modelValue', !Object.values(inps).some((v) => v === false))
  },
  { deep: true }
)

function onValid(uid: number, value: boolean, reset: () => void): void {
  inputsValiadtion.value[uid] = value
  inputsReset[uid] = reset
}

function onUnregister(uid: number): void {
  delete inputsValiadtion.value[uid]
  delete inputsReset[uid]
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
defineExpose({
  reset() {
    Object.values(inputsReset).forEach((fn) => fn())
  }
})
</script>

<script lang="ts">
export default {
  name: 'FormValidator'
}
</script>
