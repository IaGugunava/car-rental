<script setup lang="ts">
import Socials from '~/components/CommonComponents/Socials.vue';

const { locale } = useI18n();

const { data, error } = await apiFetch(
  `/api/description?populate=*&locale=${locale.value}`
);

const aboutInfo = computed(() => !error.value ? data.value?.data?.description?.[0]?.children?.[0]?.text : null)

</script>

<template>
    <div class="flex justify-between items-start">
        <div class="max-w-[400px] flex flex-col gap-9">
            <div v-html="aboutInfo">
            </div>

            <div>
                <Socials/>
            </div>
        </div>

        <div>
            <!-- <h2>popular cars</h2> -->
        </div>
    </div>
</template>

<style scoped>

</style>