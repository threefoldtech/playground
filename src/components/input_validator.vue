<template>
  <slot
    :props="{ onInput, errorMessages, onBlur: focused ? undefined : onBlur, resetInput }"
  ></slot>
  {{ $props.inputStatus }}
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

export type Rule = (value?: any) => string | null | undefined
export type asyncRule = (
  value: string
) => Promise<string | null | undefined> | string | null | undefined

const props = defineProps<{
  rules: Rule[]
  asyncRules: asyncRule[]
  modelValue?: string
  inputStatus?: string
}>()
const $emit = defineEmits<{
  (event: 'update:modelValue', value?: string): void
  (event: 'update:inputStatus', value?: string): void
}>()

//states

let errorMessages = ref<string>('')

//varaibles
let focused = false
//methods
const onInput = (event: any) => {
  if (focused) {
    validate(event.target.value)
  }
}

const onBlur = (event: any) => {
  validate(event.target.value)
  focused = true
}

const validate = async (writtenValue: any) => {
  errorMessages.value = await validateRules(writtenValue, props.rules)
  if (errorMessages.value.length == 0) {
    errorMessages.value = await validateRules(writtenValue, props.asyncRules)
  }
}
const validateRules = async (value: any, theRules: Rule[] | asyncRule[]) => {
  if (!theRules) return ''
  for (var i = 0; i < theRules.length; ++i) {
    const ruleRes = await theRules[i](value)

    if (ruleRes) {
      return ruleRes
    }
  }
  return ''
}

const handleInputStatues = () => {
  console.log('statue')
  if (errorMessages.value.length == 0) {
    $emit('update:inputStatus', 'V')
  } else {
    $emit('update:inputStatus', 'IN')
  }
}

const resetInput = () => {
  $emit('update:modelValue', '')
}
watch(errorMessages, (errorMessages) => {
  handleInputStatues()
})
//hooks
</script>

<script lang="ts">
export default {
  name: 'InputValidator'
}
</script>
