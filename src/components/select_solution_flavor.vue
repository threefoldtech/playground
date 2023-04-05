<template>
  <v-select label="Select" :items="packages" v-model="solution" />

  <div v-if="solution === 'custom'">
    <v-text-field
      label="CPU (vCores)"
      :modelValue="$props.cpu"
      @input="$emit('update:cpu', $event.target.value)"
    />

    <v-text-field
      label="Memory (MB)"
      :modelValue="$props.memory"
      @input="$emit('update:memory', $event.target.value)"
    />

    <v-text-field
      label="Disk (GB)"
      :modelValue="$props.disk"
      @input="$emit('update:disk', $event.target.value)"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

defineProps<{ cpu?: number; memory?: number; disk?: number }>()
const $emit = defineEmits<{
  (event: 'update:cpu', value?: number): void
  (event: 'update:memory', value?: number): void
  (event: 'update:disk', value?: number): void
}>()

const packages = [
  {
    title: 'Minimum(CPU: 1 vCores, Memory: 1024 MB, Disk: 100 GB)',
    value: { cpu: 1, memory: 1024, disk: 100 }
  },
  {
    title: 'Standard(CPU: 2 vCores, Memory: 2048 MB, Disk: 250 GB)',
    value: { cpu: 2, memory: 1024 * 2, disk: 250 }
  },
  {
    title: 'Recommended(CPU: 4 vCores, Memory: 4096 MB, Disk: 500 GB)',
    value: { cpu: 4, memory: 1024 * 4, disk: 500 }
  },
  { title: 'Custom', value: 'custom' }
]

const solution = ref(packages[0].value)

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
  name: 'SelectSolutionFlavor'
}
</script>
