<template>
  <v-autocomplete
    :disabled="loading"
    label="Country"
    :items="countries"
    clearable
    :loading="loading"
    v-model="country"
  />
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { gridProxyClient } from '../clients'
import { NodeStatus } from 'tf_gridproxy_client'

defineProps<{ modelValue?: string }>()
const emits = defineEmits<{ (events: 'update:modelValue', value?: string): void }>()

const country = ref<string>()
watch(country, (c) => emits('update:modelValue', c))

const loading = ref(false)
const countries = ref<string[]>()
async function getCountries() {
  try {
    loading.value = true
    const stats = await gridProxyClient.stats.get({ status: NodeStatus.Up })
    countries.value = Object.keys(stats.nodesDistribution)
    loading.value = false
  } catch {
    setTimeout(getCountries, 1000) /* retry again after 1 sec */
  }
}
onMounted(getCountries)
</script>

<script lang="ts">
export default {
  name: 'SelectCountry'
}
</script>
