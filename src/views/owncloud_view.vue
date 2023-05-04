<template>
  <TfOwncloud />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TfOwncloud from '../weblets/tf_owncloud.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'MattermostView',
  components: {
    TfOwncloud,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Owncloud }
  },
}
</script>
