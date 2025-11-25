<script setup lang="ts">
import AboutUs from "~/components/PageComponents/AboutUs/AboutUs.vue";
import CarSlider from "~/components/PageComponents/CarSlider/CarSlider.vue";
import FAQ from "~/components/PageComponents/FAQ/FAQ.vue";
// import Features from "~/components/PageComponents/Features/Features.vue";
import MainBanner from "~/components/PageComponents/MainBanner/MainBanner.vue";
</script>

<template>
  <div class="overflow-x-hidden">
    <MainBanner />
    <!-- <Features /> -->
    <AboutUs />
    <CarSlider />
    <FAQ/>
  </div>
</template>

<style scoped></style>
