<template>
  <slot :props="{ onInput, errorMessages, onBlur }"></slot>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { watch } from 'vue'

export type Rule = (value?: any) => string
export type asyncRule = (value: string) => Promise<string>

const props = defineProps<{ rules: Rule[]; asyncRules: asyncRule[] }>()
//states
let inputValue = ref('')
let errorMessages = ref<any>('')

//varaibles
let focused = false
//methods
const onInput = (event: any) => {
  inputValue.value = event.target.value
}

const onBlur = (event: any) => {
  if (focused) return
  validate(event.target.value)
  focused = true
}

const validate = async (writtenValue: any) => {
  errorMessages.value = await validateRules(writtenValue, props.rules)
  if (errorMessages.value.length == 0) {
    errorMessages.value = await validateRules(writtenValue, props.asyncRules)
  }
}
const validateRules = async (value: any, rules?: Rule[] | asyncRule[]) => {
  if (!rules) return ''
  for (var i = 0; i < rules.length; ++i) {
    const ruleRes = await rules[i](value)

    if (ruleRes) {
      return ruleRes
    }
  }
  return ''
}

//hooks
watch(inputValue, (inputValue) => {
  if (focused) {
    validate(inputValue)
  }
})
</script>

<script lang="ts">
export default {
  name: 'InputValidator'
}
</script>
