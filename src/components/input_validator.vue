<template>
  <slot
    :props="{
      onInput: touched ? onInput : undefined,
      onBlur: touched ? undefined : onBlur,
      errorMessages: errorMessage,
      error: !!errorMessage,
      loading: inputStatus === ValidatorStatus.PENDING,
      hint: inputStatus === ValidatorStatus.PENDING ? 'Validating ...' : undefined,
      'persistent-hint': inputStatus === ValidatorStatus.PENDING
    }"
  ></slot>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, getCurrentInstance, onUnmounted, type PropType } from 'vue'
import debounce from 'lodash/debounce.js'

export type RuleReturn = { message: string; [key: string]: any } | undefined | void
export type SyncRule = (value: string) => RuleReturn
export type AsyncRule = (value: string) => Promise<RuleReturn>

const uid = getCurrentInstance()!.uid

const props = defineProps({
  status: {
    type: String as PropType<ValidatorStatus>,
    required: false
  },
  rules: {
    type: Array as PropType<SyncRule[]>,
    required: true
  },
  asyncRules: {
    type: Array as PropType<AsyncRule[]>,
    required: false,
    default: [] as AsyncRule[]
  }
})
const emits = defineEmits<{
  (events: 'update:status', value: ValidatorStatus): void
  (events: 'update:valid', value: boolean): void
  (events: 'unregister', value: number): void
  (events: 'valid', uid: number, boolean: boolean, reset: () => void): void
}>()

const touched = ref(false)
const errorMessage = ref<string>()
const required = ref(false)
const inputStatus = ref<ValidatorStatus>()
watch(inputStatus, (s) => {
  emits('update:valid', s === ValidatorStatus.VALID)
  emits('valid', uid!, s === ValidatorStatus.VALID, reset)
  if (s) emits('update:status', s)
})

onMounted(() => {
  for (const rule of props.rules) {
    const error = rule('')
    if (error && error.required) {
      required.value = true
      break
    }
  }
  inputStatus.value = required.value ? ValidatorStatus.INVALID : ValidatorStatus.VALID
})
onUnmounted(() => emits('unregister', uid!))

function onBlur(event: Event) {
  touched.value = true
  validate(getValue(event))
}

const onInput = debounce((event: Event) => validate(getValue(event)), 250)

defineExpose({ reset })
function reset() {
  touched.value = false
  errorMessage.value = undefined
  inputStatus.value = undefined
}

async function validate(value: string) {
  errorMessage.value = undefined
  inputStatus.value = ValidatorStatus.PENDING
  for (const rule of [...props.rules, ...props.asyncRules]) {
    const error = await rule(value)
    if (error) {
      errorMessage.value = error.message
      break
    }
  }
  inputStatus.value = errorMessage.value ? ValidatorStatus.INVALID : ValidatorStatus.VALID
}

function getValue(e: Event): string {
  const input = e.target as HTMLInputElement
  return input.value
}
</script>

<script lang="ts">
export enum ValidatorStatus {
  VALID = 'VALID',
  INVALID = 'INVALID',
  PENDING = 'PENDING'
}

export default {
  name: 'InputValidator'
}
</script>
