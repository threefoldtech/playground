<template>
  <v-toolbar-title>Select Gateway Node</v-toolbar-title>
  <v-autocomplete
    label="Gateway node "
    :items="items"
    :loading="loading"
    item-text="nodeDomain"
    item-value="nodeId"
    return-object
    v-model="selectedNode"
  >
    <template v-slot:append-item>
      <div v-intersect="handleLoadMoreGateWayNodes" class="pa-4 teal--text">
        Loading more items ...
      </div>
    </template>
  </v-autocomplete>
  {{ items }}
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import { loadGateWayNodes } from '../utils/gateway'
import type { GatewayNodes } from '../utils/gateway'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import type { GridClient } from 'grid3_client'

//states
const $emit = defineEmits<{ (event: 'update:modelValue', value?: GatewayNodes): void }>()
const loading = ref(true)
const items = ref<GatewayNodes[]>([])
const selectedNode = ref()
const loadMoreNodes = ref(1)

// used variables and instances
const profileManager = useProfileManager()
let gridInstance: GridClient | null
let noMoreResults = false

//methods
const handleGetGetWayNodes = async (grid: GridClient) => {
  loadGateWayNodes(grid, loadMoreNodes.value).then((res) => {
    loading.value = false
    items.value = [...res]
  })
}

const handleLoadMoreGateWayNodes = async () => {
  if (noMoreResults) return
  loadMoreNodes.value = loadMoreNodes.value + 1
  handleGetGetWayNodes(gridInstance!).then((res: any) => {
    if (res) {
      items.value = res.concat(items.value)
    } else {
      noMoreResults = true
    }
  })
}
//hooks
onMounted(async () => {
  const grid = await getGrid(profileManager)
  gridInstance = grid
  handleGetGetWayNodes(grid!)
})
watch(selectedNode, (selectedNode) => {
  $emit('update:modelValue', selectedNode)
})
</script>
<script lang="ts">
export default {
  name: 'SelectGateWayNode'
}
</script>
