<template>
  <weblet-layout>
    <template #title>Deploy Caprover</template>
    <template #subtitle>
      CapRover is an extremely easy to use app/database deployment & web server manager for your
      NodeJS, Python, PHP, ASP.NET, Ruby, MySQL, MongoDB, Postgres, WordPress (and etc…)
      applications!
      <a
        href="https://manual.grid.tf/weblets/weblets_caprover.html?highlight=caprover#caprover"
        target="_blank"
        class="app-link"
      >
        Quick start documentation
      </a>
    </template>

    <d-tabs
      :tabs="[
        { title: 'Config', value: 'config' },
        { title: 'Leader', value: 'leader' },
        { title: 'Worker', value: 'workers' },
      ]"
      ref="tabs"
    ></d-tabs>
  </weblet-layout>
</template>

<script lang="ts" setup>
console.log('caprover')
</script>

<script lang="ts">
export default {
  name: 'TfCaprover',
}
</script>
