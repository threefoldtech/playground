<template>
  <v-select label="Select" :items="packages" v-model="solution" />

  <div v-if="solution === 'custom'">
    <input-validator
      :value="cpu"
      :rules="[
        validators.required('CPU is required.'),
        validators.isInt('CPU must be a valid integer.'),
        validators.min('CPU min is 1 cores.', 1),
        validators.max('CPU max is 32 cores.', 32),
      ]"
    >
      <template #default="{ props }">
        <v-text-field type="number" label="CPU (vCores)" v-model.number="cpu" v-bind="props" />
      </template>
    </input-validator>

    <input-validator
      :value="memory"
      :rules="[
        validators.required('Memory is required.'),
        validators.isInt('Memory must be a valid integer.'),
        validators.min('Minimum allowed memory is 256 MB.', 256),
        validators.max('Maximum allowed memory is 256 GB.', 256 * 1024),
      ]"
    >
      <template #default="{ props }">
        <v-text-field type="number" label="Memory (MB)" v-model.number="memory" v-bind="props" />
      </template>
    </input-validator>

    <input-validator
      :value="disk"
      :rules="[
        validators.required('Disk size is required.'),
        validators.isInt('Disk size must be a valid integer.'),
        validators.min('Minimum allowed disk size is 1 GB.', 1),
        validators.max('Maximum allowed disk size is 10000 GB.', 10000),
      ]"
    >
      <template #default="{ props }">
        <v-text-field type="number" label="Disk (GB)" v-model.number="disk" v-bind="props" />
      </template>
    </input-validator>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, watch, computed } from 'vue'
import * as validators from '../utils/validators'
import type { solutionFlavor } from '../types'

type Package = PropType<solutionFlavor>

const props = defineProps({
  minimum: { type: Object as Package, default: () => ({ cpu: 1, memory: 1024, disk: 100 }) },
  standard: { type: Object as Package, default: () => ({ cpu: 2, memory: 1024 * 2, disk: 250 }) },
  recommended: {
    type: Object as Package,
    default: () => ({ cpu: 4, memory: 1024 * 4, disk: 500 }),
  },
  form: { type: Object, default: () => ({}) },
})
const emits = defineEmits<{ (event: 'update:model-value', value?: solutionFlavor): void }>()

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
const cpu = ref<number>()
const memory = ref<number>()
const disk = ref<number>()

watch(
  solution,
  (value) => {
    if (value === 'custom' || typeof value === 'string') return
    cpu.value = value.cpu
    memory.value = value.memory
    disk.value = value.disk
  },
  { immediate: true }
)

watch(
  [cpu, memory, disk],
  ([cpu, memory, disk]) => {
    const value = cpu && memory && disk ? { cpu, memory, disk } : undefined
    emits('update:model-value', value)
    console.log("update:model-value", value);
    
  },
  { immediate: true }
)
</script>

<script lang="ts">
export default {
  name: 'SelectSolutionFlavor',
}
</script>
