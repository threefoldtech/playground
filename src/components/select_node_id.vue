<template>
  <section>
    <h6 class="text-h5 mb-4">Nodes Filter</h6>

    <v-autocomplete
      :disabled="disabled"
      label="Farm Name"
      :items="farms"
      clearable
      :loading="farmLoading"
      item-title="name"
      return-object
      v-model="farm"
    />

    <v-autocomplete
      :disabled="disabled"
      label="Country"
      :items="countries"
      clearable
      v-model="country"
      :loading="countriesLoading"
    />

    <v-btn class="mb-5" color="primary" size="small" @click="suggest" :disabled="disabled">
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
      :multiple="$props.multiple"
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
import { gridProxyClient } from '../clients'
import { getGrid } from '../utils/grid'
import type { NodeInfo } from 'grid3_client'
import { NodeStatus } from 'tf_gridproxy_client'
import { getFarms } from '../utils/get_farms'

export interface Deps {
  publicIp: boolean
  cpu?: number
  memory?: number
  ssd?: number
  disk?: number
}

const profileManager = useProfileManager()

const node = ref<NodeInfo | NodeInfo[]>()
const props = defineProps<{ modelValue?: number | number[]; deps: Deps; multiple?: boolean }>()
const $emit = defineEmits<{ (event: 'update:modelValue', value?: number | number[]): void }>()
watch(node, (node) => {
  let value: number[] | number | undefined
  if (props.multiple && node) {
    value = (node as NodeInfo[]).map((n) => n.nodeId)
  } else if (node) {
    value = (node as NodeInfo).nodeId
  }
  $emit('update:modelValue', value)
})

const farm = ref<{ name: string; farmID: number }>()
const farms = ref<{ name: string; farmID: number }[]>([])
const farmLoading = ref(false)
watch(
  () => props.deps.publicIp,
  async (publicIp) => {
    farmLoading.value = true
    const oldFarmId = farm.value
    farm.value = undefined
    farms.value = await getFarms(publicIp)
    if (oldFarmId && farms.value.map((f) => f.farmID).includes(oldFarmId.farmID)) {
      farm.value = oldFarmId
    }
    farmLoading.value = false
  },
  { immediate: true }
)

const country = ref<string>()
const countries = ref<string[]>([])
const countriesLoading = ref(false)
onMounted(async () => {
  countriesLoading.value = true
  const stats = await gridProxyClient.stats.get({ status: NodeStatus.Up })
  countries.value = Object.keys(stats.nodesDistribution || {})
  countriesLoading.value = false
})

const nodes = ref<NodeInfo[]>([])
const loading = ref(false)
async function suggest() {
  loading.value = true
  const currentNodes = !node.value
    ? []
    : props.multiple
    ? (node.value as NodeInfo[]).map((n) => n.nodeId)
    : [(node.value as NodeInfo).nodeId]

  node.value = undefined
  const grid = await getGrid(profileManager.profile!)
  if (grid) {
    grid.capacity
      .filterNodes({
        country: country.value,
        farmId: farm.value?.farmID,
        farmName: farm.value?.name,
        cru: props.deps.cpu,
        mru: props.deps.memory ? Math.round(props.deps.memory / 1024) : undefined,
        hru: props.deps.disk,
        sru: props.deps.ssd,
        publicIPs: props.deps.publicIp
      })
      .then((fetchedNodes) => {
        nodes.value = fetchedNodes
        if (fetchedNodes.length === 0) return
        if (!props.multiple) {
          let index = fetchedNodes.findIndex((n) => n.nodeId === currentNodes[0])
          index = index > -1 ? index : 0
          node.value = fetchedNodes[index]
        } else {
          let nodeSet = fetchedNodes.filter((n) => currentNodes.includes(n.nodeId))
          if (nodeSet.length === 0) {
            nodeSet.push(fetchedNodes[0])
          }
          node.value = nodeSet
        }
      })
      .catch(() => null)
      .finally(() => (loading.value = false))
  } else {
    loading.value = false
  }
}

const disabled = computed(() => {
  return loading.value || farmLoading.value || countriesLoading.value
})
</script>

<script lang="ts">
export default {
  name: 'SelectNodeId'
}
</script>
