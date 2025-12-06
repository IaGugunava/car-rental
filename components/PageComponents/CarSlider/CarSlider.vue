<script setup lang="ts">
// import { Swiper, SwiperSlide } from "swiper/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import CarCard from "./parts/CarCard.vue";
import CustomButton from "~/components/UIComponents/CustomButton.vue";

const { locale } = useI18n();
const route = useRoute();

const { data, execute, error } = await apiFetch(
  `/api/cars?locale=${locale.value}&populate=image`
);

const carsData = computed(() => (!error.value ? data?.value?.data : null));

const carSliderKey = ref(0)

// onMounted(async () => {
//     await execute()
// })

watch(
  route.fullPath,
  () => {
    carSliderKey.value++;
  },
  {
    immediate: true
  }
)

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
  <div class="py-[60px]">
     <div class="grid-container flex w-full justify-between items-center mb-10">
            <h2 class="text-xl sm:text-[50px] font-bold text-dark">{{ $t('carSlider.title') }}</h2>

            <NuxtLink to="/cars">
              <CustomButton :text="$t('carSlider.viewMore')"/>
            </NuxtLink>
        </div>
    <Swiper
  :key="carSliderKey"
  class="!overflow-visible custom-swiper"
  :space-between="30"
  :slides-offset-before="40"
  :speed="1000"
  :breakpoints="{
    0: { slidesPerView: 1, spaceBetween: 20, slidesOffsetBefore: 40 },
    480: { slidesPerView: 1, spaceBetween: 20, slidesOffsetBefore: 40 },
    768: { slidesPerView: 2, spaceBetween: 20 },
    1024: { slidesPerView: 2, slidesOffsetBefore: 40 },
    1280: { slidesPerView: 3, spaceBetween: 20, slidesOffsetBefore: 80 },
    1920: { slidesPerView: 4, spaceBetween: 30, slidesOffsetBefore: 160 },
  }"
>
  <SwiperSlide v-for="item in carsData" :key="item.id">
    <CarCard :data="item" />
  </SwiperSlide>
</Swiper>

  </div>
</template>

<style scoped></style>
