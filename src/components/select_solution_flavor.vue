<template>
  <v-select label="Select" :items="packages" v-model="solution" />

  <div v-if="solution === 'custom'">
    <input-validator
      v-bind="form"
      :value="$props.cpu"
      :rules="[
        validators.required('CPU is required.'),
        validators.isInt('CPU must be a valid integer.'),
        validators.min('CPU min is 1 cores.', 1),
        validators.max('CPU max is 32 cores.', 32),
      ]"
    >
      <template #default="{ props }">
        <v-text-field
          type="number"
          label="CPU (vCores)"
          :modelValue="$props.cpu"
          @input="$emit('update:cpu', $event.target.value)"
          v-bind="props"
        />
      </template>
    </input-validator>

    <input-validator
      v-bind="form"
      :value="$props.memory"
      :rules="[
        validators.required('Memory is required.'),
        validators.isInt('Memory must be a valid integer.'),
        validators.min('Minimum allowed memory is 256 MB.', 256),
        validators.max('Maximum allowed memory is 256 GB.', 256 * 1024),
      ]"
    >
      <template #default="{ props }">
        <v-text-field
          type="number"
          label="Memory (MB)"
          :modelValue="$props.memory"
          @input="$emit('update:memory', $event.target.value)"
          v-bind="props"
        />
      </template>
    </input-validator>

    <input-validator
      :value="$props.disk"
      v-bind="form"
      :rules="[
        validators.required('Disk size is required.'),
        validators.isInt('Disk size must be a valid integer.'),
        validators.min('Minimum allowed disk size is 1 GB.', 1),
        validators.max('Maximum allowed disk size is 10000 GB.', 10000),
      ]"
    >
      <template #default="{ props }">
        <v-text-field
          type="number"
          label="Disk (GB)"
          :modelValue="$props.disk"
          @input="$emit('update:disk', $event.target.value)"
          v-bind="props"
        />
      </template>
    </input-validator>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, watch, computed } from 'vue'
import * as validators from '../utils/validators'

type Package = PropType<{ cpu: number; memory: number; disk: number }>

const props = defineProps({
  cpu: { required: true, type: Number },
  memory: { required: true, type: Number },
  disk: { required: true, type: Number },
  minimum: { type: Object as Package, default: () => ({ cpu: 1, memory: 1024, disk: 100 }) },
  standard: { type: Object as Package, default: () => ({ cpu: 2, memory: 1024 * 2, disk: 250 }) },
  recommended: {
    type: Object as Package,
    default: () => ({ cpu: 4, memory: 1024 * 4, disk: 500 }),
  },
  form: { type: Object, default: () => ({}) },
})

const $emit = defineEmits<{
  (event: 'update:cpu', value?: number): void
  (event: 'update:memory', value?: number): void
  (event: 'update:disk', value?: number): void
}>()

const packages = computed(() => {
  const { minimum, standard, recommended } = props
  return [
    {
      title: `Minimum(CPU: ${minimum.cpu} vCores, Memory: ${minimum.memory} MB, Disk: ${minimum.disk} GB)`,
      value: minimum,
    },
    {
      title: `Standard(CPU: ${standard.cpu} vCores, Memory: ${standard.memory} MB, Disk: ${standard.disk} GB)`,
      value: standard,
    },
    {
      title: `Recommended(CPU: ${recommended.cpu} vCores, Memory: ${recommended.memory} MB, Disk: ${recommended.disk} GB)`,
      value: recommended,
    },
    { title: 'Custom', value: 'custom' },
  ]
})

const solution = ref(packages.value[0].value)

watch(
  solution,
  (value) => {
    if (value === 'custom' || typeof value === 'string') return
    $emit('update:cpu', value.cpu)
    $emit('update:memory', value.memory)
    $emit('update:disk', value.disk)
  },
  { immediate: true }
)
</script>

<script lang="ts">
export default {
  name: 'SelectSolutionFlavor',
}
</script>
