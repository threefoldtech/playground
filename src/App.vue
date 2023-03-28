<template>
  <v-app>
    <v-navigation-drawer width="280" permanent>
      <v-list>
        <v-list-item title="Home" value="home"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <ProfileManager />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup></script>

<script lang="ts">
import ProfileManager from './weblets/profile_manager.vue'

export default {
  components: {
    ProfileManager
  }
}
</script>
