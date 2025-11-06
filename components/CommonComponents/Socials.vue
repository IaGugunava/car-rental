<script setup lang="ts">

const { data, error } = await apiFetch(
  `/api/social?populate=*`
);

const socialInfo = computed(() => !error.value ? data.value?.data?.items : null)

</script>

<template>
    <div class="flex justify-start items-center gap-5">
        <NuxtLink v-for="item in socialInfo" :key="item?.id" :to="item?.url" >
            <div v-html="item?.icon"></div>
        </NuxtLink>
    </div>
</template>

<style scoped>

</style>