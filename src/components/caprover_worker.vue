<template>
  <input-validator
    :rules="[
      validators.required('Name is required.'),
      validators.minLength('Name minimum length is 2 chars.', 2),
      validators.maxLength('Name max length is 15 chars.', 15),
    ]"
    :value="$props.modelValue.name"
    #="{ props }"
  >
    <v-text-field label="Name" v-model="$props.modelValue.name" v-bind="props" />
  </input-validator>

  <SelectSolutionFlavor v-model="$props.modelValue.solution" />

  <SelectFarm
    :filters="{
      cpu: $props.modelValue.solution?.cpu,
      memory: $props.modelValue.solution?.memory,
      publicIp: true,
      ssd:
        ($props.modelValue.solution?.disk ?? 0) +
        rootFs($props.modelValue.solution?.cpu ?? 0, $props.modelValue.solution?.memory ?? 0),
    }"
    v-model="$props.modelValue.farm"
  />
</template>

<script lang="ts" setup>
import rootFs from '../utils/root_fs'

defineProps<{ modelValue: CaproverWorker }>()
</script>

<script lang="ts">
import { generateString } from '@threefold/grid_client'
import type { CaproverWorker } from '../types'
import SelectSolutionFlavor from './select_solution_flavor.vue'
import SelectFarm from './select_farm.vue'

export function createWorker(name: string = 'WR' + generateString(9)): CaproverWorker {
  return { name }
}

export default {
  name: 'CaproverWorker',
  components: {
    SelectSolutionFlavor,
    SelectFarm,
  },
}
</script>
