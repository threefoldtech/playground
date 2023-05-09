<template>
  <TfAlgorand />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TfAlgorand from '../weblets/tf_algorand.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'AlgorandView',
  components: {
    TfAlgorand,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Algorand }
  },
}
</script>
