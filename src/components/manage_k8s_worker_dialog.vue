<template>
  <v-dialog model-value width="70%" persistent>
    <weblet-layout ref="layout">
      <template #title>Manage Kubernetes Cluster</template>
      <template #subtitle>Managing {{ data.deploymentName }} cluster</template>

      <div class="d-flex justify-center mb-6">
        <v-btn-toggle
          divided
          v-model="showType"
          mandatory
          v-if="data.workers.length > 0"
          :disabled="deleting"
        >
          <v-btn variant="outlined"> List </v-btn>
          <v-btn variant="outlined"> Deploy </v-btn>
        </v-btn-toggle>
      </div>

      <template v-if="showType === 0">
        <ListTable
          :headers="[
            { title: '#', key: 'index' },
            { title: 'PLACEHOLDER', key: 'data-table-select' },
            { title: 'Contract ID', key: 'contractId' },
            { title: 'Name', key: 'name' },
            { title: 'Planetary Network IP', key: 'planetary' },
            { title: 'CPU(vCores)', key: 'capacity.cpu' },
            { title: 'Memory(MB)', key: 'capacity.memory' },
            { title: 'Disk(GB)', key: 'disk' },
          ]"
          :items="data.workers"
          :loading="false"
          :deleting="deleting"
          v-model="selectedWorkers"
        >
          <template #[`item.index`]="{ item }">
            {{ data.workers.indexOf(item?.value) + 1 }}
          </template>

          <template #[`item.disk`]="{ item }">
            {{ calcDiskSize(item.value.mounts) }}
          </template>
        </ListTable>
      </template>

      <form-validator v-model="valid" v-else>
        <template #default="{ form }">
          <K8SWorker v-model="worker" :form="form" />
        </template>
      </form-validator>

      <template #footer-actions>
        <v-btn
          color="error"
          variant="outlined"
          prepend-icon="mdi-delete"
          :disabled="selectedWorkers.length === 0 || deleting"
          v-if="showType === 0"
          @click="deletingDialog = true"
        >
          Delete
        </v-btn>
        <v-btn
          color="primary"
          variant="tonal"
          :disabled="!valid"
          @click="deploy"
          v-if="showType === 1"
        >
          Deploy
        </v-btn>
        <v-btn color="error" variant="tonal" v-if="!deleting" @click="$emit('close')">
          Close
        </v-btn>
      </template>
    </weblet-layout>
  </v-dialog>

  <v-dialog width="50%" persistent v-model="deletingDialog">
    <v-card>
      <v-card-title class="text-h5">
        Are you sure you want to delete the following workers?
      </v-card-title>
      <v-card-text>
        <v-chip class="ma-1" color="primary" label v-for="w in selectedWorkers" :key="w.name">
          {{ w.name }}
        </v-chip>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text" @click="onDelete"> Remove </v-btn>
        <v-btn color="error" variant="tonal" @click="deletingDialog = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import { deployWorker, deleteWorker, loadK8S } from '../utils/deploy_k8s'
import { ProjectName } from '../types'

const props = defineProps<{ data: K8S }>()
const emits = defineEmits<{ (event: 'close'): void; (event: 'update:k8s', data: any): void }>()

const profileManager = useProfileManager()

const layout = ref()
const showType = ref(props.data.workers.length === 0 ? 1 : 0)
const valid = ref(true)
const worker = ref(createWorker())
const selectedWorkers = ref<any[]>([])
const deleting = ref(false)
const deletingDialog = ref(false)

function calcDiskSize(disks: { size: number }[]) {
  return disks.reduce((t, d) => t + d.size, 0) / 1024 ** 3
}

async function deploy() {
  layout.value.setStatus('deploy')
  const grid = await getGrid(profileManager.profile!, ProjectName.Kubernetes)
  deployWorker(grid!, {
    ...worker.value,
    deploymentName: props.data.deploymentName,
  })
    .then((data) => {
      layout.value.setStatus(
        'success',
        `Successfully add a new worker to '${props.data.deploymentName}' Cluster.`
      )

      emits('update:k8s', data)
    })
    .catch((error) => {
      const e = typeof error === 'string' ? error : error.message
      layout.value.setStatus('failed', e)
    })
}

async function onDelete() {
  deletingDialog.value = false
  deleting.value = true
  const grid = await getGrid(profileManager.profile!, ProjectName.Kubernetes)

  for (const worker of selectedWorkers.value) {
    try {
      await deleteWorker(grid!, {
        deploymentName: props.data.deploymentName,
        name: worker.name,
      })
    } catch (e) {
      console.log('Error while deleting worker', e)
    }
  }

  selectedWorkers.value = []
  const data = await loadK8S(grid!, props.data.deploymentName)
  emits('update:k8s', data)
  if (data.workers.length === 0) {
    showType.value = 1
  }
  deleting.value = false
}
</script>

<script lang="ts">
import K8SWorker, { createWorker } from './k8s_worker.vue'
import ListTable from '../components/list_table.vue'
import type { K8S } from '../utils/load_deployment'

export default {
  name: 'ManageK8SWorkerDialog',
  components: {
    K8SWorker,
    ListTable,
  },
}
</script>
