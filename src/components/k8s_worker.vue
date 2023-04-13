<template>
  <v-text-field label="Name" v-model="$props.modelValue.name" />
  <v-text-field label="CPU (vCores)" type="number" v-model.number="$props.modelValue.cpu" />
  <v-text-field label="Memory (MB)" type="number" v-model.number="$props.modelValue.memory" />
  <v-text-field label="Disk Size (GB)" type="number" v-model.number="$props.modelValue.diskSize" />
  <v-switch label="Public IPv4" inset color="primary" v-model="$props.modelValue.ipv4" />
  <v-switch label="Public IPv6" inset color="primary" v-model="$props.modelValue.ipv6" />
  <v-switch label="Planetary Network" inset color="primary" v-model="$props.modelValue.planetary" />
  <RootFsSize v-model="$props.modelValue.rootFsSize" />
  <SelectFarm
    :filters="{
      cpu: $props.modelValue.cpu,
      memory: $props.modelValue.memory,
      publicIp: $props.modelValue.ipv4,
      ssd: $props.modelValue.diskSize + $props.modelValue.rootFsSize
    }"
    v-model="$props.modelValue.farm"
  />
</template>

<script lang="ts" setup>
defineProps<{ modelValue: K8SWorker }>()
</script>

<script lang="ts">
import SelectFarm from './select_farm.vue'
import { generateString } from 'grid3_client'
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
    farm: undefined as Farm | undefined
  }
}

export default {
  name: 'K8SWorker',
  components: {
    SelectFarm,
    RootFsSize
  }
}
</script>
