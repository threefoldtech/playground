<template>
  <v-tabs v-model="activeTab" align-tabs="center" color="primary" class="mb-6">
    <v-tab v-for="tab in tabs" :key="tab.value">
      {{ tab.title }}
      <v-chip color="error" v-if="forms[tabs.indexOf(tab)]?.invalid" class="ml-1">invalid</v-chip>
    </v-tab>
  </v-tabs>

  <v-tab-item v-for="(tab, index) in tabs" :key="tab.value" v-show="index === activeTab">
    <form-validator ref="forms">
      <slot :name="tab.value" :index="index" :tab="tab" :activeTab="activeTab" :tabs="tabs"></slot>
    </form-validator>
  </v-tab-item>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'

export interface Tab {
  title: string
  value: string
}

defineProps<{ modelValue?: number; tabs: Tab[] }>()
const emits = defineEmits<{ (event: 'update:modelValue', value?: number): void }>()

const forms = ref<any[]>([])

const activeTab = ref<number>(0)
watch(activeTab, (t) => emits('update:modelValue', t))

const valid = computed(() => forms.value.reduce((r, f) => r && f.valid, true))
const invalid = computed(() => !valid.value)

defineExpose({
  valid,
  invalid
})
</script>

<script lang="ts">
export default {
  name: 'DTabs'
}
</script>
