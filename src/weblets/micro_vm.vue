<template>
  <weblet-layout ref="layout">
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
        { title: 'Config', value: 'config', invalid: !isConfigValid },
        { title: 'Environment Variables', value: 'env', invalid: !isEnvsValid },
        { title: 'Disks', value: 'disks', invalid: !isDisksValid }
      ]"
      ref="tabs"
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

        <SelectVmImage
          :images="images"
          v-model:flist="flist"
          v-model:entry-point="entryPoint"
        />

        <RootFsSize v-model="rootFsSize" />

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

        <v-switch color="primary" inset label="Public IPv4" v-model="ipv4" />
        <v-switch color="primary" inset label="Public IPv6" v-model="ipv6" />
        <v-switch color="primary" inset label="Planetary Network" v-model="planetary" />
        <v-switch color="primary" inset label="Add Wireguard Access" v-model="wireguard" />

        <SelectFarm
          :filters="{
            cpu,
            memory,
            publicIp: ipv4,
            ssd: disks.reduce((total, disk) => total + disk.size, rootFsSize)
          }"
          v-model="farm"
          v-model:country="country"
        />
      </template>

      <template #env>
        <ExpandableLayout v-model="envs" @add="envs.push({ key: '', value: '' })">
          <template #default="{ index }">
            <input-validator
                :value="envs[index].key"
                :rules="[
                  validators.required('Key name is required.'),
                  validators.validateKey('Key can\'t start with a number, a non-alphanumeric character or a whitespace'),
                  validators.maxLength('Key max length is 128 chars.', 128)
                ]"
              >
              <template #default="{ props }">
                <v-text-field label="Name" v-model="envs[index].key" v-bind="props" />
              </template>
            </input-validator>

            <v-textarea label="Value" v-model="envs[index].value" no-resize :spellcheck="false" />
          </template>
        </ExpandableLayout>
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

    <template #footer-actions>
      <v-btn color="primary" variant="tonal" :disabled="isInvalid" @click="deploy"
        >Deploy</v-btn
      >
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue'
import { generateString } from 'grid3_client'
import type { Farm } from '../types'
import { deployVM, type Disk, type Env } from '../utils/deploy_vm'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import * as validators from '../utils/validators'

const layout = ref()
const tabs = ref()
const profileManager = useProfileManager()

const isConfigValid = ref(false)
const isDisksValid = ref(true)
const isEnvsValid = ref(true)
const isInvalid = computed(() => !isConfigValid.value || !isDisksValid.value || !isEnvsValid.value)

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

const country = ref<string>()
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
    value: profileManager.profile!.ssh
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

async function deploy() {
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
  .then((vm) => {
      layout.value.setStatus('success', 'Successfully deployed a micro virtual machine.')
      layout.value.openDialog(vm, { SSH_KEY: 'Public SSH Key' })
    })
    .catch((error) => {
      const e = typeof error === 'string' ? error : error.message
      layout.value.setStatus('failed', e)
    })
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
