<template>
  <section>
    <v-dialog v-model="openDialog" scrollable width="80%">
      <template v-slot:activator="{ props }">
        <v-card v-bind="props" class="pa-3 d-inline-flex align-center">
          <v-icon icon="mdi-account" size="x-large" class="mr-2" />
          <div>
            <p v-if="!profileManager.profile"><strong> Profile Manager</strong></p>
            <template v-else>
              <p>
                Balance: <strong>{{ profileManager.profile.balance.free }} TFT</strong>
              </p>
              <p>
                Locked: <strong>{{ profileManager.profile.balance.locked }} TFT</strong>
              </p>
            </template>
          </div>
        </v-card>
      </template>

      <weblet-layout>
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
          <v-btn color="error" @click="openDialog = false"> Close </v-btn>
        </template>

        <template #default v-if="!profileManager.profile">
          <v-tooltip
            text="Mnemonics are your private key. They are used to represent you on the ThreeFold Grid. You can paste existing mnemonics or click the 'Create Account' button to create an account and generate mnemonics."
            location="bottom"
            max-width="700px"
          >
            <template #activator="{ props }">
              <password-input-wrapper>
                <template #default="{ props: passwordInputProps }">
                  <v-text-field
                    label="Mnemonics"
                    placeholder="Please insert your mnemonics"
                    v-bind="{ ...props, ...passwordInputProps }"
                    v-model="profileManager.mnemonics"
                    :error-messages="mnemonicsError"
                    @input="mnemonicsError !== '' ? (mnemonicsError = '') : null"
                    :loading="loading"
                    :disabled="loading || createAccountLoading"
                  />
                </template>
              </password-input-wrapper>
            </template>
          </v-tooltip>
        </template>

        <template #default v-else>
          <copy-input-wrapper :data="profileManager.profile.mnemonics">
            <template #default="{ props }">
              <v-text-field
                label="Mnemonics"
                readonly
                v-model="profileManager.profile.mnemonics"
                v-bind="props"
              />
            </template>
          </copy-input-wrapper>

          <v-tooltip
            text="SSH Keys are used to authenticate you to the deployment instance for management purposes. If you don't have an SSH Key or are not familiar, we can generate one for you."
            location="bottom"
            max-width="700px"
          >
            <template #activator="{ props }">
              <copy-input-wrapper :data="profileManager.profile.ssh">
                <template #default="{ props: copyInputProps }">
                  <v-textarea
                    no-resize
                    :spellcheck="false"
                    label="Public SSH Key"
                    v-model="profileManager.profile.ssh"
                    v-bind="{ ...props, ...copyInputProps }"
                    :disabled="sshLoading || sshUpdating"
                    :loading="sshLoading || sshUpdating"
                    :hint="
                      sshUpdating
                        ? 'Updating your public ssh key.'
                        : sshLoading
                        ? 'Generating a new public ssh key.'
                        : undefined
                    "
                    persistent-hint
                  />
                </template>
              </copy-input-wrapper>
            </template>
          </v-tooltip>

          <v-row class="mb-3">
            <v-spacer />
            <v-btn color="primary" variant="text" :loading="sshUpdating" @click="onUpdatePublicSSH">
              Update Public SSH Key
            </v-btn>
            <v-btn
              color="secondary"
              variant="text"
              :disabled="sshUpdating"
              :loading="sshLoading"
              @click="onGenerateSSH"
            >
              Generate SSH Keys
            </v-btn>
          </v-row>

          <copy-input-wrapper :data="profileManager.profile.twinId">
            <template #default="{ props }">
              <v-text-field
                label="Twin ID"
                readonly
                v-model="profileManager.profile.twinId"
                v-bind="props"
              />
            </template>
          </copy-input-wrapper>

          <copy-input-wrapper :data="profileManager.profile.address">
            <template #default="{ props }">
              <v-text-field
                label="Address"
                readonly
                v-model="profileManager.profile.address"
                v-bind="props"
              />
            </template>
          </copy-input-wrapper>
        </template>

        <template #footer-actions v-if="!profileManager.profile">
          <v-btn
            color="secondary"
            @click="onCreateAccount"
            :disabled="loading"
            :loading="createAccountLoading"
          >
            Don't have account? Create One
          </v-btn>
          <v-btn
            color="primary"
            @click="activate"
            :loading="loading"
            :disabled="createAccountLoading"
          >
            Activate
          </v-btn>
        </template>
      </weblet-layout>
    </v-dialog>
  </section>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { validateMnemonic } from 'bip39'
import { generateKeyPair } from 'web-ssh-keygen'
import { useProfileManager } from '../stores'
import { getGrid, createAccount, loadProfile, storeSSH } from '../utils/grid'
import { downloadAsFile } from '../utils/helpers'

const openDialog = ref(true)
const profileManager = useProfileManager()
const loading = ref(false)

/* Mnemonics */
const mnemonicsError = ref('')
async function activate() {
  mnemonicsError.value = ''
  loading.value = true
  sessionStorage.removeItem('seeds')

  const { mnemonics } = profileManager

  if (!validateMnemonic(mnemonics)) {
    loading.value = false
    return (mnemonicsError.value = `Mnemonics doesn't seem to be valid.`)
  }

  try {
    let grid = await getGrid({ mnemonics })
    if (!grid) {
      throw new Error('Failed to load grid for this user.')
    }
    const profile = await loadProfile(mnemonics, grid)
    profileManager.setProfile(profile)
    sessionStorage.setItem('seeds', mnemonics)
  } catch (e) {
    mnemonicsError.value = (e as Error).message
  }

  loading.value = false
}

/* Create Account */
const createAccountLoading = ref(false)
const isCreatedAccount = ref(false) /* should be used */
async function onCreateAccount() {
  createAccountLoading.value = true

  const account = await createAccount()
  createAccountLoading.value = false
  isCreatedAccount.value = true

  profileManager.mnemonics = account.mnemonic
  activate()
}

/* SSH */
const sshLoading = ref(false)
const sshUpdating = ref(false)
async function onGenerateSSH() {
  sshLoading.value = true
  profileManager.profile!.ssh = ''

  const keys = await generateKeyPair({
    alg: 'RSASSA-PKCS1-v1_5',
    hash: 'SHA-256',
    name: 'Threefold',
    size: 4096
  })
  const grid = await getGrid({ mnemonics: profileManager.profile!.mnemonics })
  await storeSSH(grid!, keys.publicKey)
  downloadAsFile('id_rsa', keys.privateKey)
  profileManager.profile!.ssh = keys.publicKey
  sshLoading.value = false
}
async function onUpdatePublicSSH() {
  sshUpdating.value = true
  const grid = await getGrid({ mnemonics: profileManager.profile!.mnemonics })
  await storeSSH(grid!, profileManager.profile!.ssh)
  sshUpdating.value = false
}
</script>

<script lang="ts">
export default {
  name: 'ProfileManager'
}
</script>
