<script setup lang="ts">
import logoFooterLight from '~/assets/icons/logo-footer-en.svg';
import logoFooterDark from '~/assets/icons/logo-footer-dark.svg';

const { locale } = useI18n();
const { isDark } = useTheme();

const { data, error } = await apiFetch(
  `/api/contacts?populate=*&locale=${locale.value}`
);

const contactsInfo = computed(() => !error.value ? data?.value?.data?.[0]?.item : null);
const logoSrc = computed(() => isDark.value ? logoFooterDark : logoFooterLight);
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-4">
    <NuxtLink
      to="/"
      class="w-[120px] sm:w-[150px] h-[40px] sm:h-[50px] flex items-center justify-center"
    >
      <ClientOnly>
        <img 
          :src="logoSrc" 
          :alt="`Logo ${locale}`" 
          class="w-full h-full object-contain"
        />
        <template #fallback>
          <img 
            :src="logoFooterLight" 
            :alt="`Logo ${locale}`" 
            class="w-full h-full object-contain"
          />
        </template>
      </ClientOnly>
    </NuxtLink>

    <NuxtLink v-for="item in contactsInfo" :key="item?.id" :to="item?.url" class="flex items-center gap-2">
        <!-- {{ item }} -->
        <div v-if="item?.icon" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex justify-center items-center bg-gray-dark" v-html="item?.icon">
        </div>

        <div>
          <h2 class="text-dark text-sm sm:text-base">{{ item?.title }}</h2>
          <p class="text-dark text-sm sm:text-base font-bold">{{ item?.teaser }}</p>
        </div>

    </NuxtLink>
  </div>
</template>

<style scoped></style>
