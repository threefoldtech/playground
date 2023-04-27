<template>
  <ManageWorkerDialog
    :workers="data"
    :selectedWorkers="selectedWorkers"
    :deleting="deleting"
    @close="$emit('close')"
    @deploy="deploy"
    @delete="onDelete"
  >
    <template #title>Manage Caprover Instance</template>
    <template #subtitle>Managing {{ name }} Workers</template>

    <template #list>
      <ListTable
        :headers="[
          { title: '#', key: 'index' },
          { title: 'PLACEHOLDER', key: 'data-table-select' },
          { title: 'Contract ID', key: 'contractId' },
          { title: 'Name', key: 'name' },
          { title: 'Public IPv4', key: 'publicIP.ip' },
          { title: 'CPU(vCores)', key: 'capacity.cpu' },
          { title: 'Memory(MB)', key: 'capacity.memory' },
          { title: 'Disk(GB)', key: 'disk' },
        ]"
        :items="data"
        :loading="false"
        :deleting="deleting"
        v-model="selectedWorkers"
      >
        <template #[`item.index`]="{ item }">
          {{ data.indexOf(item?.value) + 1 }}
        </template>

        <template #[`item.disk`]="{ item }">
          {{ calcDiskSize(item.value.mounts) }}
        </template>
      </ListTable>
    </template>

    <template #deploy="{ form }">
      <input-validator :rules="[]" v-bind="form">
        <template #default="{ props }">
          <v-text-field label="Name" v-model="name" v-bind="props" />
        </template>
      </input-validator>

      <SelectSolutionFlavor
        v-model:cpu.number="cpu"
        v-model:memory.number="memory"
        v-model:disk.number="disk"
        :form="form"
      />

      <SelectFarm :form="form" v-model="farm" v-model:country="country" />
    </template>
  </ManageWorkerDialog>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import { deployWorker, deleteWorker, loadK8S } from '../utils/deploy_k8s'
import { ProjectName } from '../types'
import { generateString } from 'grid3_client'
import type { Farm } from '../types'

const props = defineProps<{ name: string; data: any[] }>()
const emits = defineEmits<{ (event: 'close'): void; (event: 'update:caprover', data: any): void }>()

const profileManager = useProfileManager()

const selectedWorkers = ref<any[]>([])
const deleting = ref(false)

const name = ref('CR' + generateString(8))
const cpu = ref() as Ref<number>
const memory = ref() as Ref<number>
const disk = ref() as Ref<number>
const farm = ref<Farm>()
const country = ref<string>()

function calcDiskSize(disks: { size: number }[]) {
  return disks.reduce((t, d) => t + d.size, 0) / 1024 ** 3
}

async function deploy(layout: any) {
  //   layout.setStatus('deploy')
  //   const grid = await getGrid(profileManager.profile!, ProjectName.Kubernetes)
  //   deployWorker(grid!, {
  //     ...worker.value,
  //     deploymentName: props.data.deploymentName,
  //   })
  //     .then((data) => {
  //       layout.setStatus(
  //         'success',
  //         `Successfully add a new worker to '${props.data.deploymentName}' Cluster.`
  //       )
  //       emits('update:k8s', data)
  //     })
  //     .catch((error) => {
  //       const e = typeof error === 'string' ? error : error.message
  //       layout.setStatus('failed', e)
  //     })
}

async function onDelete(cb: (workers: any[]) => void) {
  //   deletingDialog.value = false
  //   deleting.value = true
  //   const grid = await getGrid(profileManager.profile!, ProjectName.Kubernetes)
  //   for (const worker of selectedWorkers.value) {
  //     try {
  //       await deleteWorker(grid!, {
  //         deploymentName: props.data.deploymentName,
  //         name: worker.name,
  //       })
  //     } catch (e) {
  //       console.log('Error while deleting worker', e)
  //     }
  //   }
  //   selectedWorkers.value = []
  //   const data = await loadK8S(grid!, props.data.deploymentName)
  //   emits('update:k8s', data)
  //   cb(data.workers)
  //   deleting.value = false
}
</script>

<script lang="ts">
import ManageWorkerDialog from './manage_worker_dialog.vue'
import ListTable from '../components/list_table.vue'
import SelectSolutionFlavor from './select_solution_flavor.vue'
import SelectFarm from './select_farm.vue'

export default {
  name: 'ManageCaproverWorkerDialog',
  components: {
    ManageWorkerDialog,
    SelectSolutionFlavor,
    SelectFarm,
    ListTable,
  },
}
</script>
