<script setup lang="ts">
import { apiFetch } from "~/composables/helpers";
const { $strapiMedia } = useNuxtApp();

const { data, execute, error } = await apiFetch(
  "/api/main-banner?populate=image"
);

const bannerMedia = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return $strapiMedia(url);
};

const bannersData = computed(() => (!error.value ? data?.value?.data : null));

// const progress = ref(1);

onMounted(async () => {
  await execute();

  console.log(data.value, "mounted");
});

// function onAutoplayTimeLeft(swiper: any, time: any, progressRatio: any) {
//   progress.value = 1 - progressRatio;
// }
</script>

<template>
  <div>
    <!-- <Swiper
        :slides-per-view="1"
        :autoplay="{
          delay: 5000,
          disableOnInteraction: false,
        }"
        :loop="true"
        :modules="[Autoplay]"
        @autoplay-time-left="onAutoplayTimeLeft"
      >
        <SwiperSlide v-for="item in bannersData" :key="item?.id">
            {{ bannersData }} -->
    <div class="relative">
      <div class="max-h-[calc(100dvh-104px)] group w-full overflow-hidden">
        <NuxtImg
          class="h-full w-full object-cover aspect-[375/296] sm:aspect-[1920/1000]"
          :src="bannerMedia(bannersData?.image?.formats?.large?.url)"
        />
      </div>
      <div
        class="absolute bottom-[50px] lg:bottom-[150px] left-[50px] lg:left-[100px] 2xl:left-[150px]"
      >
        <h1
          class="text-white text-[34px] md:text-[56px] xl:text-[64px] 2xl:text-[80px] lg:text-6xl font-bold mb-2 md:mb-4"
        >
          {{ bannersData?.title }}
        </h1>
        <p
          class="text-white text-sm lg:text-lg max-w-full pr-[50px] sm:pr-0 sm:max-w-1/2 md:max-w-[700px] line-clamp-4 sm:line-clamp-6 xl:max-w-[1000px] mb-4 sm:mb-8"
        >
          {{ bannersData?.teaser }}
        </p>

        <NuxtLink :to="bannersData?.url">
          <CustomButton :text="bannersData?.button_text" :type="2" />
        </NuxtLink>
      </div>
    </div>
  </div>
  <!-- </SwiperSlide>
      </Swiper>
    </div> -->
</template>

<style scoped></style>
