<template>
  <ListTable
    :headers="[
      { title: '#', key: 'index' },
      { title: 'PLACEHOLDER', key: 'data-table-select' },
      { title: 'Name', key: 'name' },
      { title: 'Public IPv4', key: 'ipv4' },
      { title: 'Public IPv6', key: 'ipv6' },
      { title: 'Planetary Network IP', key: 'planetary' },
      { title: 'Workers', key: 'workers' },
      { title: 'Billing Rate', key: 'billing' },
      { title: 'Actions', key: 'actions' }
    ]"
    :items="items"
    :loading="loading"
    :deleting="deleting"
    :model-value="$props.modelValue"
    @update:model-value="$emit('update:model-value', $event)"
    :no-data-text="`No Kubernetes deployments found on this account.`"
  >
    <template #[`item.index`]="{ item }">
      {{ items.indexOf(item?.value) + 1 }}
    </template>

    <template #[`item.name`]="{ item }">
      {{ item.value.masters[0].name }}
    </template>

    <template #[`item.ipv4`]="{ item }">
      <template v-if="item.value.masters[0].publicIP?.ip">
        {{ item.value.masters[0].publicIP.ip }}
      </template>
      <v-checkbox-btn disabled v-else />
    </template>

    <template #[`item.ipv6`]="{ item }">
      <template v-if="item.value.masters[0].publicIP?.ip6">
        {{ item.value.masters[0].publicIP.ip6 }}
      </template>
      <v-checkbox-btn disabled v-else />
    </template>

    <template #[`item.planetary`]="{ item }">
      <template v-if="item.value.masters[0].planetary">
        {{ item.value.masters[0].planetary }}
      </template>
      <v-checkbox-btn disabled v-else />
    </template>

    <template #[`item.workers`]="{ item }">
      {{ item.value.workers.length }}
    </template>

    <template #[`item.billing`]="{ item }">
      {{ item.value.masters[0].billing }}
    </template>

    <template #[`item.actions`]="{ item }">
      <v-btn-group variant="tonal">
        <IconActionBtn
          tooltip="Show Details"
          icon="mdi-information-outline"
          @click="getLayout().openDialog(item?.value)"
        />
        <slot name="actions" :item="item"></slot>
      </v-btn-group>
    </template>
  </ListTable>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import { loadK8s } from '../utils/load_deployment'

const profileManager = useProfileManager()

const props = defineProps<{
  projectName: string
  getLayout: () => any
  modelValue: any[]
  deleting: boolean
}>()
defineEmits<{ (event: 'update:model-value', value: any[]): void }>()

const items = ref<any[]>([])
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  const grid = await getGrid(profileManager.profile!, props.projectName)
  items.value = await loadK8s(grid!)
  console.log(items.value)

  loading.value = false
})
</script>

<script lang="ts">
import ListTable from './list_table.vue'
import IconActionBtn from './icon_action_btn.vue'

export default {
  name: 'K8sDeploymentTable',
  components: {
    ListTable,
    IconActionBtn
  }
}
</script>
