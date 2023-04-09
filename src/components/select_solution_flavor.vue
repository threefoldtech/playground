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

  {{ $props }}
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import { ref, watch, computed } from 'vue'

type Package = PropType<{ cpu: number; memory: number; disk: number }>

const props = defineProps({
  cpu: { required: true, type: Number },
  memory: { required: true, type: Number },
  disk: { required: true, type: Number },
  minimum: { type: Object as Package, default: () => ({ cpu: 1, memory: 1024, disk: 100 }) },
  standard: { type: Object as Package, default: () => ({ cpu: 2, memory: 1024 * 2, disk: 250 }) },
  recommended: { type: Object as Package, default: () => ({ cpu: 4, memory: 1024 * 4, disk: 500 }) }
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
      value: minimum
    },
    {
      title: `Standard(CPU: ${standard.cpu} vCores, Memory: ${standard.memory} MB, Disk: ${standard.disk} GB)`,
      value: standard
    },
    {
      title: `Recommended(CPU: ${recommended.cpu} vCores, Memory: ${recommended.memory} MB, Disk: ${recommended.disk} GB)`,
      value: recommended
    },
    { title: 'Custom', value: 'custom' }
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
  name: 'SelectSolutionFlavor'
}
</script>
