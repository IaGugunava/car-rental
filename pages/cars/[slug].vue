<script setup lang="ts">
import CarInner from '~/components/PageComponents/CarInner/CarInner.vue';
import CarSlider from '~/components/PageComponents/CarSlider/CarSlider.vue';

const { locale } = useI18n();

const route = useRoute();

const id = computed(() => route?.params?.slug?.toString());

const { data, error } = await apiFetch(
  `/api/cars?locale=${locale.value}&populate=image`
);

const carData = computed(() => (!error.value ? data?.value?.data?.filter((el: any) => el.documentId.toString() === id.value)?.[0] : null));

// SEO for inner page using car data
const config = useRuntimeConfig();
const baseUrl = config.public.NUXT_PUBLIC_BASE_URL || '';

watchEffect(() => {
  if (carData.value) {
    const car = carData.value;
    useSeo({
      title: car.title || car.name,
      description: car.description,
      image: car.image?.url ? `${baseUrl}${car.image.url}` : undefined,
    });
  }
});
</script>

<template>
    <div>
        <CarInner v-if="carData" :car="carData" />
        <CarSlider />
    </div>
</template>

<style scoped>

</style>