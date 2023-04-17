<template>
 <weblet-layout>
  <template #title>Deploy a Presearch Instance</template>
    <template #subtitle
      >Presearch is a community-powered, decentralized search engine that provides better results while protecting your privacy and rewarding you when you search. This weblet deploys a Presearch node. Presearch Nodes are used to process user search requests, and node operators earn Presearch PRE tokens for joining and supporting the network. 
      <a
        class="app-link"
        href="https://manual.grid.tf/weblets/weblets_presearch.html"
        target="_blank"
      >
        Quick start documentation
      </a>
    </template>


    <d-tabs 
      :tabs="[
        { title: 'Base', value: 'base' },
        { title: 'Restore', value: 'restore' }
      ]"
    >
      <template #base>
        <v-text-field label="Name" v-model="name" />

        <password-input-wrapper>
          <template #default="{ props }">
            <v-text-field label="Presearch Registeration Code" v-bind="props" v-model="code" />
          </template>
        </password-input-wrapper>


        <v-switch color="primary" inset label="Public IPv4" v-model="ipv4" />
        <v-switch color="primary" inset label="Planetary Network" v-model="planetary" />
        <SelectFarm
          :filters="{
            cpu,
            memory,
            ssd: rootFsSize
          }"
          v-model="farm"
        />
      </template>


      <template #restore>
        <v-textarea label="Private Presearch Restore Key" v-model="envs[1].value" no-resize :spellcheck="false" />
        <v-textarea label="Public Presearch Restore Key" v-model="envs[2].value" no-resize :spellcheck="false" />
      </template>

    </d-tabs>
    <template #footer-actions>
      <v-btn color="primary" variant="tonal" :loading="loading" :disabled="loading" @click="deploy">
        Deploy
      </v-btn>
    </template>
 </weblet-layout>
</template>

<script lang='ts' setup>
import { ref, type Ref } from 'vue'
import { generateString } from 'grid3_client'
import type { Farm } from '../types'
import { deployVM, type Env } from '../utils/deploy_vm'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import rootFs from "../utils/root_fs"


const profileManager = useProfileManager()
const name = ref('PS' + generateString(8))
const code = ref() as Ref<string>
const ipv4 = ref(false)
const planetary = ref(true)
const cpu = 4
const memory = 8192
const rootFsSize = rootFs(cpu, memory)
const farm = ref() as Ref<Farm>
const loading = ref(false)
const privateRestoreKey = ref() as Ref<string>
const publicRestoreKey = ref() as Ref<string>
const envs = ref<Env[]>([
  {
    key: "SSH_KEY",
    value: profileManager.profile!.ssh
  },
  {
    key: "PRESEARCH_REGISTRATION_CODE",
    value: code.value
  },
  {
    key: "PRESEARCH_BACKUP_PRI_KEY",
    value: privateRestoreKey.value
  },
  {
    key: "PRESEARCH_BACKUP_PUB_KEY",
    value: publicRestoreKey.value
  },
])


async function deploy() {
  loading.value = true
  const grid = await getGrid(profileManager.profile!)

  deployVM(grid!, {
    name: name.value,
    machines: [
      {
        name: name.value,
        cpu: cpu,
        memory: memory,
        flist: "https://hub.grid.tf/tf-official-apps/presearch-v2.2.flist",
        entryPoint: "/sbin/zinit init",
        farmId: farm.value.farmID,
        farmName: farm.value.name,
        planetary: planetary.value,
        publicIpv4: ipv4.value,
        envs: envs.value,
      }
    ]
  })
    .then(console.log)
    .catch(console.log)
    .finally(() => (loading.value = false))
}
</script>

<script lang='ts'>
  import SelectFarm from '../components/select_farm.vue'

  export default {
    name: 'TFPresearch',
    components: {
      SelectFarm,
    }
  }
</script>