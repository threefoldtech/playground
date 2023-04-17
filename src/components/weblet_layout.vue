<template>
  <v-card>
    <section class="d-flex align-center">
      <div>
        <v-card-title v-if="$slots.title" class="font-weight-bold">
          <slot name="title" />
        </v-card-title>
        <v-card-subtitle v-if="$slots.subtitle" :style="{ whiteSpace: 'initial' }">
          <slot name="subtitle" />
        </v-card-subtitle>
      </div>
      <v-spacer />
      <div class="mr-4" v-if="$slots['header-actions']">
        <slot name="header-actions" />
      </div>
    </section>

    <v-divider class="mt-5 mb-2" />

    <v-card-text>
      <slot v-if="disableAlerts" />
      <template v-else>
        <v-alert type="info" v-if="!profileManager.profile">
          Please activate a profile from the profile manager
        </v-alert>

        <v-alert v-else-if="status" :type="alertType">
          {{ message }}
        </v-alert>

        <slot v-else />
      </template>
    </v-card-text>

    <template v-if="$slots['footer-actions'] && (profileManager.profile || disableAlerts)">
      <v-divider class="mt-5" />
      <v-card-actions>
        <v-spacer />
        <slot name="footer-actions" v-if="status !== 'failed' && status !== 'success'" />
        <v-btn v-else color="secondary" variant="text" @click="reset">Back</v-btn>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue'
import { useProfileManager } from '../stores'
import { events } from 'grid3_client'

export type WebletStatus = 'deploy' | 'success' | 'failed'

defineProps({
  disableAlerts: {
    type: Boolean,
    required: false,
    default: false
  }
})

const profileManager = useProfileManager()

const status = ref<WebletStatus>()
const message = ref<string>()
function onLogMessage(msg: string) {
  if (typeof msg === 'string') {
    message.value = msg
  }
}

watch(status, (s) => {
  if (s === 'deploy') events.addListener('logs', onLogMessage)
  else events.removeListener('logs', onLogMessage)
})
const alertType = computed(() => {
  if (status.value === 'deploy') return 'info'
  else if (status.value === 'failed') return 'error'
  return 'success'
})

defineExpose({
  setStatus(s: WebletStatus, m?: string) {
    if (s !== 'deploy' && !m) {
      throw new Error('Message need to be passed while settingStatus.')
    }

    message.value = m ? m : 'Deploying...'
    status.value = s
  }
})

function reset() {
  status.value = undefined
  message.value = undefined
}
</script>

<script lang="ts">
export default {
  name: 'WebletLayout'
}
</script>
