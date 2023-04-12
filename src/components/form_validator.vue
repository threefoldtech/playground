<template>
  <slot
    :form="{
      onRegisterInput,
      onUnregisterInput
    }"
  ></slot>
</template>

<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'

const components: ComponentInternalInstance[] = []

function onRegisterInput(instance: ComponentInternalInstance | null) {
  //   console.log(instance!.setupState)

  if (!instance) return
  components.push(instance)
}

function onUnregisterInput(instance: ComponentInternalInstance | null) {
  const index = instance ? components.findIndex((input) => input === instance) : -1
  if (index > -1) {
    components.splice(index, 1)
  }
}

/* import {
  onMounted,
  onUnmounted,
  getCurrentInstance,
  type ComponentInternalInstance,
  ref
} from 'vue'

const emits = defineEmits<{
  (event: 'registerInput', value: ComponentInternalInstance | null): void
  (event: 'unregisterInput', value: ComponentInternalInstance | null): void
}>()

function reset() {
  console.log('reset')
}

const props = ref('asd')

function setProps(c: string) {
  props.value = c
}

onMounted(() => emits('registerInput', getCurrentInstance()))
onUnmounted(() => emits('unregisterInput', getCurrentInstance())) */
</script>

<script lang="ts">
// import InputValidator from './input_validator.vue'

// console.log(InputValidator.name)

export default {
  name: 'FormValidator'
}
</script>
