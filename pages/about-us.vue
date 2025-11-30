<script setup lang="ts">
import AboutUs from '~/components/PageComponents/AboutUs/AboutUs.vue';
import AboutVideo from '~/components/PageComponents/AboutVideo/AboutVideo.vue';
import FAQ from '~/components/PageComponents/FAQ/FAQ.vue';
import WhyChooseUs from '~/components/PageComponents/WhyChooseUs/WhyChooseUs.vue';

// SEO
const seoData = await usePageSeo('about-us');
useSeo(seoData || undefined);
</script>

<template>
    <div>
        <AboutUs/>
        <WhyChooseUs/>
        <AboutVideo/>
        <FAQ/>
    </div>
</template>

<style scoped>

</style>