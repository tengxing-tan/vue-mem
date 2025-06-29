<template>
  <button v-if="installReady" @click="promptInstall">Install This App</button>
</template>

<script setup lang="ts">
import { usePwaInstallPrompt } from '@/composables/usePwaInstallStore'

const { installReady, promptInstall } = usePwaInstallPrompt()
</script>
