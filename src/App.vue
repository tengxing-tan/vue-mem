<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import { useCompanyStore } from './composables/useCompanyStore'
import HomeView from './views/HomeView.vue'

const route = useRoute()
const currentPath = computed(() => route.path)

const isActive = (path: string) => currentPath.value.startsWith(path)
const navClass = (path: string) =>
  isActive(path) && 'underline underline-offset-4 decoration-2 decoration-sky-400'

const companyId = ref(useCompanyStore().getCompanyId() ?? 0)
</script>

<template>
  <!-- 
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> 
        <div class="wrapper">
        <HelloWorld msg="You did it!" /> 
        -->
  <div v-if="companyId <= 0 && !isActive('/company')">
    <HomeView />
  </div>
  <div v-else class="bg-white h-dvh grid grid-rows-[auto_1fr_auto] font:sans">
    <header class="border-b border-gray-200 shadow-sm">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center gap-4 text-lg text-gray-800">
            <RouterLink to="/point">
              <span :class="navClass('/point')">🍄Points</span>
            </RouterLink>
            <RouterLink to="/members">
              <span :class="navClass('/member')">💎Members</span>
            </RouterLink>
            <RouterLink to="/reward">
              <span :class="navClass('/reward')">🎁Rewards</span>
            </RouterLink>
            <RouterLink to="/redemptions">
              <span :class="navClass('/redemption')">🍔Redemptions</span>
            </RouterLink>
          </div>
        </div>
      </div>
    </header>
    <div class="text-lg bg-white p-4 pb-28 min-h-3/4">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </div>
    <footer class="border-t border-gray-200">
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
