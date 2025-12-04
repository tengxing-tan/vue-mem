<script setup lang="ts">
import { RouterLink } from 'vue-router'

const props = defineProps<{
  title: string
  price: number
  link: string
  imgUrl?: string | null
}>()
</script>

<template>
  <RouterLink :to="props.link" class="group block overflow-hidden border">
    <div class="h-fit w-full grid place-items-center bg-gray-100 aspect-square">
      <img
        v-if="props.imgUrl"
        :src="props.imgUrl"
        alt=""
        class="w-full h-full object-contain md:object-cover"
      />
      <i v-else class="ri-gift-line text-zinc-400 text-5xl"></i>
    </div>

    <div class="bg-white p-4">
      <h3
        class="min-h-28 text-xl text-zinc-700 group-hover:underline group-hover:underline-offset-4"
      >
        {{ props.title }}
      </h3>
      <p class="tracking-wide font-semibold text-right text-2xl text-zinc-700">
        {{ props.price }}
      </p>
    </div>
  </RouterLink>
</template>
