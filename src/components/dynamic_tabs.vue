<template>
  <v-tabs v-model="activeTab" align-tabs="center" color="primary" class="mb-6">
    <v-tab v-for="tab in tabs" :key="tab.value">
      {{ tab.title }}
    </v-tab>
  </v-tabs>

  <v-tab-item v-for="(tab, index) in tabs" :key="tab.value" v-show="index === activeTab">
    <slot :name="tab.value" :index="index" :tab="tab" :activeTab="activeTab" :tabs="tabs"></slot>
  </v-tab-item>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

export interface Tab {
  title: string
  value: string
}

defineProps<{ modelValue?: number; tabs: Tab[] }>()
const emits = defineEmits<{ (event: 'update:modelValue', value?: number): void }>()

const activeTab = ref<number>(0)
watch(activeTab, (t) => emits('update:modelValue', t))
</script>

<script lang="ts">
export default {
  name: 'DTabs'
}
</script>
