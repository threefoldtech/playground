<template>
  <Subsquid />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import Subsquid from '../weblets/tf_subsquid.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'SubsquidView',
  components: {
    Subsquid,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Subsquid }
  },
}
</script>
