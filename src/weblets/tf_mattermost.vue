<template>
  <weblet-layout ref="layout">
    <template #title>Deploy a Mattermost</template>
    <template #subtitle
      >Mattermost is a single point of collaboration. Designed specifically for digital operations.
      <a class="app-link" href="https://manual.grid.tf/weblets/weblets_mattermost.html" target="_blank">
        Quick start documentation
      </a>
      .
    </template>

    <template #default>
      <d-tabs
        :tabs="[
          { title: 'Base', value: 'base' },
          { title: 'SMTP Server', value: 'smtp' },
        ]"
      >
        <template #base>
          <input-validator
            :value="name"
            :rules="[
              validators.required('Name is required.'),
              validators.minLength('Name minLength is 2 chars.', 2),
              validators.maxLength('Name maxLength is 15 chars.', 15),
            ]"
          >
            <template #default="{ props }">
              <v-text-field label="Name" v-model="name" v-bind="props" />
            </template>
          </input-validator>

          <SelectSolutionFlavor />

          <SelectGatewayNode />
          <SelectFarm
            :filters="{
              cpu: 1,
              memory: 1,
              ssd: disks.reduce((total, disk) => total + disk.size, 50),
            }"
            v-model="farm"
          />
        </template>

        <template #smtp>

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
import { normalizeError } from '../utils/helpers'
import { type Farm, ProjectName } from '../types'

const layout = ref()
const tabs = ref()
const profileManager = useProfileManager()

const name = ref('MM' + generateString(8))
const username = ref()
const password = ref(generateString(10))
const domain = ref()
const smtpPassword = ref(generateString(10))
const port = ref(587)
const planetary = ref(true)
const farm = ref() as Ref<Farm>
const disks = ref<Disk[]>([])


async function deploy() {
  layout.value.setStatus('deploy')

  try {
    const grid = await getGrid(profileManager.profile!, ProjectName.Mattermost)

    await layout.value.validateBalance(grid)

    const vm = await deployVM(grid!, {
      name: name.value,
      machines: [
        {
          name: name.value,
          cpu: 1,
          memory: 1,
          flist: "https://hub.grid.tf/tf-official-apps/mattermost-latest.flist",
          entryPoint:"/sbin/zinit init",
          farmId: farm.value.farmID,
          farmName: farm.value.name,
          country: farm.value.country,
          disks: [{ size:1, mountPoint: '/' }, ...disks.value],
          planetary: planetary.value,
          envs: [
            { key: 'SSH_KEY', value: profileManager.profile!.ssh},
            { key: 'DB_PASSWORD', value: password.value },
            { key: 'SITE_URL', value : "https://" + domain.value },
            { key: 'SMTPUsername', value : "https://" + username.value },
            { key: 'SMTPPassword', value : "https://" + smtpPassword.value },
            { key: 'SMTPServer', value : "https://" + port.value },
            { key: 'SMTPPort', value : "https://" + domain.value },
            { key: 'MATTERMOST_DOMAIN', value : "https://" + domain.value }],
          rootFilesystemSize: 2,
        },
      ],
    })

    layout.value.setStatus('success', 'Successfully deployed a Mattermost instance.')
    layout.value.openDialog(vm, { SSH_KEY: 'Public SSH Key' })
  } catch (e) {
    layout.value.setStatus(
      'failed',
      normalizeError(e, 'Failed to deploy a Mattermost instance.')
    )
  }
}
</script>

<script lang="ts">
import SelectFarm from '../components/select_farm.vue'
import SelectSolutionFlavor from '../components/select_solution_flavor.vue'
import SelectGatewayNode from '../components/select_gateway_node.vue'

export default {
  name: 'TFMattermost',
  components: {
    SelectFarm,
    SelectSolutionFlavor,
    SelectGatewayNode,
  },
}
</script>
