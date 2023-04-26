<template>
  <weblet-layout ref="layout">
    <template #title>Deployment List</template>

    <d-tabs :tabs="tabs" v-model="activeTab" :disabled="loading" destroy>
      <template #default>
        <VmDeploymentTable :getLayout="() => layout" :projectName="tabs[activeTab].value" />
      </template>
    </d-tabs>

    <template #footer-actions>
      <v-btn color="error" variant="outlined">Delete</v-btn>
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue'
// import { useProfileManager } from '../stores'
// import { getGrid } from '../utils/grid'

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

// const profileManager = useProfileManager()

const layout = ref()
// const items = ref<any[]>([])
// const selectedItems = ref<any[]>([])
const loading = ref(false)

const activeTab = ref() as Ref<number>
// watch(
//   () => tabs[activeTab.value]?.value,
//   async (project) => {
//     /* should load data here */
//     loading.value = true
//     selectedItems.value = []
//     items.value = []
//     const grid = await getGrid(profileManager.profile!, project)
//     const names = await grid!.machines.list()
//     items.value = await Promise.all(names.map((name) => grid!.machines.getObj(name)))
//     loading.value = false
//   }
// )
</script>

<script lang="ts">
// import ListTable from '../components/list_table.vue'
import VmDeploymentTable from '../components/vm_deployment_table.vue'

export default {
  name: 'TfDeploymentList',
  components: {
    VmDeploymentTable
  }
}
</script>
