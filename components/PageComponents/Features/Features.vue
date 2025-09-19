<script setup lang="ts">

const { locale } = useI18n()

const { data, execute, error } = await apiFetch(`/api/features?locale=${locale.value}`);

const featuresData = computed(() => (!error.value ? data?.value?.data : null));

watch(locale, async () => {
    await execute()
    if(error.value){
        console.log(error.value)
    }
}, {
    immediate: true
})
</script>

<template>
    <div class="py-[60px] px-[72px] flex justify-between items-center">
        <div v-for="item in featuresData" :key="item?.id" class="max-w-[375px]">
            <div class="flex flex-col gap-5 items-center">
                <div v-if="item?.icon" v-html="item?.icon"></div>
                <p class="font-semibold text-dark text-2xl">{{ item?.title }}</p>
                <p class="text-base text-dark text-center">{{ item?.description }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>