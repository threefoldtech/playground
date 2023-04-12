<template>
  <div>
    <InputValidator
      v-model:status="status"
      v-model:valid="valid"
      :rules="[validators.required('Test is required.')]"
      :async-rules="[aR]"
    >
      <template #default="{ props }">
        <v-text-field label="Test validator" type="number" v-model.number="data" v-bind="props" />
        <!-- <v-textarea label="Test validator" v-model="data" v-bind="props" />
        <v-text-field type="number" label="Test validator" v-model="data" v-bind="props" />
        <v-checkbox type="number" label="Test validator" v-model="data" v-bind="props" />
        <v-switch type="number" label="Test validator" v-model="data" v-bind="props" />
        <v-select :items="[1, 2, 3]" /> -->
      </template>
    </InputValidator>

    <p>data {{ data }}</p>
    <p>type {{ type }}</p>
    <p>status {{ status }}</p>
    <p>valid {{ valid }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import * as validators from '../utils/validators'

const data = ref()
const type = computed(() => typeof data.value)
const status = ref()
const valid = ref()

function aR(value: string): Promise<undefined> {
  return new Promise((res) => {
    setTimeout(() => res(undefined), 1500)
  })
}
</script>

<script lang="ts">
import InputValidator from '../components/input_validator.vue'

export default {
  name: 'FullVirtualMachine',
  components: {
    InputValidator
  }
}
</script>
