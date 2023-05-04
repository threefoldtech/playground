<template>
  <TfMattermost />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TfMattermost from '../weblets/tf_mattermost.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'MattermostView',
  components: {
    TfMattermost,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Mattermost }
  },
}
</script>
