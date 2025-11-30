<script setup lang="ts">
import CarsList from '~/components/PageComponents/CarsList/CarsList.vue';

// SEO
const seoData = await usePageSeo('cars');
useSeo(seoData || undefined);
</script>

<template>
    <div>
        <CarsList/> 
    </div>
</template>

<style scoped>

</style>