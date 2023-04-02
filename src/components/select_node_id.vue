<template>
  <section>
    <h6 class="text-h5 mb-4">Nodes Filter</h6>

    <v-autocomplete
      :disabled="loading"
      label="Farm Name"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      clearable
    ></v-autocomplete>

    <v-autocomplete
      :disabled="loading"
      label="Country"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      clearable
    ></v-autocomplete>

    <v-btn class="mb-5" color="primary" size="small" @click="suggest">
      Apply Filters And Suggest Nodes
    </v-btn>

    <v-autocomplete
      label="Node ID"
      :items="nodes"
      :loading="loading"
      :disabled="loading"
      return-object
      item-title="nodeId"
      item-value="nodeId"
      v-model="node"
      multiple
    >
      <template #item="{ props, item }">
        <v-list-item v-bind="props" :title="'NodeID(' + item.title + ')'" />
      </template>
    </v-autocomplete>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import { useProfileManager } from '../stores/profile_manager'
import { getGrid } from '../utils/grid'
import type { NodeInfo } from 'grid3_client'

defineProps<{ modelValue?: number }>()
const $emit = defineEmits<{
  (event: 'update:modelValue', value?: number): void
}>()

const node = ref<NodeInfo>()
watch(node, (node) => {
  const id = node ? +node.nodeId : undefined
  $emit('update:modelValue', id)
})

const nodes = ref<NodeInfo[]>([])
const loading = ref(false)
const profileManager = useProfileManager()

onMounted(suggest)
async function suggest() {
  loading.value = true
  const currentNode = node.value?.nodeId
  node.value = undefined
  const grid = await getGrid(profileManager.profile!)
  if (grid) {
    grid.capacity.filterNodes({}).then((_nodes) => {
      nodes.value = _nodes
      if (_nodes.length === 0) return
      let index = _nodes.findIndex((n) => n.nodeId === currentNode)
      index = index > -1 ? index : 0
      node.value = _nodes[index]
    })
  }
  loading.value = false
}
</script>

<script lang="ts">
export default {
  name: 'SelectNodeId'
}
</script>
