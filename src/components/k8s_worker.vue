<template>
  <input-validator
    :value="$props.modelValue.name"
    :rules="[
      validators.required('Name is required.'),
      validators.minLength('Name minimum length is 2 chars.', 2),
      validators.maxLength('Name max length is 15 chars.', 15),
    ]"
  >
    <template #default="{ props }">
      <v-text-field label="Name" v-model="$props.modelValue.name" v-bind="props" />
    </template>
  </input-validator>

  <input-validator
    :value="$props.modelValue.cpu"
    :rules="[
      validators.required('CPU is required.'),
      validators.isInt('CPU must be a valid integer.'),
      validators.min('CPU min is 2 cores.', 2),
      validators.max('CPU max is 32 cores.', 32),
    ]"
  >
    <template #default="{ props }">
      <v-text-field
        label="CPU (vCores)"
        type="number"
        v-model.number="$props.modelValue.cpu"
        v-bind="props"
      />
    </template>
  </input-validator>

  <input-validator
    :value="$props.modelValue.memory"
    :rules="[
      validators.required('Memory is required.'),
      validators.isInt('Memory must be a valid integer.'),
      validators.min('Minimum allowed memory is 256 MB.', 256),
      validators.max('Maximum allowed memory is 256 GB.', 256 * 1024),
    ]"
  >
    <template #default="{ props }">
      <v-text-field
        label="Memory (MB)"
        type="number"
        v-model.number="$props.modelValue.memory"
        v-bind="props"
      />
    </template>
  </input-validator>

  <input-validator
    :value="$props.modelValue.diskSize"
    :rules="[
      validators.required('Disk size is required.'),
      validators.isInt('Disk size must be a valid integer.'),
      validators.min('Minimum allowed disk size is 1 GB.', 1),
      validators.max('Maximum allowed disk size is 10000 GB.', 10000),
    ]"
  >
    <template #default="{ props }">
      <v-text-field
        label="Disk Size (GB)"
        type="number"
        v-model.number="$props.modelValue.diskSize"
        v-bind="props"
      />
    </template>
  </input-validator>

  <v-switch label="Public IPv4" inset color="primary" v-model="$props.modelValue.ipv4" />
  <v-switch label="Public IPv6" inset color="primary" v-model="$props.modelValue.ipv6" />
  <v-switch label="Planetary Network" inset color="primary" v-model="$props.modelValue.planetary" />

  <RootFsSize
    :cpu="$props.modelValue.cpu"
    :memory="$props.modelValue.memory"
    v-model.number="$props.modelValue.rootFsSize"
  />

  <SelectFarm
    :filters="{
      cpu: $props.modelValue.cpu,
      memory: $props.modelValue.memory,
      publicIp: $props.modelValue.ipv4,
      ssd: $props.modelValue.diskSize + $props.modelValue.rootFsSize,
    }"
    v-model="$props.modelValue.farm"
  />
</template>

<script lang="ts" setup>
defineProps<{ modelValue: K8SWorker }>()
</script>

<script lang="ts">
import SelectFarm from './select_farm.vue'
import { generateString } from '@threefold/grid_client'
import RootFsSize from './root_fs_size.vue'
import type { K8SWorker, Farm } from '../types'

export function createWorker(name: string = 'WR' + generateString(9)): K8SWorker {
  return {
    name,
    cpu: 2,
    memory: 4096,
    diskSize: 100,
    ipv4: false,
    ipv6: false,
    planetary: true,
    rootFsSize: 2,
    farm: undefined as Farm | undefined,
  }
}

export default {
  name: 'K8SWorker',
  components: {
    SelectFarm,
    RootFsSize,
  },
}
</script>
