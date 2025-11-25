<script setup lang="ts">
const { checkFirstLoad } = useFirstLoad()

onMounted(() => {
  checkFirstLoad()
})
</script>

<template>
  <UApp>
    <LoaderDark />
    <NuxtLayout name="default">
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
