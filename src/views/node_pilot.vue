<template>
  <NodePilot />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import NodePilot from '../weblets/tf_node_pilot.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'NodePilotView',
  components: {
    NodePilot,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.NodePilot }
  },
}
</script>
