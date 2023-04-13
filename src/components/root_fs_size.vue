<template>
  <div class="d-flex">
    <div :style="{ width: '100%' }" class="mr-4">
      <v-text-field
        label="Root File System (GB)"
        type="number"
        :disabled="!edit"
        v-model.number="$props.modelValue"
      />
    </div>

    <v-tooltip text="Toggle editing root filesystem size">
      <template v-slot:activator="{ props }">
        <v-switch inset color="primary" v-model="edit" v-bind="props" />
      </template>
    </v-tooltip>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{ modelValue: number }>()

const edit = ref(false)
</script>

<script lang="ts">
export default {
  name: 'RootFsSize'
}
</script>
