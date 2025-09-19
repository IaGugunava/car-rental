<script setup lang="ts">
import AboutUs from '~/components/PageComponents/AboutUs/AboutUs.vue';
import CarSlider from '~/components/PageComponents/CarSlider/CarSlider.vue';
import Features from '~/components/PageComponents/Features/Features.vue';
import MainBanner from '~/components/PageComponents/MainBanner/MainBanner.vue';
import Statistics from '~/components/PageComponents/Statistics/Statistics.vue';


</script>

<template>
    <div class="overflow-x-hidden">
        <MainBanner/>
        <Features/>
        <AboutUs/>
        <CarSlider/>
        <Statistics/>
    </div>
</template>

<style scoped>

</style>