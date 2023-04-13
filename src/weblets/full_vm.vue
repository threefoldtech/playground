<template>
  <weblet-layout>
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
          <v-text-field label="Name" v-model="name" />
          <SelectVmImage :images="images" v-model:flist="flist" v-model:entry-point="entryPoint" />
          <v-text-field label="CPU (vCores)" type="number" v-model="cpu" />
          <v-text-field label="Memory (MB)" type="number" v-model="memory" />
          <v-text-field label="Disk Size (GB)" type="number" v-model="diskSize" />
          <v-switch color="primary" inset label="Public IPv4" v-model="ipv4" />
          <v-switch color="primary" inset label="Public IPv6" v-model="ipv6" />
          <v-switch color="primary" inset label="Planetary Network" v-model="planetary" />
          <v-switch color="primary" inset label="Add Wireguard Access" v-model="wireguard" />
          <SelectFarmId
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
              <p class="text-h6 mb-4">{{ disks[index].name }}</p>
              <v-text-field label="Name" v-model="disks[index].name" />
              <v-text-field label="Size (GB)" type="number" v-model="disks[index].size" />
            </template>
          </ExpandableLayout>
        </template>
      </d-tabs>
    </template>

    <template #footer-actions>
      <v-btn color="primary" variant="tonal" @click="deploy">Deploy</v-btn>
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { generateString } from 'grid3_client'
import { type Disk, deployVM } from '../utils/deploy_vm'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'

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
const flist = ref() as Ref<string>
const entryPoint = ref() as Ref<string>
const cpu = ref(4)
const memory = ref(8192)
const diskSize = ref(50)
const ipv4 = ref(false)
const ipv6 = ref(false)
const planetary = ref(true)
const wireguard = ref(false)
const farm = ref() as Ref<Farm>
const disks = ref<Disk[]>([])

// const country = ref<string>() /* TODO: should use it later in SelectFarm */

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
  deployVM(grid!, {
    name: name.value,
    machines: [
      {
        name: name.value,
        cpu: cpu.value,
        memory: memory.value,
        flist: flist.value,
        entryPoint: entryPoint.value,
        farmId: farm.value.farmID,
        farmName: farm.value.name,
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
      console.log(vm)
    })
    .catch(console.log)
}
</script>

<script lang="ts">
import SelectVmImage, { type VmImage } from '../components/select_vm_image.vue'
import SelectFarmId from '../components/select_farm.vue'
import ExpandableLayout from '../components/expandable_layout.vue'
import type { Farm } from '../types'

export default {
  name: 'FullVm',
  components: {
    SelectVmImage,
    SelectFarmId,
    ExpandableLayout
  }
}
</script>
