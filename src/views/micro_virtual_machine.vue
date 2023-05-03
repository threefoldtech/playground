<template>
  <MicroVm />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import MicroVm from '../weblets/micro_vm.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'MicroVirtualMachine',
  components: {
    MicroVm,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.VM }
  },
}
</script>
