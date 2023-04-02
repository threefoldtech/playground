<template>
  <v-app>
    <v-navigation-drawer width="280" permanent>
      <v-list>
        <v-list-item title="Home" value="home"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <ProfileManager />
      {{ nodeId }}
      <SelectNodeId v-model="nodeId" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import ProfileManager from './weblets/profile_manager.vue'
import SelectNodeId from './components/select_node_id.vue'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    ProfileManager,
    SelectNodeId
  },
  setup() {
    const nodeId = ref<number>(0)
    const title = ref('')

    return { nodeId, title }
  }
}
</script>

<style lang="scss" global>
.app-link {
  text-decoration: none;
  font-weight: bold;
  color: #0d47a1;
  cursor: pointer;
}
</style>
