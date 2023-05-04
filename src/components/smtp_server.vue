<template>
  <v-alert variant="tonal" type="warning">
    <slot v-if="$slots.default"></slot>
    <p v-else>Configure your SMTP Server.</p>
  </v-alert>

  <v-switch
    inset
    v-model="$props.modelValue.enabled"
    label="Toggle SMTP Server Enable"
    v-if="!persistent"
    color="primary"
  />

  <template v-if="$props.modelValue.enabled || persistent">
    <input-validator
      :value="$props.modelValue.username"
      :rules="[
        validators.required('Username is required.'),
        validators.isEmail('Please provide a valid email address.'),
      ]"
    >
      <template #default="{ props }">
        <v-text-field
          label="Username"
          placeholder="username@example.com"
          v-model="$props.modelValue.username"
          v-bind="props"
          autofocus
        />
      </template>
    </input-validator>

    <password-input-wrapper>
      <template #default="{ props }">
        <input-validator
          :value="$props.modelValue.password"
          :rules="[
            validators.required('Password is required.'),
            validators.minLength('Password minLength is 6 chars.', 6),
            validators.maxLength('Password maxLength is 15 chars.', 15),
          ]"
        >
          <template #default="{ props: validatorProps }">
            <v-text-field
              label="Password"
              v-model="$props.modelValue.password"
              v-bind="{ ...props, ...validatorProps }"
            />
          </template>
        </input-validator>
      </template>
    </password-input-wrapper>

    <input-validator
      :value="$props.modelValue.email"
      :rules="[
        validators.required('Email is required.'),
        validators.isEmail('Please provide a valid email address.'),
      ]"
      v-if="email"
    >
      <template #default="{ props }">
        <v-text-field
          label="From Email Address"
          placeholder="support@example.com"
          v-bind="props"
          v-model="$props.modelValue.email"
        />
      </template>
    </input-validator>

    <input-validator
      :value="$props.modelValue.hostname"
      :rules="[
        validators.required('Hostname is required.'),
        validators.isURL('Please provide a valid hostname.'),
      ]"
    >
      <template #default="{ props }">
        <v-text-field label="Hostname" v-model="$props.modelValue.hostname" v-bind="props" />
      </template>
    </input-validator>

    <input-validator
      :value="$props.modelValue.port"
      :rules="[
        validators.required('Port is required.'),
        validators.isPort('Please provide a valid port.'),
      ]"
    >
      <template #default="{ props }">
        <v-text-field label="Port" v-model.number="$props.modelValue.port" v-bind="props" />
      </template>
    </input-validator>

    <v-switch inset color="primary" label="Use TLS" v-if="ssl" />
    <v-switch inset color="primary" label="Use SSL" v-if="tls" />
  </template>
</template>

<script lang="ts" setup>
import * as validators from '../utils/validators'

defineProps<{
  modelValue: SMTPServer
  ssl?: boolean
  tls?: boolean
  email?: boolean
  persistent?: boolean
}>()
</script>

<script lang="ts">
import { generateString } from '@threefold/grid_client'
import type { SMTPServer } from '../types'

export function createSMTPServer(options: Partial<SMTPServer> = {}): SMTPServer {
  return {
    enabled: options.enabled || false,
    username: options.username || '',
    email: options.email || '',
    hostname: options.hostname || 'smtp.gmail.com',
    port: options.port || 587,
    tls: options.tls || false,
    ssl: options.ssl || false,
    password: options.password || generateString(12),
  }
}

export default {
  name: 'SmtpServer',
}
</script>