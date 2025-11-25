<script setup lang="ts">
const route = useRoute();

const { $strapiMedia } = useNuxtApp();

const { locale } = useI18n();

const { data, execute, error } = await apiFetch(
  `/api/about-uses?populate=description&populate=image&locale=${locale.value}`
);

const isAboutPage = computed(() => route?.fullPath?.includes("about-us"));

const aboutData = computed(() =>
  !error.value ? data?.value?.data?.[0] : null
);
const aboutUsData = computed(() =>
  !error.value ? data?.value?.data?.[1] : null
);

// onMounted(async () => {
//     await execute()
// })

const finalData = computed(() =>
  isAboutPage.value ? aboutUsData.value : aboutData.value
);

const aboutMedia = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return $strapiMedia(url);
};

watch(
  locale,
  async () => {
    await execute();
    if (error.value) {
      console.log(error.value);
    }
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div
    class="flex w-full justify-between flex-col items-center grid-container gap-24 py-[60px]"
    :class="{'md:flex-row': !isAboutPage, 'md:flex-row-reverse': isAboutPage}"
  >
    <div class="w-full">
      <NuxtImg
        class="aspect-[1920/1080] rounded-lg h-full w-full object-cover"
        :src="
          aboutMedia(
            finalData?.image?.formats?.large?.url ||
              finalData?.image?.formats?.thumbnail?.url
          )
        "
      />
    </div>
    <div class="w-full max-w-[550px]">
        <h1 v-if="isAboutPage" class="text-3xl font-bold text-dark mb-10">{{ finalData?.title }}</h1>
        <p v-if="isAboutPage" class="text-xl text-dark mb-10">{{ finalData?.teaser }}</p>
      <div
        class="gap-7"
        :class="{
          'flex flex-col': !isAboutPage,
          'grid grid-cols-2': isAboutPage,
        }"
      >
        <div v-for="(item, index) in finalData?.description" :key="item?.id">
          <div class="flex gap-5 flex-col items-start">
            <div
              class="flex gap-4 font-semibold"
              :class="{ 'items-end': !isAboutPage, 'items-start': isAboutPage }"
            >
              <div
                v-if="!isAboutPage"
                class="text-base text-white bg-primary w-8 h-8 flex justify-center items-center rounded-full"
              >
                {{ index + 1 }}
              </div>
              <div v-else v-html="item?.icon" class="w-[30px] h-[30px]"></div>
              <h3 class="text-xl" :class="{'font-bold': !!isAboutPage, 'font-normal': isAboutPage}">{{ item?.title }}</h3>
            </div>
            <div class="text-gray-dark line-clamp-3">
              {{ item?.teaser }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
