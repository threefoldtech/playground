<template>
  <v-app>
    <v-navigation-drawer width="280" permanent>
      <v-list>
        <v-list-item>
          <v-img src="/images/logoTF.png" />
        </v-list-item>
        <v-list-item>
          <v-card color="primary">
            <v-card-text class="text-center">{{ network.toLocaleUpperCase() }}NET</v-card-text>
          </v-card>
        </v-list-item>

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
              <v-img
                class="mr-4"
                width="26"
                :src="'/images/icons/' + item.icon"
                :alt="item.title"
              />
            </template>

            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <DisclaimerToolbar />
        <div class="my-4 d-flex justify-end">
          <ProfileManager />
        </div>
        <router-view />
      </v-container>
      <DeploymentDataDialog
        :data="x"
        :environments="{ SSH_KEY: 'Public SSH Key', K3S_URL: false }"
      />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
watch(
  () => route.meta,
  (meta) => (document.title = 'TF Playground' + (meta && 'title' in meta ? ` | ${meta.title}` : ``))
)

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

// eslint-disable-next-line no-undef
const network = process.env.NETWORK as string

const x = {
  masters: [
    {
      version: 0,
      contractId: 8782,
      nodeId: 19,
      name: 'MR27f7f2cc',
      created: 1681832235,
      status: 'ok',
      message: '',
      flist: 'https://hub.grid.tf/tf-official-apps/threefoldtech-k3s-latest.flist',
      publicIP: null,
      planetary: '300:3f07:4d4f:f726:4d54:8187:55ed:887c',
      interfaces: [
        {
          network: 'NW45f93c45',
          ip: '10.20.4.2'
        }
      ],
      capacity: {
        cpu: 2,
        memory: 4096
      },
      mounts: [
        {
          name: 'MR27f7f2cc_disk',
          mountPoint: '/mnt/data',
          size: 107374182400,
          state: 'ok',
          message: ''
        }
      ],
      env: {
        SSH_KEY:
          'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJheWbxEEvk8vPUcLU1sbKa1Kny8aqaN+7uQ/hxXI4ZM engm5081@gmail.com',
        K3S_TOKEN: '2aceb493',
        K3S_DATA_DIR: '/mnt/data',
        K3S_FLANNEL_IFACE: 'eth0',
        K3S_NODE_NAME: 'MR27f7f2cc',
        K3S_URL: ''
      },
      entrypoint: '/sbin/zinit init',
      metadata: '{"type":"kubernetes","name":"K8Sdbac19fc","projectName":"Kubernetes"}',
      description: '',
      rootfs_size: 2147483648,
      corex: false
    }
  ],
  workers: []
}
</script>

<script lang="ts">
import DisclaimerToolbar from './components/disclaimer_toolbar.vue'
import ProfileManager from './weblets/profile_manager.vue'
import DeploymentDataDialog from './components/deployment_data_dialog.vue'

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
  name: 'App',
  components: {
    DisclaimerToolbar,
    ProfileManager,
    DeploymentDataDialog
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
