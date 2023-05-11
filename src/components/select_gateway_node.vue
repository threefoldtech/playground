<template>
  <input-validator
    :value="$props.modelValue?.id"
    :rules="[validators.required('Gateway node is required.')]"
  >
    <template #default="{ props }">
      <v-autocomplete
        label="Select gateway Node"
        placeholder="Please select a domain."
        :items="items"
        item-title="domain"
        return-object
        v-bind="props"
        @update:model-value="$emit('update:model-value', $event)"
        :loading="items.length === 0 && loading"
        :disabled="items.length === 0 && loading"
        :model-value="$props.modelValue"
      >
        <template v-slot:append-item v-if="page !== -1">
          <div class="px-4 mt-4">
            <v-btn
              block
              color="secondary"
              variant="tonal"
              rounded="large"
              size="large"
              @click="loadNextPage"
              :loading="loading"
            >
              Load More Gateway Nodes
            </v-btn>
          </div>
        </template>
      </v-autocomplete>
    </template>
  </input-validator>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { loadGatewayNodes } from '../utils/gateway'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import type { GatewayNode } from '../types'

const props = defineProps<{ modelValue?: GatewayNode }>()
const emits = defineEmits<{ (event: 'update:model-value', value: GatewayNode): void }>()

const profileManager = useProfileManager()

const loading = ref(false)
const items = ref<any[]>([])
const page = ref(1)
const size = 50

onMounted(loadNextPage)
async function loadNextPage() {
  loading.value = true
  const grid = await getGrid(profileManager.profile!)
  const nodes = await loadGatewayNodes(grid!, { page: page.value++, size })

  if (nodes.length === 0 || nodes.length < size) {
    page.value = -1
  }

  items.value = items.value.concat(nodes.map(normalizeGatewayNode))
  loading.value = false

  if (!props.modelValue && items.value.length > 0) {
    emits('update:model-value', items.value[0])
  }
}

function normalizeGatewayNode(item: any): GatewayNode {
  return {
    id: +item.nodeId,
    domain: item.publicConfig.domain,
  }
}
</script>

<script lang="ts">
export default {
  name: 'SelectGatewayNode',
}
</script>
