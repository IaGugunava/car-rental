<script setup lang="ts">
const { locale } = useI18n();

const { data, error } = await apiFetch(
  `/api/contacts?populate=*&locale=${locale.value}`
);

const contactsInfo = computed(() => !error.value ? data?.value?.data?.[0]?.item : null)
</script>

<template>
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
    <NuxtLink
      to="/"
      class="w-[150px] h-[50px] flex items-center justify-center"
    >
      <img src="../../../../assets/icons/logo.svg" />
    </NuxtLink>

    <NuxtLink v-for="item in contactsInfo" :key="item?.id" :to="item?.url" class="flex items-center gap-2">
        <!-- {{ item }} -->
        <div v-if="item?.icon" class="w-10 h-10 rounded-full flex justify-center items-center bg-gray-dark" v-html="item?.icon">
        </div>

        <div>
          <h2 class="text-dark text-base">{{ item?.title }}</h2>
          <p class="text-dark text-base font-bold">{{ item?.teaser }}</p>
        </div>

    </NuxtLink>
  </div>
</template>

<style scoped></style>
