<template>
  <v-dialog scrollable width="80%" v-model="openManager" persistent>
    <template #activator>
      <v-btn @click="openManager = true">Open Profile Manager</v-btn>
    </template>

    <weblet-layout disable-alerts>
      <template #title> Profile Manager </template>
      <template #subtitle>
        Please visit
        <a
          class="app-link"
          href="https://library.threefold.me/info/manual/#/manual__weblets_profile_manager"
          target="_blank"
        >
          the manual
        </a>
        get started.
      </template>
      <template #header-actions>
        <v-btn
          color="error"
          variant="outlined"
          @click="logout"
          class="mr-2"
          v-if="profileManager.profile"
        >
          Logout
        </v-btn>
        <v-btn color="error" variant="tonal" @click="openManager = false"> Close </v-btn>
      </template>

      <v-tooltip
        text="Mnemonics are your private key. They are used to represent you on the ThreeFold Grid. You can paste existing mnemonics or click the 'Create Account' button to create an account and generate mnemonics."
        location="bottom"
        max-width="700px"
      >
        <template #activator="{ props: tooltipProps }">
          <password-input-wrapper>
            <template #default="{ props: passwordInputProps }">
              <form-validator v-model="isValidMnemonics">
                <input-validator
                  :value="mnemonics"
                  :rules="[
                    validators.required('Mnemonics is required.'),
                    (v) =>
                      validateMnemonic(v)
                        ? undefined
                        : { message: `Mnemonics doesn't seem to be valid.` }
                  ]"
                  :async-rules="[
                    (mnemonics) =>
                      getGrid({ mnemonics })
                        .then(() => undefined)
                        .catch(() => ({ message: 'Failed to load grid for this user.' }))
                  ]"
                >
                  <template #default="{ props: validationProps }">
                    <div v-bind="tooltipProps" v-show="!profileManager.profile">
                      <v-text-field
                        label="Mnemonics"
                        placeholder="Please insert your mnemonics"
                        autofocus
                        v-model="mnemonics"
                        v-bind="{ ...passwordInputProps, ...validationProps }"
                      />
                    </div>
                  </template>
                </input-validator>
              </form-validator>
            </template>
          </password-input-wrapper>
        </template>
      </v-tooltip>

      <v-form v-if="profileManager.profile">
        {{ profileManager.profile }}
      </v-form>

      <template #footer-actions>
        <!-- <v-btn :disabled="!isValidMnemonics">Validate</v-btn> -->
        <v-btn
          color="primary"
          @click="activate(mnemonics)"
          :loading="activating"
          :disabled="!isValidMnemonics"
        >
          Activate
        </v-btn>
      </template>
    </weblet-layout>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as validators from '../utils/validators'
import { validateMnemonic } from 'bip39'
import { getGrid, loadProfile } from '../utils/grid'
import { useProfileManager } from '../stores'

const openManager = ref(true)
const profileManager = useProfileManager()

const mnemonics = ref('')
const isValidMnemonics = ref(false)

function logout() {
  sessionStorage.removeItem('mnemonics')
  profileManager.clear()
}

const activating = ref(false)
async function activate(mnemonics: string) {
  activating.value = true
  sessionStorage.setItem('mnemonics', mnemonics)
  const grid = await getGrid({ mnemonics })
  const profile = await loadProfile(grid!)
  profileManager.set(profile)
  activating.value = false
}

onMounted(() => {
  const maybeMnemonics = sessionStorage.getItem('mnemonics')
  if (!maybeMnemonics) return
  mnemonics.value = maybeMnemonics
  activate(maybeMnemonics)
})
</script>

<script lang="ts">
// import QrcodeGenerator from '../components/qrcode_generator.vue'

export default {
  name: 'ProfileManager',
  components: {
    // QrcodeGenerator
  }
}
</script>
