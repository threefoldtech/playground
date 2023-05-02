<template>
  <weblet-layout ref="layout">
    <template #title>Deploy a Presearch Instance</template>
    <template #subtitle
      >Presearch is a community-powered, decentralized search engine that provides better results
      while protecting your privacy and rewarding you when you search. This weblet deploys a
      Presearch node. Presearch Nodes are used to process user search requests, and node operators
      earn Presearch PRE tokens for joining and supporting the network.
      <a
        class="app-link"
        href="https://manual.grid.tf/weblets/weblets_presearch.html"
        target="_blank"
      >
        Quick start documentation
      </a>
    </template>

    <template #default>
      <d-tabs
        :tabs="[
          { title: 'Base', value: 'base', invalid: !isBaseValid },
          { title: 'Restore', value: 'restore' }
        ]"
      >
        <template #base>
          <form-validator v-model="isBaseValid">
            <template #default="{ form }">
              <input-validator
                v-bind="form"
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
                v-bind="form"
                :value="code"
                :rules="[
                  validators.required('Presearch registration code is required.'),
                  validators.equal('Presearch registration code must be 32 characters long.', 32)
                ]"
              >
                <template #default="{ props }">
                  <password-input-wrapper>
                    <v-text-field
                      label="Presearch Registeration Code"
                      v-bind="props"
                      v-model="code"
                    />
                  </password-input-wrapper>
                </template>
              </input-validator>

              <v-switch color="primary" inset label="Public IPv4" v-model="ipv4" />
              <v-switch color="primary" inset label="Planetary Network" v-model="planetary" />

              <SelectFarm
                :filters="{
                  cpu,
                  memory,
                  ssd: rootFsSize,
                  publicIp: ipv4
                }"
                v-model="farm"
                v-model:country="country"
                :form="form"
              />
            </template>
          </form-validator>
        </template>

        <template #restore>
          <v-textarea
            label="Private Presearch Restore Key"
            v-model="privateRestoreKey"
            no-resize
            :spellcheck="false"
          />
          <v-textarea
            label="Public Presearch Restore Key"
            v-model="publicRestoreKey"
            no-resize
            :spellcheck="false"
          />
        </template>
      </d-tabs>
    </template>
    <template #footer-actions>
      <v-btn color="primary" variant="tonal" :disabled="isInvalid" @click="deploy"> Deploy </v-btn>
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { computed, ref, type Ref } from 'vue'
import { generateString } from '@threefold/grid_client'
import type { Farm } from '../types'
import { deployVM } from '../utils/deploy_vm'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import rootFs from '../utils/root_fs'
import * as validators from '../utils/validators'

const layout = ref()
const profileManager = useProfileManager()
const name = ref('PS' + generateString(8))
const code = ref() as Ref<string>
const ipv4 = ref(false)
const planetary = ref(true)
const cpu = 4
const memory = 8192
const rootFsSize = rootFs(cpu, memory)
const farm = ref() as Ref<Farm>
const privateRestoreKey = ref('') as Ref<string>
const publicRestoreKey = ref('') as Ref<string>
const isBaseValid = ref(false)
const isInvalid = computed(() => !isBaseValid.value)
const country = ref<string>()

async function deploy() {
  const grid = await getGrid(profileManager.profile!)

  layout.value.setStatus('deploy')
  deployVM(grid!, {
    name: name.value,
    machines: [
      {
        name: name.value,
        cpu: cpu,
        memory: memory,
        flist: 'https://hub.grid.tf/tf-official-apps/presearch-v2.2.flist',
        entryPoint: '/sbin/zinit init',
        farmId: farm.value.farmID,
        farmName: farm.value.name,
        planetary: planetary.value,
        publicIpv4: ipv4.value,
        country: country.value,
        envs: [
          {
            key: 'SSH_KEY',
            value: profileManager.profile!.ssh
          },
          {
            key: 'PRESEARCH_REGISTRATION_CODE',
            value: code.value
          },
          {
            key: 'PRESEARCH_BACKUP_PRI_KEY',
            value: privateRestoreKey.value
          },
          {
            key: 'PRESEARCH_BACKUP_PUB_KEY',
            value: publicRestoreKey.value
          }
        ]
      }
    ]
  })
    .then((vm) => {
      layout.value.setStatus('success', 'Successfully deployed a Presearch instance.')
      layout.value.openDialog(vm, { SSH_KEY: 'Public SSH Key' })
    })
    .catch((error) => {
      const e = typeof error === 'string' ? error : error.message
      layout.value.setStatus('failed', e)
    })
}
</script>

<script lang="ts">
import SelectFarm from '../components/select_farm.vue'

export default {
  name: 'TFPresearch',
  components: {
    SelectFarm
  }
}
</script>
