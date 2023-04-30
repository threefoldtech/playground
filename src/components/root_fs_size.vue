<template>
  <div class="d-flex">
    <div :style="{ width: '100%' }" class="mr-4">
      <input-validator
        :value="$props.modelValue"
        :rules="[
          validators.required('Root File System is required.'),
          validators.isInt('Root File System must be a valid integer.'),
          validators.max('Root File System max is 2GB.', 2)
        ]"
      >
        <template #default="{ props }">
          <v-text-field
            label="Root File System (GB)"
            type="number"
            :disabled="!edit"
            v-model.number="$props.modelValue"
            v-bind="props"
          />
        </template>
      </input-validator>
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
import * as validators from '../utils/validators'

defineProps<{ modelValue: number }>()

const edit = ref(false)
</script>

<script lang="ts">
export default {
  name: 'RootFsSize'
}
</script>
