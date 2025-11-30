<script setup lang="ts">
import Socials from "~/components/CommonComponents/Socials.vue";

const { locale, t } = useI18n();

const pages = computed(() => [
    {
        id: 1,
        title: t('nav.cars'),
        slug: "cars"
    },
    {
        id: 2,
        title: t('nav.aboutUs'),
        slug: "about-us"
    },
    {
        id: 3,
        title: t('nav.contactUs'),
        slug: "contact-us"
    }
]);

const aboutRes = await apiFetch(
  `/api/description?populate=*&locale=${locale.value}`
);

const carRes = await apiFetch(
  `/api/cars?locale=${locale.value}&populate=image&pagination[page]=1&pagination[pageSize]=5`
);

const aboutInfo = computed(() =>
  !aboutRes?.error?.value
    ? aboutRes.data?.value?.data?.description?.[0]?.children?.[0]?.text
    : null
);

const carLinks = computed(() =>
  !carRes?.error?.value ? carRes.data?.value?.data : null
);
</script>

<template>
  <div class="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-6">
    <div class="w-full md:max-w-[400px] flex flex-col gap-6 md:gap-9 md:flex-1">
      <div class="text-sm sm:text-base" v-html="aboutInfo"></div>

      <div>
        <Socials />
      </div>
    </div>

    <div class="w-full md:flex-1 flex flex-col md:ml-8 lg:ml-20">
        <div class="flex gap-2 sm:gap-3 flex-col">
            <h2 class="text-dark text-lg sm:text-xl font-semibold">{{ $t('footer.pageLinks') }}</h2>
        <div v-for="item in pages" :key="item?.id">
            <NuxtLink :to="item?.slug">
                <p class="text-primary hover:text-dark transition-all duration-300 ease-in-out text-base sm:text-lg md:text-xl font-regular">{{ item?.title }}</p>
            </NuxtLink>
        </div>
    </div>
    </div>

    <div class="w-full md:flex-1 flex gap-2 sm:gap-3 flex-col">
        <h2 class="text-dark text-lg sm:text-xl font-semibold">{{ $t('footer.popularCars') }}</h2>
      <NuxtLink v-for="item in carLinks" :key="item?.id" :to="`/cars/${item?.id}-${item?.slug}`">
        <p class="text-primary hover:text-dark transition-all duration-300 ease-in-out text-base sm:text-lg md:text-xl font-regular">{{ item?.name }}</p>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
