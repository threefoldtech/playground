<template>
  <v-card>
    <section class="d-flex align-center">
      <div>
        <v-card-title v-if="$slots.title" class="font-weight-bold">
          <slot name="title" />
        </v-card-title>
        <v-card-subtitle v-if="$slots.subtitle">
          <slot name="subtitle" />
        </v-card-subtitle>
      </div>
      <v-spacer />
      <div class="mr-4" v-if="$slots['header-actions']">
        <slot name="header-actions" />
      </div>
    </section>

    <v-divider class="mt-5 mb-2" />

    <v-card-text> <slot /> </v-card-text>

    <template v-if="$slots['footer-actions']">
      <v-divider class="mt-5" />
      <v-card-actions>
        <v-spacer />
        <slot name="footer-actions" />
      </v-card-actions>
    </template>
  </v-card>
</template>

<script lang="ts">
export default {
  name: 'WebletLayout'
}
</script>
