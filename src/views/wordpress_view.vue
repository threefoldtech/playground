<template>
  <TFWordpress />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TFWordpress from '../weblets/tf_wordpress.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'WordpressView',
  components: {
    TFWordpress,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Wordpress }
  },
}
</script>
