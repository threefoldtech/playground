<template>
  <weblet-layout ref="layout">
    <template #title>Deployment List</template>

    <d-tabs :tabs="tabs" v-model="activeTab" :disabled="loading" destroy>
      <template #default>
        <VmDeploymentTable
          :projectName="tabs[activeTab].value"
          v-model="selectedItems"
          :deleting="false"
        >
          <template #Fullvm-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                })
              "
            />
          </template>

          <template #VM-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                })
              "
            />
          </template>

          <template #CapRover-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SWM_NODE_MODE: 'Swarm Node Mode',
                  PUBLIC_KEY: 'Public SSH Key',
                  CAPROVER_ROOT_DOMAIN: false,
                  CAPTAIN_IMAGE_VERSION: 'Captain Image Version',
                  DEFAULT_PASSWORD: 'Default Password',
                  CAPTAIN_IS_DEBUG: 'Debug Mode',
                })
              "
            />
            <IconActionBtn
              tooltip="Admin Panel"
              color="info"
              icon="mdi-view-dashboard"
              :href="'http://captain.' + item.value[0].env.CAPROVER_ROOT_DOMAIN"
            />
            <IconActionBtn
              icon="mdi-cog"
              tooltip="Manage Workers"
              color="secondary"
              @click="dialog = true"
            />

            <ManageCaproverWorkerDialog
              v-if="dialog"
              :master="item.value[0]"
              :data="item.value.slice(1)"
              @close="dialog = false"
              @update:caprover="item.value = $event"
            />
          </template>

          <template #Peertube-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                  PEERTUBE_ADMIN_EMAIL: 'Peertube Admin Email',
                  PT_INITIAL_ROOT_PASSWORD: 'Peertube Initial Root Password',
                  PEERTUBE_WEBSERVER_HOSTNAME: 'Peertube Webserver Hostname',
                })
              "
            />
            <IconActionBtn
              tooltip="Preview"
              color="info"
              icon="mdi-web"
              :href="'https://' + item.value[0].env.PEERTUBE_WEBSERVER_HOSTNAME"
            />
          </template>

          <template #Funkwhale-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  FUNKWHALE_HOSTNAME: 'Funkwhale Hostname',
                  DJANGO_SUPERUSER_EMAIL: 'Django Superuser Email',
                  DJANGO_SUPERUSER_USERNAME: 'Diango Superuser Username',
                  DJANGO_SUPERUSER_PASSWORD: 'Django Superuser Password',
                })
              "
            />
            <IconActionBtn
              tooltip="Preview"
              color="info"
              icon="mdi-web"
              :href="'https://' + item.value[0].env.FUNKWHALE_HOSTNAME"
            />
          </template>

          <template #Taiga-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                  DOMAIN_NAME: 'Domain Name',
                  ADMIN_USERNAME: 'Admin Username',
                  ADMIN_PASSWORD: 'Admin Password',
                  ADMIN_EMAIL: 'Admin Email',
                  DEFAULT_FROM_EMAIL: 'Default Form Email',
                  EMAIL_USE_TLS: 'Email Use TLS',
                  EMAIL_USE_SSL: 'Email Use SSL',
                  EMAIL_HOST: 'Email Host',
                  EMAIL_PORT: 'Email Port',
                  EMAIL_HOST_USER: 'Email Host User',
                  EMAIL_HOST_PASSWORD: 'Email Host Password',
                })
              "
            />
            <IconActionBtn
              tooltip="Admin Panel"
              color="info"
              icon="mdi-view-dashboard"
              :href="'http://' + item.value[0].env.DOMAIN_NAME + '/admin/'"
            />
            <IconActionBtn
              tooltip="Preview"
              color="secondary"
              icon="mdi-web"
              :href="'https://' + item.value[0].env.DOMAIN_NAME"
            />
          </template>

          <template #Presearch-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                  PRESEARCH_REGISTRATION_CODE: 'Presearch Registration Code',
                  PRESEARCH_BACKUP_PRI_KEY: 'Presearch Backup Private Key',
                  PRESEARCH_BACKUP_PUB_KEY: 'Presearch Backup Public Key',
                })
              "
            />
          </template>

          <template #Mattermost-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  DB_PASSWORD: 'Database Password',
                  SITE_URL: 'Site URL',
                  SMTPUsername: 'SMTP Username',
                  SMTPPassword: 'SMTP Password',
                  SMTPServer: 'SMTP Server',
                  SMTPPort: 'SMTP Port',
                  SSH_KEY: 'Public SSH Key',
                  MATTERMOST_DOMAIN: 'Mattermost Domain',
                })
              "
            />
            <IconActionBtn
              tooltip="Preview"
              color="info"
              icon="mdi-web"
              :href="item.value[0].env.SITE_URL"
            />
          </template>

          <template #Discourse-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                  DISCOURSE_HOSTNAME: 'Discourse Hostname',
                  DISCOURSE_DEVELOPER_EMAILS: 'Discourse Developer Emails',
                  DISCOURSE_SMTP_ADDRESS: 'Discourse SMTP Address',
                  DISCOURSE_SMTP_PORT: 'Discourse SMTP Port',
                  DISCOURSE_SMTP_ENABLE_START_TLS: 'Discourse SMTP Enable Start TLS',
                  DISCOURSE_SMTP_USER_NAME: 'Discourse SMTP Username',
                  DISCOURSE_SMTP_PASSWORD: 'Discourse SMTP Password',
                  THREEBOT_PRIVATE_KEY: 'Threebot Private Key',
                  FLASK_SECRET_KEY: 'Flask Secret Key',
                })
              "
            />
            <IconActionBtn
              tooltip="Preview"
              color="info"
              icon="mdi-web"
              :href="'https://' + item.value[0].env.DISCOURSE_HOSTNAME"
            />
          </template>

          <template #Casperlabs-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                  CASPERLABS_HOSTNAME: 'Casperlabs Hostname',
                })
              "
            />
            <IconActionBtn
              tooltip="Preview"
              color="info"
              icon="mdi-web"
              :href="'https://' + item.value[0].env.CASPERLABS_HOSTNAME"
            />
          </template>

          <template #Owncloud-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                  OWNCLOUD_DOMAIN: 'Owncloud Domain',
                  OWNCLOUD_ADMIN_USERNAME: 'Owncloud Admin Username',
                  OWNCLOUD_ADMIN_PASSWORD: 'Owncloud Admin Password',
                  OWNCLOUD_MAIL_SMTP_SECURE: 'Owncloud Mail SMTP Secure',
                  OWNCLOUD_MAIL_DOMAIN: 'Owncloud Mail Domain',
                  OWNCLOUD_MAIL_FROM_ADDRESS: 'Owncloud Mail From Address',
                  OWNCLOUD_MAIL_SMTP_HOST: 'Owncloud Mail SMTP Host',
                  OWNCLOUD_MAIL_SMTP_PORT: 'Owncloud Mail SMTP Port',
                  OWNCLOUD_MAIL_SMTP_NAME: 'Owncloud Mail SMTP Name',
                  OWNCLOUD_MAIL_SMTP_PASSWORD: 'Owncloud Mail SMTP Password',
                })
              "
            />
            <IconActionBtn
              tooltip="Preview"
              color="info"
              icon="mdi-web"
              :href="'https://' + item.value[0].env.OWNCLOUD_DOMAIN"
            />
          </template>

          <template #Subsquid-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                  CHAIN_ENDPOINT: 'Chain Endpoint',
                  SUBSQUID_WEBSERVER_HOSTNAME: 'Subsquid Webserver Hostname',
                })
              "
            />
            <IconActionBtn
              tooltip="Preview"
              color="info"
              icon="mdi-web"
              :href="'https://' + item.value[0].env.SUBSQUID_WEBSERVER_HOSTNAME + '/graphql'"
            />
          </template>

          <template #NodePilot-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                })
              "
            />
            <IconActionBtn
              tooltip="PreviewK8SWorker"
              color="info"
              icon="mdi-web"
              :href="'https://' + item.value[0].publicIP.ip.slice(0, -3)"
            />
          </template>

          <template #Umbrel-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                  USERNAME: 'Username',
                  PASSWORD: 'Password',
                  UMBREL_DISK: 'Umbrel Disk',
                })
              "
            />
            <IconActionBtn
              tooltip="Admin Panel"
              color="info"
              icon="mdi-view-dashboard"
              :href="
                'http://' +
                (item.value[0].publicIP?.ip
                  ? item.value[0].publicIP.ip.slice(0, -3)
                  : '[' + item.value[0].planetary + ']')
              "
            />
          </template>

          <template #Wordpress-actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                  MYSQL_USER: 'Mysql User',
                  MYSQL_PASSWORD: 'Mysql Password',
                  ADMIN_EMAIL: 'Admin Email',
                  WP_URL: 'WP URL',
                })
              "
            />
            <IconActionBtn
              tooltip="Preview"
              color="info"
              icon="mdi-web"
              :href="item.value[0].env.WP_URL"
            />
            <IconActionBtn
              tooltip="Admin Panel"
              color="secondary"
              icon="mdi-view-dashboard"
              :href="item.value[0].env.WP_URL + '/wp-admin'"
            />
          </template>
        </VmDeploymentTable>
      </template>

      <template #Kubernetes>
        <K8sDeploymentTable
          :projectName="tabs[activeTab].value"
          v-model="selectedItems"
          :deleting="false"
        >
          <template #actions="{ item }">
            <IconActionBtn
              tooltip="Show Details"
              icon="mdi-information-outline"
              @click="
                layout.openDialog(item?.value, {
                  SSH_KEY: 'Public SSH Key',
                  K3S_TOKEN: 'K3S Token',
                  K3S_DATA_DIR: 'K3S Data Directory',
                  K3S_FLANNEL_IFACE: 'K3S Flannel Iface',
                  K3S_NODE_NAME: 'K3S Node Name',
                  K3S_URL: 'K3S URL',
                })
              "
            />
            <IconActionBtn
              icon="mdi-cog"
              tooltip="Manage Workers"
              color="secondary"
              @click="dialog = true"
            />

            <ManageK8SWorkerDialog
              v-if="dialog"
              :data="item.value"
              @close="dialog = false"
              @update:k8s="item.value.workers = $event.workers"
            />
          </template>
        </K8sDeploymentTable>
      </template>
    </d-tabs>

    <template #footer-actions>
      <v-btn color="error" variant="outlined">Delete</v-btn>
    </template>
  </weblet-layout>

  <!-- <ManageK8SWorkerDialog
    v-if="dialog && tabs[activeTab].value === 'Kubernetes'"
    name="VM62bb35e3"
    @close=""
    :data="{ masters: [], workers: [{}] }"
  /> -->
</template>

<script lang="ts" setup>
import { ref, watch, type Ref } from 'vue'
// import { useProfileManager } from '../stores'
// import { getGrid } from '../utils/grid'

const tabs = [
  { title: 'Full Virtual Machine', value: 'Fullvm' },
  { title: 'Micro Virtual Machine', value: 'VM' },
  { title: 'Kubernetes', value: 'Kubernetes' },
  { title: 'CapRover', value: 'CapRover' },
  { title: 'Peertube', value: 'Peertube' },
  { title: 'Funkwhale', value: 'Funkwhale' },
  { title: 'Mattermost', value: 'Mattermost' },
  { title: 'Discourse', value: 'Discourse' },
  { title: 'Taiga', value: 'Taiga' },
  { title: 'Owncloud', value: 'Owncloud' },
  { title: 'Presearch', value: 'Presearch' },
  { title: 'Subsquid', value: 'Subsquid' },
  { title: 'Casperlabs', value: 'Casperlabs' },
  { title: 'Algorand', value: 'Algorand' },
  { title: 'Node Pilot', value: 'NodePilot' },
  { title: 'Umbrel', value: 'Umbrel' },
  { title: 'Wordpress', value: 'Wordpress' },
]

// const profileManager = useProfileManager()

const layout = ref()
const dialog = ref(false)
// const items = ref<any[]>([])
const selectedItems = ref<any[]>([])
const loading = ref(false)

const activeTab = ref() as Ref<number>
</script>

<script lang="ts">
import IconActionBtn from '../components/icon_action_btn.vue'
import VmDeploymentTable from '../components/vm_deployment_table.vue'
import K8sDeploymentTable from '../components/k8s_deployment_table.vue'
import ManageK8SWorkerDialog from '../components/manage_k8s_worker_dialog.vue'
import ManageCaproverWorkerDialog from '../components/manage_caprover_worker_dialog.vue'

export default {
  name: 'TfDeploymentList',
  components: {
    VmDeploymentTable,
    IconActionBtn,
    K8sDeploymentTable,
    ManageK8SWorkerDialog,
    ManageCaproverWorkerDialog,
  },
}
</script>