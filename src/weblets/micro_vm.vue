<template>
  <weblet-layout>
    <template #title>Deploy a Micro Virtual Machine </template>
    <template #subtitle
      >Deploy a new micro virtual machine on the Threefold Grid
      <a
        class="app-link"
        href="https://library.threefold.me/info/manual/#/manual__weblets_vm"
        target="_blank"
      >
        Quick start documentation
      </a>
    </template>

    <d-tabs
      :tabs="[
        { title: 'Config', value: 'config' },
        { title: 'Environment Variables', value: 'env' },
        { title: 'Disks', value: 'disks' }
      ]"
    >
      <template #config>
        <v-text-field label="Name" v-model="name" />
        <SelectVmImage v-model:flist="flist" v-model:entry-point="entryPoint" :images="images" />
        <RootFsSize v-model="rootFsSize" />
        <v-text-field label="CPU (vCores)" v-model.number="cpu" />
        <v-text-field label="Memory (MB)" v-model.number="memory" />
        <v-switch color="primary" inset label="Public IPv4" v-model="ipv4" />
        <v-switch color="primary" inset label="Public IPv6" v-model="ipv6" />
        <v-switch color="primary" inset label="Planetary Network" v-model="planetary" />
        <v-switch color="primary" inset label="Add Wireguard Access" v-model="wireguard" />
        <SelectFarm
          :filters="{
            cpu,
            memory,
            ssd: disks.reduce((total, disk) => total + disk.size, rootFsSize)
          }"
          v-model="farm"
        />
      </template>

      <template #env>
        <ExpandableLayout v-model="envs" @add="envs.push({ key: '', value: '' })">
          <template #default="{ index }">
            {{ envs[index].key }}
            <v-text-field label="Key" v-model="envs[index].key" />
            <v-textarea label="Value" v-model="envs[index].value" no-resize :spellcheck="false" />
          </template>
        </ExpandableLayout>
      </template>

      <template #disks>
        <ExpandableLayout v-model="disks" @add="addDisk">
          <template #default="{ index }">
            {{ disks[index].name }}
            <v-text-field label="Name" v-model="disks[index].name" />
            <v-text-field label="Size (GB)" type="number" v-model.number="disks[index].size" />
            <v-text-field label="Mount Point" v-model="disks[index].mountPoint" />
          </template>
        </ExpandableLayout>
      </template>
    </d-tabs>

    <template #footer-actions>
      <v-btn color="primary" variant="tonal" :loading="loading" :disabled="loading" @click="deploy"
        >Deploy</v-btn
      >
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { generateString } from 'grid3_client'
import type { Farm } from '../types'
import { deployVM, type Disk, type Env } from '../utils/deploy_vm'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'

const profileManager = useProfileManager()

const images = [
  {
    name: 'Ubuntu-22.04',
    flist: 'https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-22.04.flist',
    entryPoint: '/sbin/zinit init'
  },
  {
    name: 'Alpine-3',
    flist: 'https://hub.grid.tf/tf-official-apps/threefoldtech-alpine-3.flist',
    entryPoint: '/entrypoint.sh'
  },
  {
    name: 'CentOS-8',
    flist: 'https://hub.grid.tf/tf-official-apps/threefoldtech-centos-8.flist',
    entryPoint: '/entrypoint.sh'
  },
  {
    name: 'Nixos',
    flist: 'https://hub.grid.tf/tf-official-vms/nixos-micro-latest.flist',
    entryPoint: '/entrypoint.sh'
  }
]

const name = ref('VM' + generateString(8))
const flist = ref() as Ref<string>
const entryPoint = ref() as Ref<string>
const rootFsSize = ref(2) as Ref<number>
const cpu = ref(4)
const memory = ref(8192)
const ipv4 = ref(false)
const ipv6 = ref(false)
const planetary = ref(true)
const wireguard = ref(false)
const farm = ref() as Ref<Farm>
const envs = ref<Env[]>([
  {
    key: 'SSH_KEY',
    value:
      'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQC+Cvvf4mEdeqvBRDTHwfTRbY22Zpf/SriOXQz2ffZ9C7agWjGI+jFYNlDU2crAcpoHp96sz5sgqWTP+2nlmlafC4bmGxcHR6MwoVdtrgLbtIf86ZbpJr2OA6gWL3/V9XWI8T++R50PuY8FEPKgA9dmMZzNCny3tuc+uWeyeCd4IIlIXUWQXVMY/nUUieJLmXgxLt3Gk6gNvFI+bL9LI3dLVI6GB9dUwuMr19eZ1eP/gnJC7sGvbHnJLOxFizKZLJB68LLFO4J7IHaoYZ7pmhul9/NLM74+OHbRzHVqIfnEQmkfiAlp+opf62zz6iyzesI32nNDcerL/hRU6JY4PmpWMC76bFOVJlWXdlO3p21xGFjGMoai6n1W7FMrOPqMRIKvDQxmgZNZTkeLqS15v7r7Skah95KGMPPbM7XSMuePyxySB7JLMEbvNMXyuMgIwzP2dH75dtXE670t7hZ7Em7XUzD1hgv25i+ruma4fC1kYr0eyEB/q1wZunJKpS4EuXDaynJwPgzVm1Uc+pDVTHFifAQYAZ3BY6DBTG+2uu/CD6QVbuvk9IvCTmP7r2rMdjiBh+OBoqmUTB8F+/5Yt9Box1QNsfNmVaWf5WL51cT3IkHSTO5y/Qwv2LEd7QfsEZm6/+v0L+iChZ7kU4fSC2d8da+cmG5q3WORChd5pMNURQ== Threefold'
  }
])
const disks = ref<Disk[]>([])

function addDisk() {
  const name = generateString(5)
  disks.value.push({
    name: 'DISK' + name,
    size: 50,
    mountPoint: '/mnt/' + name
  })
}

const loading = ref(false)
async function deploy() {
  loading.value = true
  const grid = await getGrid(profileManager.profile!)

  deployVM(grid!, {
    name: name.value,
    network: {
      addAccess: wireguard.value
    },
    machines: [
      {
        name: name.value,
        cpu: cpu.value,
        memory: memory.value,
        flist: flist.value,
        entryPoint: entryPoint.value,
        farmId: farm.value.farmID,
        farmName: farm.value.name,
        disks: disks.value,
        envs: envs.value,
        planetary: planetary.value,
        publicIpv4: ipv4.value,
        publicIpv6: ipv6.value,
        rootFilesystemSize: rootFsSize.value
      }
    ]
  })
    .then(console.log)
    .catch(console.log)
    .finally(() => (loading.value = false))
}
</script>

<script lang="ts">
import SelectVmImage from '../components/select_vm_image.vue'
import RootFsSize from '../components/root_fs_size.vue'
import SelectFarm from '../components/select_farm.vue'
import ExpandableLayout from '../components/expandable_layout.vue'

export default {
  name: 'MicroVm',
  components: {
    SelectVmImage,
    RootFsSize,
    SelectFarm,
    ExpandableLayout
  }
}
</script>
