<template>
  <FullVm />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import FullVm from '../weblets/full_vm.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'FullVirtualMachine',
  components: {
    FullVm,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Fullvm }
  },
}
</script>
