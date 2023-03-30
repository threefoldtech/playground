<template>
  <section>
    <v-dialog v-model="show" scrollable width="90%">
      <template v-slot:activator="{ props }">
        {{ log(props) }}
        <v-card v-bind="props" class="pa-3 d-inline-flex align-center">
          <v-icon icon="mdi-account" size="x-large" class="mr-2" />
          <div>
            <p><strong> Profile Manager</strong></p>
            <!-- <p>Balance: <strong>1111 TFT</strong></p>
            <p>Locked: <strong>1111 TFT</strong></p> -->
          </div>
        </v-card>
      </template>
      <v-card>
        <section class="d-flex align-center">
          <div>
            <v-card-title> Profile Manager </v-card-title>
            <v-card-subtitle> Please visit the manual get started. </v-card-subtitle>
          </div>
          <v-spacer />
          <div class="mr-4">
            <v-btn
              color="primary"
              class="mr-2"
              size="small"
              :variant="migrateMode ? undefined : 'outlined'"
              @click="migrateMode = !migrateMode"
              :disabled="!isValidMnemonics"
            >
              {{ migrateMode ? 'Back To Profile' : 'Got Old Deployments? Migrate Now!' }}
            </v-btn>
            <v-btn color="error" size="small" @click="show = false"> Close </v-btn>
          </div>
        </section>

        <v-divider class="mt-5 mb-2" />

        <template v-if="migrateMode">
          <v-card-text>
            <v-text-field
              label="Password"
              persistent-hint
              hint="Please insert your old password (aka. 'store secret') which you want to migrate your deployments from."
              :type="showPassword ? 'text' : 'password'"
              :append-inner-icon="showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
              @click:append-inner="showPassword = !showPassword"
            />
          </v-card-text>

          <v-divider class="mt-5" />

          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary"> Migrate </v-btn>
          </v-card-actions>
        </template>

        <template v-else>
          <v-card-text>
            <v-form ref="mnemonicsForm" v-model="isValidMnemonicsInput">
              <div class="d-flex">
                <v-text-field
                  label="Mnemonics"
                  hint="Mnemonics are your private key. They are used to represent you on the ThreeFold Grid. You can paste existing mnemonics or click the 'Create Account' button to create an account and generate mnemonics."
                  :persistent-hint="mnemonicsError === null"
                  autofocus
                  :type="showMnemonics ? 'text' : 'password'"
                  :append-inner-icon="showMnemonics ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                  @click:append-inner="showMnemonics = !showMnemonics"
                  v-model="profileManager.mnemonics"
                  :rules="[validateMnemonicsInput]"
                  :disabled="mnemonicsLoading"
                  :loading="mnemonicsLoading"
                  :error-messages="mnemonicsError ? [mnemonicsError] : []"
                  @input="mnemonicsError = null"
                />
                <v-btn
                  color="primary"
                  size="small"
                  class="mt-3 ml-2"
                  :disabled="isValidMnemonics || mnemonicsLoading"
                >
                  Create Account
                </v-btn>
              </div>
            </v-form>

            <div class="d-flex mt-5">
              <v-textarea
                label="Public SSH Key"
                hint="SSH Keys are used to authenticate you to the deployment instance for management purposes. If you don't have an SSH Key or are not familiar, we can generate one for you."
                persistent-hint
                v-model="profileManager.ssh"
                :disabled="!isValidMnemonics"
              />
              <v-btn color="primary" size="small" class="mt-3 ml-2" :disabled="!isValidMnemonics">
                Generate SSH Keys
              </v-btn>
            </div>
          </v-card-text>

          <v-divider class="mt-5" />

          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary" :disabled="!isValidMnemonics"> Active </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>
  </section>
</template>
<script lang="ts" setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useProfileManager } from '../stores'
import type { VForm } from 'vuetify/components/VForm'
import { getGrid } from '../utils/grid'

const profileManager = useProfileManager()

const show = ref(true)
const migrateMode = ref(false)

const showMnemonics = ref(false)
const mnemonicsForm = ref<VForm>(null)
watch(show, (s) => {
  if (s && profileManager.mnemonics.length > 0) {
    nextTick(() => mnemonicsForm.value.validate())
  }
})
const isValidMnemonicsInput = ref(false)
const mnemonicsCanLoadGrid = ref(false)
const mnemonicsLoading = ref(false)
const mnemonicsError = ref<string>(null)
const isValidMnemonics = computed(() => isValidMnemonicsInput.value && mnemonicsCanLoadGrid.value)
watch(isValidMnemonicsInput, async (valid) => {
  if (!valid) {
    mnemonicsCanLoadGrid.value = false
    return
  }
  if (mnemonicsCanLoadGrid.value) return
  mnemonicsLoading.value = true
  mnemonicsError.value = null
  getGrid(profileManager)
    .then(() => (mnemonicsCanLoadGrid.value = true))
    .catch(() => (mnemonicsError.value = `Couldn't load grid client using this mnemonics.`))
    .finally(() => (mnemonicsLoading.value = false))
})

function log(x: any) {
  console.log(x)
}

const showPassword = ref(false)
</script>

<script lang="ts">
import { validateMnemonicsInput } from '../utils/validators'

export default {
  name: 'ProfileManager',
  methods: {
    validateMnemonicsInput
  }
}
</script>
