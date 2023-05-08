<template>
  <TfDiscourse />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import TfDiscourse from '../weblets/tf_discourse.vue'
import { ProjectName } from '../types'

export default {
  name: 'DiscourseView',
  components: {
    TfDeploymentList,
    TfDiscourse,
  },
  setup() {
    return { name: ProjectName.Discourse }
  },
}
</script>
