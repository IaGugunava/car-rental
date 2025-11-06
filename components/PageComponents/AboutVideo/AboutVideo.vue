<script setup lang="ts">
const { locale } = useI18n();

const { data, error } = await apiFetch(
  `/api/about-video?locale=${locale.value}`
);

const contentData = computed(() =>
  !error.value ? data?.value?.data : null
);

console.log(data.value, error.value, "about video")

const videoId = computed(() => {
  const match = contentData.value.url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|watch\?v=|v\/))([\w-]{11})/
  )
  return match ? match[1] : null
})
</script>

<template>
    <div class="grid-container py-10">
        <div
    v-if="videoId"
    class="relative w-full pb-[56.25%] overflow-hidden rounded-2xl shadow-lg"
  >
    <iframe
      class="absolute top-0 left-0 w-full h-full"
      :src="`https://www.youtube.com/embed/${videoId}`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
  <p v-else class="text-red-500 text-center mt-2">Invalid YouTube URL</p>
    </div>
</template>

<style scoped>

</style>