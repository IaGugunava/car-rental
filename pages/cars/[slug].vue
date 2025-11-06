<script setup lang="ts">
import CarInner from '~/components/PageComponents/CarInner/CarInner.vue';
import CarSlider from '~/components/PageComponents/CarSlider/CarSlider.vue';

const { locale } = useI18n();

const route = useRoute();

const id = computed(() => route?.params?.slug?.toString()?.split("-")?.[0]);

const { data, error } = await apiFetch(
  `/api/cars?locale=${locale.value}&populate=image`
);

const carData = computed(() => (!error.value ? data?.value?.data?.filter((el: any) => el.id.toString() === id.value)?.[0] : null));

</script>

<template>
    <div>
        <CarInner v-if="carData" :car="carData" />
        <CarSlider />
    </div>
</template>

<style scoped>

</style>