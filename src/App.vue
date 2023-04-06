<template>
  <v-app>
    <v-navigation-drawer width="280" permanent>
      <v-list>
        <v-list-item title="Home" value="home"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <ProfileManager />
      <QrcodeGenerator data="data" />
      <SelectGateWayNode />
      <v-switch label="publicIP" v-model="publicIP" />
      <!-- <SelectNodeId v-model="nodeId" :deps="{ publicIp: publicIP }" /> -->
    </v-main>
  </v-app>
</template>

<script lang="ts">
import ProfileManager from './weblets/profile_manager.vue'
import QrcodeGenerator from './components/qrcode_generator.vue'
import SelectGateWayNode from './components/select_gateway_node.vue'
import SelectNodeId from './components/select_node_id.vue'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    ProfileManager,
    QrcodeGenerator,
    SelectGateWayNode,
  
  },
  setup() {
    const nodeId = ref<number>(0)
    const title = ref('')
    const publicIP = ref(false)

    return { nodeId, title, publicIP }
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
