<template>
  <section>
    <h6 class="text-h5 mb-4">Nodes Filter</h6>

    <v-autocomplete
      :disabled="disabled"
      label="Farm Name"
      :items="['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming']"
      clearable
      :loading="farmLoading"
    ></v-autocomplete>
    {{ farms.length }}

    <v-autocomplete
      :disabled="disabled"
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
      :disabled="disabled"
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
import { ref, watch, onMounted, computed } from 'vue'
import { useProfileManager } from '../stores/profile_manager'
import { gqlClient, gridProxyClient } from '../clients'
import { getGrid } from '../utils/grid'
import type { NodeInfo } from 'grid3_client'
import type { Farm } from 'tf_gridproxy_client'
import { getFarms } from '../utils/get_farms'

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

const farms = ref<Farm[]>([])
const farmLoading = ref(false)
onMounted(loadFarms)
async function loadFarms() {
  farmLoading.value = true

  const farms = await getFarms(false)
  console.log(farms)

  // const { totalCount } = await gqlClient.farmsConnection(
  //   { totalCount: true },
  //   { orderBy: ['farmID_ASC'] }
  // )
  // console.log(totalCount)

  // const farms = await gqlClient.farms(
  //   { farmID: true },
  //   { orderBy: ['farmID_ASC'], limit: totalCount }
  // )
  // console.log({ farms })

  // const { count } = await gridProxyClient.farms.list({ retCount: true })
  // const data = await Promise.all(
  //   Array.from({ length: Math.ceil(count! / 100) }).map((_, i) => {
  //     return gridProxyClient.farms.list({ page: i + 1 })
  //   })
  // )
  // console.log('gridproxy', data.map((x) => x.data).flat(1))

  farmLoading.value = false
}

const disabled = computed(() => {
  return loading.value || farmLoading.value
})
</script>

<script lang="ts">
export default {
  name: 'SelectNodeId'
}
</script>
