<template>
  <weblet-layout ref="layout" @mount="onMount">
    <template #title>Contracts List</template>
    <template #subtitle>
      <a
        class="app-link"
        href="https://library.threefold.me/info/manual/#/manual__tfchain_home"
        target="_blank"
        >Quick start documentation</a
      >
    </template>

    <template #default>
      <v-data-table
        :headers="headers"
        :items="contracts"
        item-title="title"
        item-value="key"
        show-select
        v-model="selectedContracts"
        hover
        :items-per-page="-1"
      >
        <template #[`item.actions`]="{ item }">
          <v-btn
            color="secondary"
            variant="tonal"
            @click="onShowDetails(item.value.contractId)"
            :disabled="loading && loadingContractId !== item.value.contractId"
            :loading="loadingContractId == item.value.contractId"
          >
            Show Details
          </v-btn>
        </template>
      </v-data-table>
    </template>

    <template #footer-actions>
      <v-btn variant="outlined" color="error" :disabled="!selectedContracts.length || loading">
        Delete Selected
      </v-btn>
      <v-btn variant="tonal" color="error" :disabled="loading">Delete All</v-btn>
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import { getUserContracts, type NormalizedContract } from '../utils/contracts'
import type { VDataTableHeader } from '../types'

const layout = ref()
const profileManager = useProfileManager()
const contracts = ref<NormalizedContract[]>()
const loading = ref(false)
const selectedContracts = ref<NormalizedContract[]>([])
const headers: VDataTableHeader = [
  { title: 'ID', key: 'contractId' },
  { title: 'Type', key: 'type' },
  { title: 'State', key: 'state' },
  { title: 'Billing Rate', key: 'consumption' },
  { title: 'Solution Type', key: 'solutionType' },
  { title: 'Solution Name', key: 'solutionName' },
  { title: 'Created At', key: 'createdAt' },
  { title: 'Expiration', key: 'expiration' },
  { title: 'Actions', key: 'actions' }
]

async function onMount() {
  loading.value = true
  const grid = await getGrid(profileManager.profile!)
  contracts.value = await getUserContracts(grid!)
  loading.value = false
}

const loadingContractId = ref<number>()
async function onShowDetails(contractId: number) {
  loading.value = true
  loadingContractId.value = contractId
  const grid = await getGrid(profileManager.profile!)
  const deployment = await grid!.zos.getDeployment({ contractId })
  layout.value.openDialog(deployment, false, true)
  loadingContractId.value = undefined
  loading.value = false
}
</script>

<script lang="ts">
export default {
  name: 'TfContractsList'
}
</script>
