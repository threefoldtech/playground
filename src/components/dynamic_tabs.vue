<template>
  <v-tabs v-model="activeTab" align-tabs="center" color="primary" class="mb-6">
    <v-tab v-for="tab in tabs" :key="tab.value" :disabled="disabled">
      {{ tab.title }} <v-chip color="error" v-if="tab.invalid" class="ml-1">invalid</v-chip>
    </v-tab>
  </v-tabs>

  <v-tab-item v-for="(tab, index) in tabs" :key="tab.value" v-show="index === activeTab">
    <template v-if="destroy ? index === activeTab : true">
      <slot
        :name="tab.value"
        :index="index"
        :tab="tab"
        :activeTab="activeTab"
        :tabs="tabs"
        v-if="$slots[tab.value]"
      ></slot>
      <slot
        :index="index"
        :tab="tab"
        :activeTab="activeTab"
        :tabs="tabs"
        v-else-if="$slots.default"
      ></slot>
      <template v-else> Please add content for this tab! </template>
    </template>
  </v-tab-item>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

export interface Tab {
  title: string
  value: string
  invalid?: boolean
}

defineProps<{ modelValue?: number; tabs: Tab[]; disabled?: boolean; destroy?: boolean }>()
const emits = defineEmits<{ (event: 'update:modelValue', value?: number): void }>()

const activeTab = ref<number>(0)
watch(activeTab, (t) => emits('update:modelValue', t), { immediate: true })
</script>

<script lang="ts">
export default {
  name: 'DTabs'
}
</script>
