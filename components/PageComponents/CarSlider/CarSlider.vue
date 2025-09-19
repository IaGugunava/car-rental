<script setup lang="ts">
// import { Swiper, SwiperSlide } from "swiper/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import CarCard from "./parts/CarCard.vue";
import CustomButton from "~/components/UIComponents/CustomButton.vue";

const { locale } = useI18n();

const { data, execute, error } = await apiFetch(
  `/api/cars?locale=${locale.value}&populate=image&pagination[page]=1&pagination[pageSize]=5`
);

const carsData = computed(() => (!error.value ? data?.value?.data : null));

// onMounted(async () => {
//     await execute()
// })


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

console.log(carsData.value, "cars");
</script>

<template>
  <div class="py-[60px]">
     <div class="grid-container flex w-full justify-between items-center mb-10">
            <h2 class="text-[50px] font-bold text-dark">Choose the car that suits you</h2>

            <NuxtLink to="/cars">
              <CustomButton text="view more"/>
            </NuxtLink>
        </div>
    <swiper-container 
     class="!overflow-visible custom-swiper"
      style=""
      :space-between="30"
      :slides-per-view="4"
      :slides-offset-before="242"
      :speed="1000"
    >
      <swiper-slide
        v-for="item in carsData"
        :key="item?.id"
      >
        <CarCard :data="item"/>
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<style scoped></style>
