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

    <template #default>
      <d-tabs
        :tabs="[
          { title: 'Config', value: 'config' },
          { title: 'Disks', value: 'disks' }
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

          <SelectVmImage :images="images" v-model="flist" />

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

          <input-validator
            :value="diskSize"
            :rules="[
              validators.required('Disk size is required.'),
              validators.isInt('Disk size must be a valid integer.'),
              validators.min('Minimum allowed disk size is 1 GB.', 1),
              validators.max('Maximum allowed disk size is 10000 GB.', 10000)
            ]"
          >
            <template #default="{ props }">
              <v-text-field
                label="Disk Size (GB)"
                type="number"
                v-model.number="diskSize"
                v-bind="props"
              />
            </template>
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
              ssd: disks.reduce((total, disk) => total + disk.size, diskSize)
            }"
            v-model="farm"
          />
        </template>

        <template #disks>
          <ExpandableLayout v-model="disks" @add="addDisk">
            <template #default="{ index }">
              <p class="text-h6 mb-4">Disk #{{ index + 1 }}</p>
              <input-validator
                :value="disks[index].name"
                :rules="[
                  validators.required('Disk name is required.'),
                  validators.pattern(
                    'Disk name can\'t start with a number, a non-alphanumeric character or a whitespace',
                    { pattern: /^[A-Za-z]/ }
                  ),
                  validators.minLength('Disk minLength is 2 chars.', 2),
                  validators.isAlphanumeric('Disk name only accepts alphanumeric chars.'),
                  validators.maxLength('Disk maxLength is 15 chars.', 15)
                ]"
              >
                <template #default="{ props }">
                  <v-text-field label="Name" v-model="disks[index].name" v-bind="props" />
                </template>
              </input-validator>
              <input-validator
                :value="disks[index].size"
                :rules="[
                  validators.required('Disk size is required.'),
                  validators.isInt('Disk size must be a valid integer.'),
                  validators.min('Minimum allowed disk size is 1 GB.', 1),
                  validators.max('Maximum allowed disk size is 10000 GB.', 10000)
                ]"
              >
                <template #default="{ props }">
                  <v-text-field
                    label="Size (GB)"
                    type="number"
                    v-model.number="disks[index].size"
                    v-bind="props"
                  />
                </template>
              </input-validator>
            </template>
          </ExpandableLayout>
        </template>
      </d-tabs>
    </template>

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
import * as validators from '../utils/validators'

const layout = ref()
const tabs = ref()
const profileManager = useProfileManager()

const images: VmImage[] = [
  {
    name: 'Ubuntu-22.04',
    flist: 'https://hub.grid.tf/tf-official-vms/ubuntu-22.04.flist',
    entryPoint: '/init.sh'
  },
  {
    name: 'Ubuntu-20.04',
    flist: 'https://hub.grid.tf/tf-official-vms/ubuntu-20.04-lts.flist',
    entryPoint: '/init.sh'
  },
  {
    name: 'Ubuntu-18.04',
    flist: 'https://hub.grid.tf/tf-official-vms/ubuntu-18.04-lts.flist',
    entryPoint: '/init.sh'
  },
  {
    name: 'Nixos-22.11',
    flist: 'https://hub.grid.tf/tf-official-vms/nixos-22.11.flist',
    entryPoint: '/init.sh'
  }
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
    mountPoint: '/mnt/' + name
  })
}

async function deploy() {
  const grid = await getGrid(profileManager.profile!)

  layout.value.setStatus('deploy')
  deployVM(grid!, {
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
        rootFilesystemSize: 2
      }
    ],
    network: { addAccess: wireguard.value }
  })
    .then((vm) => {
      layout.value.setStatus('success', 'Successfully deployed a full virtual machine instance.')
      layout.value.openDialog(vm, { SSH_KEY: 'Public SSH Key' })
    })
    .catch((error) => {
      const e = typeof error === 'string' ? error : error.message
      layout.value.setStatus('failed', e)
    })
}
</script>

<script lang="ts">
import SelectVmImage, { type VmImage } from '../components/select_vm_image.vue'
import SelectFarm from '../components/select_farm.vue'
import ExpandableLayout from '../components/expandable_layout.vue'
import type { Farm, Flist } from '../types'

export default {
  name: 'FullVm',
  components: {
    SelectVmImage,
    SelectFarm,
    ExpandableLayout
  }
}
</script>
