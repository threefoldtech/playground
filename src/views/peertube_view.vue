<template>
  <TfPeertube />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TfPeertube from '../weblets/tf_peertube.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'PeertubeView',
  components: {
    TfPeertube,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Peertube }
  },
}
</script>
