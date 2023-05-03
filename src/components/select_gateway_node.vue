<template>
  <v-autocomplete
    label="Choose your gateway node"
    :items="items"
    :loading="loading"
    item-title="publicConfig.domain"
    item-value="nodeId"
    v-model="selectedNode"
  >
</v-autocomplete>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { loadGateways } from '../utils/gateway'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import type { GridClient, NodeInfo } from '@threefold/grid_client'

//states
defineProps<{ modelValue?: number }>()
const $emit = defineEmits<{ (event: 'update:modelValue', value?: number): void }>()
const loading = ref(true)
const items = ref<NodeInfo[]>([])
const selectedNode = ref<number>()

// used variables and instances
const profileManager = useProfileManager()

//methods
const getGatwayNodes = async (grid: GridClient) => {
  loadGateways(grid, { })
    .then((res) => {
      loading.value = false
      items.value = [...res]
      console.log("items.value",items.value);
      
    })
    .catch((error: any) => {
      console.error('Error occurred while calling getGatwayNodes API:', error)
    })
}

onMounted(async () => {
  const grid = await getGrid(profileManager.profile!)
  getGatwayNodes(grid!)
})
watch(selectedNode, (selectedNode) => {
  $emit('update:modelValue', selectedNode ? +selectedNode : selectedNode)
})
</script>
<script lang="ts">
export default {
  name: 'SelectGatewayNode',
}
</script>
