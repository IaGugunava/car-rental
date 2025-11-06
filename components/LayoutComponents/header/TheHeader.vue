<script setup lang="ts">
import TheBurger from './parts/TheBurger.vue';

const route = useRoute();
const { locale, setLocale, locales, t } = useI18n();
const isBurgerOpen = ref(false);

// Dynamic pages with translations
const pages = computed(() => [
    {
        id: 1,
        title: t('nav.cars'),
        slug: "cars"
    },
    {
        id: 2,
        title: t('nav.aboutUs'),
        slug: "about-us"
    },
    {
        id: 3,
        title: t('nav.contactUs'),
        slug: "contact-us"
    }
]);

// Language options for the dropdown
const languageOptions = computed(() => {
  return locales.value.map((loc: any) => ({
    label: loc.code === 'en' ? 'English' : 'ქართული',
    value: loc.code,
    icon: loc.code === 'en' ? 'i-heroicons-language' : 'i-heroicons-flag'
  }));
});

// Current selected language
const selectedLanguage = computed({
  get: () => languageOptions.value.find(lang => lang.value === locale.value),
  set: (newLang: any) => {
    if (newLang) {
      setLocale(newLang.value);
    }
  }
});

watch(
  () => isBurgerOpen.value,
  (isOpen: boolean) => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
    }
  }
);

watch(() => route.fullPath, () => {
  isBurgerOpen.value = false;
});
</script>

<template>
  <div class="flex h-[104px] justify-between items-center px-[72px]">
    <NuxtLink
      to="/"
      class="w-[150px] h-[50px] flex items-center justify-center"
    >
      <img src="../../../assets/icons/logo.svg" />
    </NuxtLink>

    <div class="hidden md:flex gap-5 flex-row">
        <div v-for="item in pages" :key="item?.id">
            <NuxtLink :to="item?.slug">
                <p class="text-dark text-xl font-semibold">{{ item?.title }}</p>
            </NuxtLink>
        </div>
    </div>

    <div class="items-center gap-5 hidden md:flex">
        <!-- Contact Info -->
        <div class="flex items-center gap-3">
            <img src="../../../assets/icons/phone.svg"/>
            <div>
                <p>{{ $t('header.needHelp') }}</p>
                <NuxtLink to="tel:+996 247-1680">
                    +996 247-1680
                </NuxtLink>
            </div>
        </div>

        <!-- Language Switcher for Desktop -->
        <USelectMenu
          v-model="selectedLanguage"
          :options="languageOptions"
          value-attribute="value"
          option-attribute="label"
          class="w-32"
        >
          <template #label>
            <span class="flex items-center gap-2">
              <UIcon :name="selectedLanguage?.icon || 'i-heroicons-language'" class="w-4 h-4" />
              {{ selectedLanguage?.label }}
            </span>
          </template>
        </USelectMenu>
    </div>

    <div class="flex md:hidden items-center gap-3">
      <!-- Language Switcher for Mobile -->
      <USelectMenu
        v-model="selectedLanguage"
        :options="languageOptions"
        value-attribute="value"
        option-attribute="label"
        class="w-28"
        size="sm"
      >
        <template #label>
          <span class="flex items-center gap-1.5">
            <UIcon :name="selectedLanguage?.icon || 'i-heroicons-language'" class="w-3.5 h-3.5" />
            <span class="text-sm">{{ selectedLanguage?.label }}</span>
          </span>
        </template>
      </USelectMenu>

      <!-- Burger Menu -->
      <div
        class="grid cursor-pointer justify-items-center gap-1.5 lg:hidden"
        @click="isBurgerOpen = !isBurgerOpen"
      >
        <div
          :class="{ 'translate-y-2.5 rotate-45': isBurgerOpen }"
          class="h-1 w-8 rounded-full bg-primary transition-transform"
        ></div>
        <div
          :class="{ 'scale-x-0': isBurgerOpen }"
          class="h-1 w-8 rounded-full bg-primary transition-transform"
        ></div>
        <div
          :class="{ '-translate-y-2.5 -rotate-45': isBurgerOpen }"
          class="h-1 w-8 rounded-full bg-primary transition-transform"
        ></div>
      </div>
    </div>

    <Teleport to="body">
        <Transition name="fade-in-out">
            <TheBurger v-if="isBurgerOpen"/>
        </Transition>
    </Teleport>
  </div>
</template>

<style scoped></style>