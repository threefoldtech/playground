<template>
  <tf-casperlabs />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'
import TfCasperlabs from '../weblets/tf_casperlabs.vue'

export default {
  name: 'CasperlabsView',
  components: {
    TfDeploymentList,
    TfCasperlabs,
  },
  setup() {
    return { name: ProjectName.Casperlabs }
  },
}
</script>
