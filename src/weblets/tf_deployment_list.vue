<template>
  <weblet-layout ref="layout">
    <template #title>Deployment List</template>

    <d-tabs :tabs="tabs" v-model="activeTab" :disabled="loading" destroy>
      <template #default>
        <VmDeploymentTable
          :getLayout="() => layout"
          :projectName="tabs[activeTab].value"
          v-model="selectedItems"
          :deleting="false"
        >
          <template #CapRover-actions> caprover </template>

          <template #Wordpress-actions="{ item }">
            <IconActionBtn
              tooltip="Preview"
              color="info"
              icon="mdi-web"
              :href="item.value[0].env.WP_URL"
            />
            <IconActionBtn
              tooltip="Admin Panel"
              color="secondary"
              icon="mdi-view-dashboard"
              :href="item.value[0].env.WP_URL + '/wp-admin'"
            />
          </template>
        </VmDeploymentTable>
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
const selectedItems = ref<any[]>([])
const loading = ref(false)

const activeTab = ref() as Ref<number>
</script>

<script lang="ts">
import VmDeploymentTable from '../components/vm_deployment_table.vue'
import IconActionBtn from '../components/icon_action_btn.vue'

export default {
  name: 'TfDeploymentList',
  components: {
    VmDeploymentTable,
    IconActionBtn
  }
}
</script>
