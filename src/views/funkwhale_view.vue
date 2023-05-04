<template>
  <TfFunkwhale />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TfFunkwhale from '../weblets/tf_funkwhale.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'FunkwhaleView',
  components: {
    TfFunkwhale,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Funkwhale }
  },
}
</script>
