<template>
  <v-app>
    <v-navigation-drawer width="280" permanent>
      <v-list>
        <v-list-item title="Home" value="home"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <ProfileManager />
      <v-switch label="publicIP" v-model="publicIP" />
      <SelectFarm v-model="farm" :filters="{ publicIp: publicIP, cpu: 5000000000 }" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import ProfileManager from './weblets/profile_manager.vue'
import SelectFarm, { type Farm } from './components/select_farm.vue'
import { ref } from 'vue'

export default {
  name: 'App',
  components: {
    ProfileManager,
    SelectFarm
  },
  setup() {
    const farm = ref<Farm>()
    const title = ref('')
    const publicIP = ref(true)

    return { farm, title, publicIP }
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
