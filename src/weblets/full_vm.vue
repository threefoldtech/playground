<template>
  <weblet-layout ref="layout">
    <template #title>Deploy a Full Virtual Machine</template>
    <template #subtitle
      >Deploy a new full virtual machine on the Threefold Grid
      <a class="app-link" href="https://manual.grid.tf/weblets/weblets_fullVm.html" target="_blank">
        Quick start documentation
      </a>
      .
    </template>

    <d-tabs
      :tabs="[
        { title: 'Config', value: 'config' },
        { title: 'Disks', value: 'disks' },
      ]"
      ref='tabs'
    >
      <template #config>
        <input-validator
          :value="name"
          :rules="[
            validators.required('Name is required.'),
            validators.isAlphanumeric('Name should consist of letters only.'),
            name => validators.isAlpha('Name must start with alphabet char.')(name[0]),
            validators.minLength('Name minLength is 2 chars.', 2),
            validators.maxLength('Name maxLength is 15 chars.', 15),
          ]"
          #="{ props }"
        >
          <v-text-field label="Name" v-model="name" v-bind="props" />
        </input-validator>

        <SelectVmImage :images="images" v-model="flist" />

        <input-validator
          :value="cpu"
          :rules="[
            validators.required('CPU is required.'),
            validators.isInt('CPU must be a valid integer.'),
            validators.min('CPU min is 1 cores.', 1),
            validators.max('CPU max is 32 cores.', 32),
          ]"
          #="{ props }"
        >
          <v-text-field label="CPU (vCores)" type="number" v-model.number="cpu" v-bind="props" />
        </input-validator>

        <input-validator
          :value="memory"
          :rules="[
            validators.required('Memory is required.'),
            validators.isInt('Memory must be a valid integer.'),
            validators.min('Minimum allowed memory is 256 MB.', 256),
            validators.max('Maximum allowed memory is 256 GB.', 256 * 1024),
          ]"
          #="{ props }"
        >
          <v-text-field label="Memory (MB)" type="number" v-model.number="memory" v-bind="props" />
        </input-validator>

        <input-validator
          :value="diskSize"
          :rules="[
            validators.required('Disk size is required.'),
            validators.isInt('Disk size must be a valid integer.'),
            validators.min('Minimum allowed disk size is 15 GB.', 15),
            validators.max('Maximum allowed disk size is 10000 GB.', 10000),
          ]"
          #="{ props }"
        >
          <v-text-field
            label="Disk Size (GB)"
            type="number"
            v-model.number="diskSize"
            v-bind="props"
          />
        </input-validator>

        <v-switch color="primary" inset label="Public IPv4" v-model="ipv4" />
        <v-switch color="primary" inset label="Public IPv6" v-model="ipv6" />
        <v-switch color="primary" inset label="Planetary Network" v-model="planetary" />
        <v-switch color="primary" inset label="Add Wireguard Access" v-model="wireguard" />

        <SelectFarm
          :filters="{
            cpu,
            memory,
            publicIp: ipv4,
            ssd: disks.reduce((total, disk) => total + disk.size, diskSize),
          }"
          v-model="farm"
        />

      </template>

      <template #disks>
        <ExpandableLayout v-model="disks" @add="addDisk" #="{ index }">
          <p class="text-h6 mb-4">Disk #{{ index + 1 }}</p>
          <input-validator
            :value="disks[index].name"
            :rules="[
              validators.required('Disk name is required.'),
              name => validators.isAlpha('Name must start with alphabet char.')(name[0]),
              validators.minLength('Disk minLength is 2 chars.', 2),
              validators.isAlphanumeric('Disk name only accepts alphanumeric chars.'),
              validators.maxLength('Disk maxLength is 15 chars.', 15),
            ]"
            #="{ props }"
          >
            <v-text-field label="Name" v-model="disks[index].name" v-bind="props" />
          </input-validator>
          <input-validator
            :value="disks[index].size"
            :rules="[
              validators.required('Disk size is required.'),
              validators.isInt('Disk size must be a valid integer.'),
              validators.min('Minimum allowed disk size is 1 GB.', 1),
              validators.max('Maximum allowed disk size is 10000 GB.', 10000),
            ]"
            #="{ props }"
          >
            <v-text-field
              label="Size (GB)"
              type="number"
              v-model.number="disks[index].size"
              v-bind="props"
            />
          </input-validator>
        </ExpandableLayout>
      </template>
    </d-tabs>

    <template #footer-actions>
      <v-btn color="primary" variant="tonal" @click="deploy" :disabled="tabs?.invalid">
        Deploy
      </v-btn>
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { generateString } from '@threefold/grid_client'
import { type Disk, deployVM } from '../utils/deploy_vm'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import { normalizeError } from '../utils/helpers'
import { type Farm, type Flist, ProjectName } from '../types'
import { useLayout } from '../components/weblet_layout.vue'

const layout = useLayout()
const tabs = ref()
const profileManager = useProfileManager()

const images: VmImage[] = [
  {
    name: 'Ubuntu-22.04',
    flist: 'https://hub.grid.tf/tf-official-vms/ubuntu-22.04.flist',
    entryPoint: '/init.sh',
  },
  {
    name: 'Ubuntu-20.04',
    flist: 'https://hub.grid.tf/tf-official-vms/ubuntu-20.04-lts.flist',
    entryPoint: '/init.sh',
  },
  {
    name: 'Ubuntu-18.04',
    flist: 'https://hub.grid.tf/tf-official-vms/ubuntu-18.04-lts.flist',
    entryPoint: '/init.sh',
  },
  {
    name: 'Nixos-22.11',
    flist: 'https://hub.grid.tf/tf-official-vms/nixos-22.11.flist',
    entryPoint: '/init.sh',
  },
]

const name = ref('VM' + generateString(8))
const flist = ref<Flist>()
const cpu = ref(4)
const memory = ref(8192)
const diskSize = ref(50)
const ipv4 = ref(false)
const ipv6 = ref(false)
const planetary = ref(true)
const wireguard = ref(false)
const farm = ref() as Ref<Farm>
const disks = ref<Disk[]>([])

function addDisk() {
  const name = generateString(7)
  disks.value.push({
    name: 'DISK' + name,
    size: 50,
    mountPoint: '/mnt/' + name,
  })
}

async function deploy() {
  layout.value.setStatus('deploy')

  const projectName = ProjectName.Fullvm.toLowerCase()

  try {
    const grid = await getGrid(profileManager.profile!, projectName)

    await layout.value.validateBalance(grid!)

    const vm = await deployVM(grid!, {
      name: name.value,
      machines: [
        {
          name: name.value,
          cpu: cpu.value,
          memory: memory.value,
          flist: flist.value!.value,
          entryPoint: flist.value!.entryPoint,
          farmId: farm.value.farmID,
          farmName: farm.value.name,
          country: farm.value.country,
          disks: [{ size: diskSize.value, mountPoint: '/' }, ...disks.value],
          publicIpv4: ipv4.value,
          publicIpv6: ipv6.value,
          planetary: planetary.value,
          envs: [{ key: 'SSH_KEY', value: profileManager.profile!.ssh }],
          rootFilesystemSize: 2,
        },
      ],
      network: { addAccess: wireguard.value },
    })

    layout.value.reloadDeploymentsList()
    layout.value.setStatus('success', 'Successfully deployed a full virtual machine instance.')
    layout.value.openDialog(vm, { SSH_KEY: 'Public SSH Key' })
  } catch (e) {
    layout.value.setStatus(
      'failed',
      normalizeError(e, 'Failed to deploy a full virtual machine instance.')
    )
  }
}
</script>

<script lang="ts">
import SelectVmImage, { type VmImage } from '../components/select_vm_image.vue'
import SelectFarm from '../components/select_farm.vue'
import ExpandableLayout from '../components/expandable_layout.vue'

export default {
  name: 'FullVm',
  components: {
    SelectVmImage,
    SelectFarm,
    ExpandableLayout,
  },
}
</script>
