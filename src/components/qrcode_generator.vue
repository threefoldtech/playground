<template>
  <img v-if="src" :src="src" alt="qrcode" />
</template>

<script lang="ts">
import { ref, onMounted, onUpdated } from 'vue'
import qrcode from 'qrcode'

export default {
  name: 'QrcodeGenerator',
  props: {
    data: String
  },
  setup(props) {
    const src = ref<string | null>(null)

    onMounted(updateSrc)
    onUpdated(updateSrc)
    async function updateSrc() {
      src.value = props.data ? await qrcode.toDataURL(props.data, { width: 250 }) : null
    }

    return { src }
  }
}
</script>
