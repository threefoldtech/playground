<template>
  <TfKubernetes />

  <div class="mt-4">
    <TfDeploymentList :project-name="name" />
  </div>
</template>

<script lang="ts">
import TfKubernetes from '../weblets/tf_kubernetes.vue'
import TfDeploymentList from '../weblets/tf_deployment_list.vue'
import { ProjectName } from '../types'

export default {
  name: 'KubernetesView',
  components: {
    TfKubernetes,
    TfDeploymentList,
  },
  setup() {
    return { name: ProjectName.Kubernetes }
  },
}
</script>
