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
    </v-main>
  </v-app>
</template>

<script lang="ts">
import ProfileManager from './weblets/profile_manager.vue'
import QrcodeGenerator from './components/qrcode_generator.vue'

export default {
  name: 'App',
  components: {
    ProfileManager,
    QrcodeGenerator
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
