<template>
  <v-tabs v-model="activeTab" v-if="tabs.length > 0">
    <v-tab v-for="(tab, index) in tabs" :key="index">
      {{ tab.label }}
    </v-tab>
    <v-tab-item v-for="(tab, index) in tabs" :key="index" v-show="index === activeTab">
      <v-card>
        <component :is="tab.component"></component>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
defineProps<{ tabs: any[] }>()
const activeTab = ref(0)
</script>
<script lang="ts">
export default {
  name: 'DynamicTabs'
}
</script>
