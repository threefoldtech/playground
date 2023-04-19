<template>
  <v-autocomplete
    label="VM Image"
    :items="[...$props.images, { name: 'Other' }]"
    return-object
    item-title="name"
    v-model="image"
  />

  <template v-if="image.name === 'Other'">
    <input-validator
      :rules="[
        validators.required('Flist is required.'),
        validators.isURL('Flist must be a valid URL.', {
          protocols: ['https']
        })
      ]"
      :async-rules="image.name === 'Other' ? [isFlistExist] : []"
      :value="$props.flist"
    >
      <template #default="{ props }">
        <v-text-field
          label="Flist"
          :model-value="$props.flist"
          @update:model-value="$emit('update:flist', $event)"
          v-bind="{ ...props, ...$props.form }"
        />
      </template>
    </input-validator>

    <input-validator
      :rules="[validators.required('Entry point is required.')]"
      :value="$props.entryPoint"
    >
      <template #default="{ props }">
        <v-text-field
          label="Entry Point"
          :model-value="$props.entryPoint"
          @update:model-value="$emit('update:entryPoint', $event)"
          v-bind="{ ...props, ...$props.form }"
        />
      </template>
    </input-validator>
  </template>
</template>

<script lang="ts" setup>
import { type PropType, ref, watch } from 'vue'
import * as validators from '../utils/validators'

export interface VmImage {
  name: string
  flist: string
  entryPoint: string
}
const props = defineProps({
  flist: String,
  entryPoint: String,
  images: {
    type: Array as PropType<VmImage[]>,
    required: true
  },
  form: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits<{
  (event: 'update:flist', value?: string): void
  (event: 'update:entryPoint', value?: string): void
}>()

const image = ref<VmImage>(props.images[0])
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

function isFlistExist(flist: string) {
  return fetch(flist + '.md5')
    .then((res) => res.text())
    .then(() => true)
    .catch(() => `Couldn't find flist with the provided url.`)
}
</script>

<script lang="ts">
export default {
  name: 'SelectVmImage'
}
</script>
