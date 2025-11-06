<script setup lang="ts">
const { locale } = useI18n();

const { data, error } = await apiFetch(
  `/api/contacts?populate=*&locale=${locale.value}`
);

const contactsInfo = computed(() => !error.value ? data?.value?.data?.[0] : null)
const mapUrl = computed(() => contactsInfo?.value?.item?.filter((el) => el.title === "Address")?.[0]?.url || "")

const { $strapiMedia } = useNuxtApp();

const contactMedia = (url: string) => {
  return $strapiMedia(url);
};
</script>

<template>
    <div>
        <NuxtLink v-if="contactsInfo?.image?.formats?.large?.url" :to="mapUrl" class="w-full" target="_blank">
          <NuxtImg
            class="h-full w-full object-cover aspect-[375/296] sm:aspect-[1920/1000]"
            :src="contactMedia(contactsInfo?.image?.formats?.large?.url)"
          />
        </NuxtLink>
    </div>
</template>

<style scoped>

</style>