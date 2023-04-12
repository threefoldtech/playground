<template>
  <v-tabs v-model="$props.modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <v-tab v-for="tab in tabs" :key="tab.value">
      {{ tab.title }}
    </v-tab>
  </v-tabs>

  <v-tab-item v-for="(tab, index) in tabs" :key="tab.value" v-show="index === $props.modelValue">
    <slot
      :name="tab.value"
      :index="index"
      :tab="tab"
      :activeTab="$props.modelValue"
      :tabs="tabs"
    ></slot>
  </v-tab-item>
</template>

<script lang="ts" setup>
export interface Tab {
  title: string
  value: string
}

defineProps<{ modelValue?: number; tabs: Tab[] }>()
defineEmits<{ (event: 'update:modelValue', value?: number): void }>()
</script>

<script lang="ts">
export default {
  name: 'DTabs'
}
</script>
