<script setup lang="ts">
const { setLocale, locale, locales } = useI18n();
const transformedLocales = ref<{ title: string; value: string }[]>();

const getSelectData = () => {
  transformedLocales.value = locales.value.map((lang: any) => ({
    value: lang.code,
    title: lang.code === "en" ? "eng" : "ქარ"
  }));
};

const changeLocale = () =>
  locale.value === locales.value[0].code ? setLocale(locales.value[1].code) : setLocale(locales.value[0].code);

getSelectData();
</script>

<template>
    <div>
<div class="relative flex rounded-full border-[4px] border-gray-dark" @click="changeLocale">
    <div
      :class="{ 'translate-x-full': locale === 'en' }"
      class="absolute left-0 top-0 h-full w-1/2 rounded-full bg-primary transition-transform duration-150 ease-in"
    ></div>
    <p
      v-for="(item, index) in transformedLocales"
      :key="index"
      :class="{ '!text-white': item.value === locale }"
      class="upper z-[1] cursor-pointer p-3 font-bold text-dark text-xl transition-colors duration-300 upper"
    >
      {{ item.title }}
    </p>
  </div>
    </div>
</template>

<style scoped>

</style>