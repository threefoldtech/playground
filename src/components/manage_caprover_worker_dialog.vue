<template>
  <ManageWorkerDialog
    :workers="data"
    :selectedWorkers="selectedWorkers"
    :deleting="deleting"
    @close="$emit('close')"
    @deploy="deploy"
    @delete="onDelete"
  >
    <template #title>Manage Caprover({{ $props.master.deploymentName }}) Workers</template>

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

    <template #deploy>
      <input-validator :rules="[]">
        <template #default="{ props }">
          <v-text-field label="Name" v-model="name" v-bind="props" />
        </template>
      </input-validator>

      <SelectSolutionFlavor v-model="solution" />

      <SelectFarm
        :filters="{
          cpu: solution?.cpu,
          memory: solution?.memory,
          publicIp: true,
          ssd: solution?.disk ?? 0 + rootFs(solution?.cpu ?? 0, solution?.memory ?? 0),
        }"
        v-model="farm"
      />
    </template>
  </ManageWorkerDialog>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import { addMachine } from '../utils/deploy_vm'
import { generateString } from 'grid3_client'
import { type Farm, ProjectName, type solutionFlavor } from '../types'
import rootFs from '../utils/root_fs'

const props = defineProps<{ master: any; data: any[] }>()
const emits = defineEmits<{ (event: 'close'): void; (event: 'update:caprover', data: any): void }>()

const profileManager = useProfileManager()

const selectedWorkers = ref<any[]>([])
const deleting = ref(false)

const name = ref('CR' + generateString(8))
const solution = ref<solutionFlavor>()
const farm = ref<Farm>()

function calcDiskSize(disks: { size: number }[]) {
  return disks.reduce((t, d) => t + d.size, 0) / 1024 ** 3
}

async function deploy(layout: any) {
  layout.setStatus('deploy')

  const grid = await getGrid(profileManager.profile!, ProjectName.Caprover)
  addMachine(grid!, {
    name: name.value,
    deploymentName: props.master.deploymentName,
    cpu: solution.value!.cpu,
    memory: solution.value!.memory,
    disks: [
      {
        name: 'data0',
        size: solution.value!.disk,
        mountPoint: '/var/lib/docker',
      },
    ],
    flist: 'https://hub.grid.tf/tf-official-apps/tf-caprover-main.flist',
    entryPoint: '/sbin/zinit init',
    farmId: farm.value!.farmID,
    farmName: farm.value!.name,
    planetary: false,
    publicIpv4: true,
    envs: [
      { key: 'SWM_NODE_MODE', value: 'worker' },
      { key: 'PUBLIC_KEY', value: props.master.env.PUBLIC_KEY },
    ],
    rootFilesystemSize: rootFs(solution.value!.cpu, solution.value!.memory),
  })
    .then((data) => {
      layout.setStatus(
        'success',
        `Successfully add a new worker to Caprover('${props.master.deploymentName}') Instance.`
      )
      emits('update:caprover', data)
    })
    .catch((error) => {
      const e = typeof error === 'string' ? error : error.message
      layout.setStatus('failed', e)
    })
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
