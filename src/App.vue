<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import PwaInstallButton from './components/PwaInstallButton.vue'
</script>

<template>
  <!-- 
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> 
        <div class="wrapper">
        <HelloWorld msg="You did it!" /> 
        -->
  <div class="h-dvh flex flex-col font:sans">
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-2">
            <RouterLink to="/members">
              <span class="font-semibold text-lg">💎Members</span>
            </RouterLink>
          </div>
        </div>
      </div>
      <nav>
        <PwaInstallButton />
      </nav>
    </header>
    <div class="text-lg h-full overflow-auto p-4">
      <RouterView />
    </div>

    <footer class="bg-white border-t border-gray-200">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-sm text-gray-700">
        <p class="font-semibold pb-4 text-lg">Membership App 💎</p>
        <p>Created by Teng Xing 💪</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>
