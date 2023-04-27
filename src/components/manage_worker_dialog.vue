<template>
  <v-dialog model-value width="70%" persistent>
    <weblet-layout ref="layout">
      <template #title><slot name="title"></slot></template>
      <template #subtitle><slot name="subtitle"></slot></template>

      <div class="d-flex justify-center mb-6">
        <v-btn-toggle
          divided
          v-model="showType"
          mandatory
          v-if="workers.length > 0"
          :disabled="deleting"
        >
          <v-btn variant="outlined"> List </v-btn>
          <v-btn variant="outlined"> Deploy </v-btn>
        </v-btn-toggle>
      </div>

      <template v-if="showType === 0">
        <slot name="list"></slot>
      </template>

      <slot name="deploy" v-else></slot>

      <template #footer-actions>
        <v-btn
          color="error"
          variant="outlined"
          prepend-icon="mdi-delete"
          :disabled="selectedWorkers.length === 0 || deleting"
          v-if="showType === 0"
          @click="deletingDialog = true"
        >
          Delete
        </v-btn>
        <v-btn
          color="primary"
          variant="tonal"
          :disabled="!valid"
          @click="deploy"
          v-if="showType === 1"
        >
          Deploy
        </v-btn>
        <v-btn color="error" variant="tonal" v-if="!deleting" @click="$emit('close')">
          Close
        </v-btn>
      </template>
    </weblet-layout>
  </v-dialog>

  <v-dialog width="50%" persistent v-model="deletingDialog">
    <v-card>
      <v-card-title class="text-h5">
        Are you sure you want to delete the following workers?
      </v-card-title>
      <v-card-text>
        <v-chip class="ma-1" color="primary" label v-for="w in selectedWorkers" :key="w.name">
          {{ w.name }}
        </v-chip>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="error" variant="text" @click="onDelete"> Remove </v-btn>
        <v-btn color="error" variant="tonal" @click="deletingDialog = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{ workers: any[] }>()
const emits = defineEmits<{
  (event: 'close'): void
  (event: 'delete', workers: any[]): void
  (event: 'deploy', layout: any): void
}>()

const layout = ref()
const showType = ref(props.workers.length === 0 ? 1 : 0)
const valid = ref(true)
const selectedWorkers = ref<any[]>([])
const deleting = ref(false)
const deletingDialog = ref(false)

async function deploy() {
  emits('deploy', layout.value)
}

async function onDelete() {
  emits('delete', selectedWorkers.value)
}
</script>

<script lang="ts">
export default {
  name: 'ManageWorkerDialog',
}
</script>
