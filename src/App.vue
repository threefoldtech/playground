<template>
  <v-app>
    <v-navigation-drawer width="280" permanent>
      <v-list>
        <v-list-item title="Home" value="home"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <ProfileManager />
      <DynamicTabs :tabs="tabs" />
      <v-switch label="publicIP" v-model="publicIP" />
      <SelectNodeId v-model="nodeId" :deps="{ publicIp: publicIP }" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import ProfileManager from './weblets/profile_manager.vue'
import DynamicTabs from './components/dynamic-tabs.vue'
import Tab_1 from './components/tab_1.vue'
import Tab_2 from './components/tab_2.vue'
import SelectNodeId from './components/select_node_id.vue'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    ProfileManager,
    DynamicTabs,
    SelectNodeId
  },
  setup() {
    const nodeId = ref<number>(0)
    const title = ref('')
    const publicIP = ref(false)
    const tabs = ref([
      { label: 'Tab 1', component: Tab_1 },
      { label: 'Tab 2', component: Tab_2 }
    ])

    return { nodeId, title, publicIP, tabs }
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
