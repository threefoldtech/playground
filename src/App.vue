<template>
  <v-app>
    <v-navigation-drawer width="280" permanent>
      <v-list>
        <template v-for="route in routes" :key="route.title">
          <v-list-subheader>{{ route.title }}</v-list-subheader>

          <v-list-item
            v-for="item in route.items"
            :key="item.route"
            :value="item.route"
            @click="$router.push(item.route)"
            active-color="primary"
            :active="$route.path === item.route"
          >
            <template v-slot:prepend v-if="item.icon">
              <v-img class="mr-4" width="28" :src="'/images/icons/' + item.icon" />
            </template>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main> </v-main>
  </v-app>
</template>

<script lang="ts" setup>
const routes: AppRoute[] = [
  {
    title: 'DEPLOYMENTS',
    items: [
      { title: 'Full Virtual Machine', icon: 'vm.png', route: '/' },
      { title: 'Micro Virtual Machine', icon: 'vm.png', route: '/vm' },
      { title: 'Kubernetes', icon: 'kubernetes.png', route: '/kubernetes' },
      { title: 'CapRover', icon: 'caprover.png', route: '/caprover' },
      { title: 'Peertube', icon: 'peertube.png', route: '/peertube' },
      { title: 'Funkwhale', icon: 'funkwhale.png', route: '/funkwhale' },
      { title: 'Mattermost', icon: 'mattermost.png', route: '/mattermost' },
      { title: 'Discourse', icon: 'discourse.png', route: '/discourse' },
      { title: 'Taiga', icon: 'taiga.png', route: '/taiga' },
      { title: 'Owncloud', icon: 'owncloud.png', route: '/owncloud' },
      { title: 'Presearch', icon: 'presearch.png', route: '/presearch' },
      { title: 'Subsquid', icon: 'subsquid.png', route: '/subsquid' },
      { title: 'Casperlabs', icon: 'casperlabs.png', route: '/casperlabs' },
      { title: 'Algorand', icon: 'algorand.png', route: '/algorand' },
      { title: 'Node Pilot', icon: 'vm.png', route: '/nodepilot' },
      { title: 'Wordpress', icon: 'wordpress.png', route: '/wordpress' },
      { title: 'Umbrel', icon: 'umbrel.png', route: '/umbrel' }
    ]
  },
  {
    title: 'MY ACCOUNT',
    items: [
      { title: 'Contracts', route: '/contractslist' },
      { title: 'Deployments', route: '/deployedlist' }
    ]
  }
]
</script>

<script lang="ts">
interface AppRoute {
  title: string
  items: AppRouteItem[]
}

interface AppRouteItem {
  title: string
  route: string
  icon?: string
}
export default {
  name: 'App'
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
