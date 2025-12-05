<script setup lang="ts">
import Socials from '~/components/CommonComponents/Socials.vue';
import LangSwitcher from './LangSwitcher.vue';

</script>

<template>
  <div class="w-full h-[100dvh] z-10 fixed top-[90px] left-0 bg-background">
    <div class="flex gap-5 flex-col justify-center items-center pt-5">
        <NuxtLink
          class="text-dark text-lg font-semibold w-full border-b border-dark flex justify-center items-center pb-5"
          to="/cars"
        >
          {{ $t('nav.cars') }}
        </NuxtLink>
        <NuxtLink
          class="text-dark text-lg font-semibold w-full border-b border-dark flex justify-center items-center pb-5"
          to="/about-us"
        >
        {{ $t('nav.aboutUs') }}
      </NuxtLink>
      <NuxtLink
          class="text-dark text-lg font-semibold w-full border-b border-dark flex justify-center items-center pb-5"
          to="/contact-us"
        >
          {{ $t('nav.contactUs') }}
        </NuxtLink>
        <!-- <NuxtLink
          class="text-dark text-lg font-semibold w-full border-b border-dark flex justify-center items-center pb-5"
          to="/contact"
        >
        კონტაქტი
        </NuxtLink> -->

        <!-- Language Switcher -->
        <div class="w-full flex justify-center items-center pb-5">
          <LangSwitcher/>
        </div>
        
    </div>

    <div class="absolute bottom-[150px] flex-col z-30 left-5 flex gap-4 items-start">
        <p class="pr-4 text-dark font-bold text-sm sm:text-lg">{{ $t('burger.followSocial') }}</p>
        <Socials/>
    </div>
  </div>
</template>

<style scoped>
.router-link-active{
  color: #4235f2;
}
</style>
