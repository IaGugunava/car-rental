<script setup lang="ts">
const { $strapiMedia } = useNuxtApp();

const { locale } = useI18n()

const { data, execute, error } = await apiFetch(`/api/about-us?populate=description&populate=image&locale=${locale.value}`);

const aboutData = computed(() => (!error.value ? data?.value?.data : null));

// onMounted(async () => {
//     await execute()
// })

const aboutMedia = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return $strapiMedia(url);
};

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
    <div class="flex w-full justify-between items-center grid-container gap-24 py-[60px]">
        <!-- {{ aboutData }} -->

        <div class="w-full">
            <NuxtImg class="aspect-[550/550] rounded-lg h-full w-full object-cover " :src="aboutMedia(aboutData?.image?.formats?.large?.url)"/>
        </div>

        <div class="w-full max-w-[550px] flex flex-col gap-7">
            <div v-for="(item, index) in aboutData?.description" :key="item?.id">
                <div class="flex gap-5 flex-col items-start">
                    <div class="flex gap-4 items-end font-semibold">
                        <div class="text-base text-white bg-primary w-8 h-8 flex justify-center items-center rounded-full">
                            {{index + 1}}
                        </div>
                        <h3 class="text-xl">{{ item?.title }}</h3>
                    </div>
                    <div class="text-gray-dark line-clamp-3">
                        {{ item?.teaser }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>