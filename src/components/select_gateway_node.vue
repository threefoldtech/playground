<template>
  <v-toolbar-title>Select Gateway Node</v-toolbar-title>
  <v-autocomplete
    label="Choose your node"
    :items="items"
    :loading="loading"
    item-title="publicConfig.domain"
    item-value="nodeId"
    v-model="selectedNode"
  >
    <template v-slot:append-item v-if="!noMoreResults">
      <div v-intersect="handleLoadMoreGateWayNodes" class="pa-4 teal--text">
        Loading more items ...
      </div>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { loadGateWayNodes } from '../utils/gateway'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import type { GridClient, NodeInfo } from '@threefold/grid_client'

//states
defineProps<{ modelValue?: number }>()
const $emit = defineEmits<{ (event: 'update:modelValue', value?: number): void }>()
const loading = ref(true)
const items = ref<NodeInfo[]>([])
const selectedNode = ref<number>()
const noMoreResults = ref(false)

// used variables and instances
const profileManager = useProfileManager()
let loadMoreNodes = 1

//methods
const handleGetGetWayNodes = async (grid: GridClient) => {
  loadGateWayNodes(grid, loadMoreNodes)
    .then((res) => {
      loading.value = false
      items.value = [...res]
    })
    .catch((error: any) => {
      noMoreResults.value = true
      console.error('Error occurred while calling handleGetGetWayNodes API:', error)
    })
}

const handleLoadMoreGateWayNodes = async () => {
  if (noMoreResults.value) return
  loadMoreNodes = loadMoreNodes + 1
  const grid = await getGrid(profileManager)
  handleGetGetWayNodes(grid!)
    .then((res: any) => {
      if (res) {
        items.value = res.concat(items.value)
      } else {
        noMoreResults.value = true
      }
    })
    .catch((error: any) => {
      noMoreResults.value = true
      console.error('Error occurred while calling handleGetGetWayNodes API:', error)
    })
}
//hooks
onMounted(async () => {
  const grid = await getGrid(profileManager)
  handleGetGetWayNodes(grid!)
})
watch(selectedNode, (selectedNode) => {
  $emit('update:modelValue', selectedNode ? +selectedNode : selectedNode)
})
</script>
<script lang="ts">
export default {
  name: 'SelectGateWayNode'
}
</script>
