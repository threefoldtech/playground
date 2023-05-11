<template>
  <weblet-layout ref="layout">
    <template #title>Deploy a Peertube Instance</template>
    <template #subtitle>
      Peertube aspires to be a decentralized and free/libre alternative to video broadcasting
      services.
      <a
        target="_blank"
        href="https://library.threefold.me/info/manual/#/manual__weblets_peertube"
        class="app-link"
      >
        Quick start documentation
      </a>
    </template>

    <form-validator v-model="valid">
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

      <input-validator
        :value="email"
        :rules="[
          validators.required('Email is required.'),
          validators.isEmail('Please provide a valid email address.'),
        ]"
      >
        <template #default="{ props }">
          <v-text-field label="Admin Email" v-model="email" v-bind="props" />
        </template>
      </input-validator>

      <password-input-wrapper>
        <template #default="{ props }">
          <input-validator
            :value="password"
            :rules="[
              validators.required('Password is required.'),
              validators.minLength('Password minLength is 6 chars.', 6),
              validators.maxLength('Password maxLength is 15 chars.', 15),
            ]"
          >
            <template #default="{ props: validatorProps }">
              <v-text-field
                label="Password"
                v-model="password"
                v-bind="{ ...props, ...validatorProps }"
              />
            </template>
          </input-validator>
        </template>
      </password-input-wrapper>

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
    </form-validator>

    <template #footer-actions>
      <v-btn color="primary" variant="tonal" @click="deploy" :disabled="!valid"> Deploy </v-btn>
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import { generateString, GridClient } from '@threefold/grid_client'
import type { solutionFlavor as SolutionFlavor, Farm, GatewayNode } from '../types'
import { ProjectName } from '../types'
import { useProfileManager } from '../stores'
import { deployVM } from '../utils/deploy_vm'
import { deployGatewayName, getSubdomain, rollbackDeployment } from '../utils/gateway'
import { useLayout } from '../components/weblet_layout.vue'

const layout = useLayout()
const valid = ref(false)
const profileManager = useProfileManager()

const name = ref('PT' + generateString(9))
const email = ref('')
const password = ref(generateString(12))
const solution = ref() as Ref<SolutionFlavor>
const gateway = ref() as Ref<GatewayNode>
const farm = ref() as Ref<Farm>

async function deploy() {
  layout.value.setStatus('deploy')

  const projectName = ProjectName.Peertube.toLowerCase()

  const subdomain = getSubdomain({
    deploymentName: name.value,
    projectName,
    twinId: profileManager.profile!.twinId,
  })
  const domain = subdomain + '.' + gateway.value.domain

  let grid: GridClient | null
  let vm: any

  try {
    grid = await getGrid(profileManager.profile!, projectName)

    await layout.value.validateBalance(grid!)

    vm = await deployVM(grid!, {
      name: name.value,
      machines: [
        {
          name: name.value,
          cpu: solution.value.cpu,
          memory: solution.value.memory,
          disks: [
            {
              size: solution.value.disk,
              mountPoint: '/data',
            },
          ],
          flist: 'https://hub.grid.tf/tf-official-apps/peertube-v3.1.1.flist',
          entryPoint: '/sbin/zinit init',
          farmId: farm.value.farmID,
          farmName: farm.value.name,
          country: farm.value.country,
          planetary: true,
          envs: [
            { key: 'SSH_KEY', value: profileManager.profile!.ssh },
            { key: 'PEERTUBE_ADMIN_EMAIL', value: email.value },
            { key: 'PT_INITIAL_ROOT_PASSWORD', value: password.value },
            { key: 'PEERTUBE_WEBSERVER_HOSTNAME', value: domain },
          ],
        },
      ],
    })
  } catch (e) {
    return layout.value.setStatus(
      'failed',
      normalizeError(e, 'Failed to deploy a peertube instance.')
    )
  }

  try {
    layout.value.setStatus('deploy', 'Preparing to deploy gateway...')

    await deployGatewayName(grid!, {
      name: subdomain,
      nodeId: gateway.value.id,
      backends: [`http://[${vm[0].planetary}]:9000`],
    })

    layout.value.reloadDeploymentsList()
    layout.value.setStatus('success', 'Successfully deployed a peertube instance.')
    layout.value.openDialog(vm, {
      SSH_KEY: 'Public SSH Key',
      PEERTUBE_ADMIN_EMAIL: 'Peertube Admin Email',
      PT_INITIAL_ROOT_PASSWORD: 'Peertube Initial Root Password',
      PEERTUBE_WEBSERVER_HOSTNAME: 'Peertube Webserver Hostname',
    })
  } catch (e) {
    layout.value.setStatus('deploy', 'Rollbacking back due to fail to deploy gateway...')

    await rollbackDeployment(grid!, name.value)
    layout.value.setStatus('failed', normalizeError(e, 'Failed to deploy a peertube instance.'))
  }
}
</script>

<script lang="ts">
import SelectSolutionFlavor from '../components/select_solution_flavor.vue'
import SelectGatewayNode from '../components/select_gateway_node.vue'
import SelectFarm from '../components/select_farm.vue'
import { normalizeError } from '../utils/helpers'
import { getGrid } from '../utils/grid'

export default {
  name: 'TfPeertube',
  components: {
    SelectSolutionFlavor,
    SelectGatewayNode,
    SelectFarm,
  },
}
</script>
