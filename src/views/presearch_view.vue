<template>
  <Presearch />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang='ts'>

import Presearch from '../weblets/tf_presearch.vue';
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'


export default {
  name:"PresearchView",
  components: {
    Presearch,
    TfDeploymentList
  },
  setup() {
    return { name: ProjectName.Presearch }
  },
}

</script>
