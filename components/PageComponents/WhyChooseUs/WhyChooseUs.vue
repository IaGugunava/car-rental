<script setup lang="ts">
const { locale } = useI18n();

const { data, error } = await apiFetch(
  `/api/why-choose-us?populate=items&locale=${locale.value}`
);

const contentData = computed(() =>
  !error.value ? data?.value?.data : null
);
</script>

<template>
    <div class="grid-container py-10 flex flex-col sm:flex-row gap-10 sm:gap-[60px] md:gap-[80px] items-start">
        <h2 class="text-3xl font-bold text-dark w-[400px]">{{ contentData?.title }}</h2>
        <div class="grid grid-cols-2 gap-6">
            <div v-for="item in contentData?.items" :key="item?.id">
                <h3 class="text-xl text-dark font-semibold mb-5">{{ item?.title }}</h3>
                <p class="text-base text-dark">{{ item?.teaser }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>