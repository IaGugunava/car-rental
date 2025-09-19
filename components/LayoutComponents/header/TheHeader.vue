<script setup lang="ts">
import CustomIcon from '~/components/UIComponents/CustomIcon.vue';

const pages = [
    {
        id: 1,
        title: "cars",
        slug: "cars"
    },
    {
        id: 2,
        title: "about us",
        slug: "about-us"
    },
    {
        id: 3,
        title: "contact us",
        slug: "contact-us"
    }
]
</script>

<template>
  <div class="flex h-[104px] justify-between items-center px-[72px]">
    <!-- <CustomIcon icon="logo"/> -->
    <NuxtLink
      to="/"
      class="w-[150px] h-[50px] flex items-center justify-center"
    >
      <img src="../../../assets/icons/logo.svg" />
    </NuxtLink>

    <div class="flex gap-5 flex-row">
        <div v-for="item in pages" :key="item?.id">
            <NuxtLink :to="item?.slug">
                <p class="text-dark text-xl font-semibold">{{ item?.title }}</p>
            </NuxtLink>
        </div>
    </div>

    <div class="flex items-center gap-3">
        <CustomIcon icon="phone"/>
        <img src="../../../assets/icons/phone.svg"/>
        <div>
            <p>Need Help?</p>
            <NuxtLink to="tel:+996 247-1680">
                +996 247-1680
            </NuxtLink>
        </div>
    </div>
  </div>
</template>

<style scoped></style>
