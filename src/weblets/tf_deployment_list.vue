<template>
  <weblet-layout ref="layout">
    <template #title>Deployment List</template>

    <d-tabs :tabs="tabs" v-model="activeTab" :disabled="loading">
      <template #default>
        <ListTable
          :headers="[
            { title: '#', key: 'index' },
            { title: 'Name', key: 'name' },
            { title: 'Public IPv4', key: 'ipv4' },
            { title: 'Public IPv6', key: 'ipv6' },
            { title: 'Planetary Network IP', key: 'planetary' },
            { title: 'Flist', key: 'flist' },
            { title: 'Billing Rate', key: 'billing' },
            { title: 'Actions', key: 'actions' }
          ]"
          :items="items"
          :loading="loading"
          :deleting="false"
          v-model="selectedItems"
        >
          <template #[`item.index`]="{ item }">
            {{ items.indexOf(item?.value) + 1 }}
          </template>

          <template #[`item.name`]="{ item }">
            {{ item.value[0].name }}
          </template>

          <template #[`item.ipv4`]="{ item }">
            <template v-if="item.value[0].publicIP?.ip">
              {{ item.value[0].publicIP.ip }}
            </template>
            <v-checkbox-btn disabled v-else />
          </template>

          <template #[`item.ipv6`]="{ item }">
            <template v-if="item.value[0].publicIP?.ip6">
              {{ item.value[0].publicIP.ip6 }}
            </template>
            <v-checkbox-btn disabled v-else />
          </template>

          <template #[`item.planetary`]="{ item }">
            <template v-if="item.value[0].planetary">
              {{ item.value[0].planetary }}
            </template>
            <v-checkbox-btn disabled v-else />
          </template>

          <template #[`item.flist`]="{ item }">
            <v-tooltip :text="item.value[0].flist" location="bottom right">
              <template #activator="{ props }">
                <p v-bind="props">
                  {{
                    item.value[0].flist.replace('https://hub.grid.tf/', '').replace('.flist', '')
                  }}
                </p>
              </template>
            </v-tooltip>
          </template>

          <template #[`item.billing`]> No Data Available </template>
          <template #[`item.actions`]="{ item }">
            <v-tooltip text="Show Details" location="bottom">
              <template #activator="{ props }">
                <v-btn
                  variant="tonal"
                  color="primary"
                  @click="layout.openDialog(item?.value)"
                  icon="mdi-information-outline"
                  v-bind="props"
                />
              </template>
            </v-tooltip>
          </template>
        </ListTable>
      </template>
    </d-tabs>

    <template #footer-actions>
      <v-btn color="error" variant="outlined">Delete</v-btn>
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'

const tabs = [
  { title: 'Full Virtual Machine', value: 'Fullvm' },
  { title: 'Micro Virtual Machine', value: 'VM' },
  { title: 'Kubernetes', value: 'Kubernetes' },
  { title: 'CapRover', value: 'CapRover' },
  { title: 'Peertube', value: 'Peertube' },
  { title: 'Funkwhale', value: 'Funkwhale' },
  { title: 'Mattermost', value: 'Mattermost' },
  { title: 'Discourse', value: 'Discourse' },
  { title: 'Taiga', value: 'Taiga' },
  { title: 'Owncloud', value: 'Owncloud' },
  { title: 'Presearch', value: 'Presearch' },
  { title: 'Subsquid', value: 'Subsquid' },
  { title: 'Casperlabs', value: 'Casperlabs' },
  { title: 'Algorand', value: 'Algorand' },
  { title: 'Node Pilot', value: 'NodePilot' },
  { title: 'Umbrel', value: 'Umbrel' },
  { title: 'Wordpress', value: 'Wordpress' }
]

const profileManager = useProfileManager()

const layout = ref()
const items = ref<any[]>([])
const selectedItems = ref<any[]>([])
const loading = ref(false)

const activeTab = ref() as Ref<number>
watch(
  () => tabs[activeTab.value]?.value,
  async (project) => {
    /* should load data here */
    loading.value = true
    selectedItems.value = []
    items.value = []
    const grid = await getGrid(profileManager.profile!, project)
    const names = await grid!.machines.list()
    items.value = await Promise.all(names.map((name) => grid!.machines.getObj(name)))
    console.log(items.value)

    loading.value = false
  }
)
</script>

<script lang="ts">
import ListTable from '../components/list_table.vue'

export default {
  name: 'TfDeploymentList',
  components: {
    ListTable
  }
}
</script>
