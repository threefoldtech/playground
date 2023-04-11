<template>
  <v-autocomplete
    label="VM Image"
    :items="images"
    return-object
    item-title="name"
    v-model="image"
  />

  <template v-if="image.name === 'Other'">
    <v-text-field
      label="Flist"
      :model-value="$props.flist"
      @update:model-value="$emit('update:flist', $event)"
    />

    <v-text-field
      label="Entry Point"
      :model-value="$props.entryPoint"
      @update:model-value="$emit('update:entryPoint', $event)"
    />
  </template>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

export interface VmImage {
  name: string
  flist: string
  entryPoint: string
}

defineProps<{ flist?: string; entryPoint?: string }>()
const emits = defineEmits<{
  (event: 'update:flist', value?: string): void
  (event: 'update:entryPoint', value?: string): void
}>()

const images: VmImage[] = [
  {
    name: 'Ubuntu-22.04',
    flist: 'https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-22.04.flist',
    entryPoint: '/sbin/zinit init'
  },
  {
    name: 'Alpine-3',
    flist: 'https://hub.grid.tf/tf-official-apps/threefoldtech-alpine-3.flist',
    entryPoint: '/entrypoint.sh'
  },
  {
    name: 'CentOS-8',
    flist: 'https://hub.grid.tf/tf-official-apps/threefoldtech-centos-8.flist',
    entryPoint: '/entrypoint.sh'
  },
  {
    name: 'Nixos',
    flist: 'https://hub.grid.tf/tf-official-vms/nixos-micro-latest.flist',
    entryPoint: '/entrypoint.sh'
  },
  {
    name: 'Other',
    flist: 'other',
    entryPoint: ''
  }
]

const image = ref<VmImage>(images[0])
watch(
  image,
  (vm) => {
    if (vm.name !== 'Other') {
      emits('update:flist', vm.flist)
      emits('update:entryPoint', vm.entryPoint)
    }
  },
  { immediate: true }
)
</script>

<script lang="ts">
export default {
  name: 'SelectVmImage'
}
</script>
