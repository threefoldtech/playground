<template>
  <TfCaprover />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TfCaprover from '../weblets/tf_caprover.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'CaproverView',
  components: {
    TfCaprover,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Caprover }
  },
}
</script>
