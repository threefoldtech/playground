<template>
  <TfUmbrel />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TfUmbrel from '../weblets/tf_umbrel.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'UmbrelView',
  components: {
    TfUmbrel,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Umbrel }
  },
}
</script>
