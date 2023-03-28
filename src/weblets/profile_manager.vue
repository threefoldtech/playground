<template>
  <section>
    <v-dialog v-model="show" scrollable width="90%">
      <template v-slot:activator="{ props }">
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
            >
              Got Old Deployments? Migrate Now!
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
            <div class="d-flex">
              <v-text-field
                label="Mnemonics"
                hint="Mnemonics are your private key. They are used to represent you on the ThreeFold Grid. You can paste existing mnemonics or click the 'Create Account' button to create an account and generate mnemonics."
                persistent-hint
                autofocus
                :type="showMnemonics ? 'text' : 'password'"
                :append-inner-icon="showMnemonics ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
                @click:append-inner="showMnemonics = !showMnemonics"
                v-model="profileManager.mnemonics"
              />
              <v-btn color="primary" size="small" class="mt-3 ml-2"> Create Account </v-btn>
            </div>

            <div class="d-flex mt-5">
              <v-textarea
                label="Public SSH Key"
                hint="SSH Keys are used to authenticate you to the deployment instance for management purposes. If you don't have an SSH Key or are not familiar, we can generate one for you."
                persistent-hint
                v-model="profileManager.ssh"
              />
              <v-btn color="primary" size="small" class="mt-3 ml-2"> Generate SSH Keys </v-btn>
            </div>
          </v-card-text>

          <v-divider class="mt-5" />

          <v-card-actions>
            <v-spacer />
            <v-btn color="secondary"> Active </v-btn>
          </v-card-actions>
        </template>
      </v-card>
    </v-dialog>
  </section>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useProfileManager } from '../stores'

const profileManager = useProfileManager()

const show = ref(true)
const migrateMode = ref(true)

const showMnemonics = ref(false)
const showPassword = ref(false)
</script>

<script lang="ts">
export default {
  name: 'ProfileManager'
}
</script>
