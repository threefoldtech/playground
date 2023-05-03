<template>
  <weblet-layout ref="layout">
    <template #title>Deploy a Node Pilot</template>
    <template #subtitle
      >Deploy a new Node Pilot on the Threefold Grid
      <a class="app-link" href="https://manual.grid.tf/weblets/weblets_nodepilot.html" target="_blank">
        Quick start documentation
      </a>
      .
    </template>

    <template #default>
      <d-tabs
        :tabs="[
          { title: 'Config', value: 'config'},
        ]"
      >
        <template #config>
          <input-validator
            :value="name"
            :rules="[
              validators.required('Name is required.'),
              validators.minLength('Name minLength is 2 chars.', 2),
              validators.maxLength('Name maxLength is 15 chars.', 15)
            ]"
          >
            <template #default="{ props }">
              <v-text-field label="Name" v-model="name" v-bind="props" />
            </template>
          </input-validator>

          <input-validator
            :value="cpu"
            :rules="[
              validators.required('CPU is required.'),
              validators.isInt('CPU must be a valid integer.'),
              validators.min('CPU min is 2 cores.', 2),
              validators.max('CPU max is 32 cores.', 32)
            ]"
          >
            <template #default="{ props }">
              <v-text-field
                label="CPU (vCores)"
                type="number"
                v-model.number="cpu"
                v-bind="props"
              />
            </template>
          </input-validator>

          <input-validator
            :value="memory"
            :rules="[
              validators.required('Memory is required.'),
              validators.isInt('Memory must be a valid integer.'),
              validators.min('Minimum allowed memory is 256 MB.', 256),
              validators.max('Maximum allowed memory is 256 GB.', 256 * 1024)
            ]"
          >
            <template #default="{ props }">
              <v-text-field
                label="Memory (MB)"
                type="number"
                v-model.number="memory"
                v-bind="props"
              />
            </template>
          </input-validator>

          <SelectFarmId
            :filters="{
              cpu,
              memory,
              ssd: diskSize + rootFsSize,
            }"
            v-model="farm"
            v-model:country="country"
          />
        </template>
      </d-tabs>
    </template>

    <template #footer-actions>
      <v-btn color="primary" variant="tonal" @click="deploy" :disabled="tabs?.invalid"> Deploy </v-btn>
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { generateString } from '@threefold/grid_client'
import { deployVM } from '../utils/deploy_vm'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import * as validators from '../utils/validators'
import { type Farm, ProjectName } from '../types'
import Disk from '../utils/disk'

const layout = ref()
const tabs = ref()
const profileManager = useProfileManager()
const name = ref('NP' + generateString(8))
const cpu = ref(4)
const memory = ref(8192)
const diskSize = ref(50)
const rootFsSize = rootFs(cpu.value, memory.value)
const planetary = ref(true)
const farm = ref() as Ref<Farm>
const country = ref<string>()
const disks = ref<Disk[]>([])
const disk1 = new Disk();
const disk2 = new Disk();
disks.value.push(disk1, disk2)

async function deploy() {
  const grid = await getGrid(profileManager.profile!, ProjectName.NodePilot)

  layout.value.setStatus('deploy')
  deployVM(grid!, {
    name: name.value,
    machines: [
      {
        name: name.value,
        cpu: cpu.value,
        memory: memory.value,
        flist: "https://hub.grid.tf/tf-official-vms/node-pilot-zdbfs.flist",
        entryPoint: "/",
        farmId: farm.value.farmID,
        farmName: farm.value.name,
        country: country.value,
        planetary: planetary.value,
        envs: [{ key: 'SSH_KEY', value: profileManager.profile!.ssh }],
        rootFilesystemSize: 2,
        disks: [...disks.value]
      }
    ],
  })
    .then((vm) => {
      layout.value.setStatus('success', 'Successfully deployed a node pilot instance.')
      layout.value.openDialog(vm, { SSH_KEY: 'Public SSH Key' })
    })
    .catch((error) => {
      const e = typeof error === 'string' ? error : error.message
      layout.value.setStatus('failed', e)
    })
}
</script>

<script lang="ts">
import SelectFarmId from '../components/select_farm.vue'
import rootFs from '../utils/root_fs'
// import type { DiskModel } from '@threefold/grid_client'

export default {
  name: 'NodePilot',
  components: {
    SelectFarmId,
  }
}
</script>
