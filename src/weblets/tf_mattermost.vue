<template>
  <weblet-layout ref="layout">
    <template #title>Deploy a Mattermost Instance </template>
    <template #subtitle>
      Mattermost A single point of collaboration. Designed specifically for digital operations.
      <a
        target="_blank"
        href="https://library.threefold.me/info/manual/#/manual__weblets_mattermost"
        class="app-link"
      >
        Quick start documentation
      </a>
    </template>

    <d-tabs
      :tabs="[
        { title: 'Base', value: 'base' },
        { title: 'SMTP Server', value: 'smtp' },
      ]"
      ref="tabs"
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

        <SelectSolutionFlavor v-model="solution" />
        <SelectGatewayNode v-model="gateway" />
        <SelectFarm
          :filters="{
            cpu: solution?.cpu,
            memory: solution?.memory,
            ssd: solution?.disk,
            publicIp: false,
          }"
          v-model="farm"
        />
      </template>

      <template #smtp>
        <SmtpServer v-model="smtp" />
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
import { generateString } from '@threefold/grid_client'
import { type Ref, ref } from 'vue'
import type { solutionFlavor as SolutionFlavor, Farm, GatewayNode } from '../types'
import * as validators from '../utils/validators'
import { ProjectName } from '../types'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import { deployGatewayName, rollbackDeployment } from '../utils/gateway'

const layout = ref()
const tabs = ref()
const profileManager = useProfileManager()

const name = ref('MM' + generateString(9))
const solution = ref() as Ref<SolutionFlavor>
const gateway = ref() as Ref<GatewayNode>
const farm = ref() as Ref<Farm>

const smtp = ref(createSMTPServer())

async function deploy() {
  /* script */
}
</script>

<script lang="ts">
import SelectSolutionFlavor from '../components/select_solution_flavor.vue'
import SelectGatewayNode from '../components/select_gateway_node.vue'
import SelectFarm from '../components/select_farm.vue'
import SmtpServer, { createSMTPServer } from '../components/smtp_server.vue'

export default {
  name: 'TfMattermost',
  components: {
    SmtpServer,
    SelectSolutionFlavor,
    SelectGatewayNode,
    SelectFarm,
  },
}
</script>
