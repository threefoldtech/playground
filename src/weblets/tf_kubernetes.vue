<template>
  <weblet-layout>
    <template #title>Deploy a Kubernetes</template>
    <template #subtitle
      >Kubernetes is the standard container orchestration tool. On the TF grid, Kubernetes clusters
      can be deployed out of the box. We have implemented K3S, a full-blown Kubernetes offering that
      uses only half of the memory footprint. It is packaged as a single binary and made more
      lightweight to run workloads in resource-constrained locations (fits e.g. IoT, edge, ARM
      workloads).
      <a href="https://manual.grid.tf/weblets/weblets_k8s.html" target="_blank" class="app-link">
        Quick start documentation
      </a>
    </template>

    <template #default>
      <d-tabs
        :tabs="[
          { title: 'Config', value: 'config' },
          { title: 'Master', value: 'master' },
          { title: 'Workers', value: 'workers' }
        ]"
      >
        <template #config>
          <v-text-field label="Name" v-model="name" />
          <password-input-wrapper>
            <template #default="{ props }">
              <v-text-field label="Cluster Token" v-bind="props" v-model="clusterToken" />
            </template>
          </password-input-wrapper>
        </template>

        <template #master>
          <K8SWorker v-model="master" />
        </template>

        <template #workers>
          <ExpandableLayout v-model="workers" @add="addWorker">
            <template #default="{ index }">
              <K8SWorker v-model="workers[index]" />
            </template>
          </ExpandableLayout>
        </template>
      </d-tabs>
    </template>

    <template #footer-actions>
      <v-btn variant="tonal" color="primary" @click="deploy"> Deploy </v-btn>
    </template>
  </weblet-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { generateString } from 'grid3_client'
import { createWorker } from '../components/k8s_worker.vue'
import type { K8SWorker as K8sWorker } from '../types'
import { useProfileManager } from '../stores'
import { getGrid } from '../utils/grid'
import { deployK8s } from '../utils/deploy_k8s'

const profileManager = useProfileManager()

const name = ref('K8S' + generateString(8))
const clusterToken = ref(generateString(10))
const master = ref(createWorker('MR' + generateString(9)))
const workers = ref<K8sWorker[]>([])

function addWorker() {
  workers.value.push(createWorker())
}

async function deploy() {
  const grid = await getGrid(profileManager.profile!)
  deployK8s(grid!, {
    name: name.value,
    clusterToken: clusterToken.value,
    master: master.value!,
    workers: workers.value!,
    sshKey: profileManager.profile!.ssh
  })
    .then(console.log)
    .catch(console.log)
}
</script>

<script lang="ts">
import K8SWorker from '../components/k8s_worker.vue'
import ExpandableLayout from '../components/expandable_layout.vue'

export default {
  name: 'TfKubernetes',
  components: {
    K8SWorker,
    ExpandableLayout
  }
}
</script>
