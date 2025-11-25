<script setup lang="ts">
import LangSwitcher from './parts/LangSwitcher.vue';
import TheBurger from './parts/TheBurger.vue';
import logoHeaderLight from '~/assets/icons/logo-header-en.svg';
import logoHeaderDark from '~/assets/icons/logo-header-dark.svg';

const route = useRoute();
// const router = useRouter();
const { locale, locales, t } = useI18n();
// const switchLocalePath = useSwitchLocalePath();
const { isDark } = useTheme();
const isBurgerOpen = ref(false);

const logoSrc = computed(() => isDark.value ? logoHeaderDark : logoHeaderLight);

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

// Current selected language - use simple string value
// const selectedLanguage = ref(locale.value);

// // Watch for language changes and navigate to the new locale path
// watch(selectedLanguage, async (newLocale) => {
//   if (newLocale && newLocale !== locale.value) {
//     const newPath = switchLocalePath(newLocale);
//     await router.push(newPath);
//   }
// });

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

// Update selectedLanguage when locale changes
// watch(() => locale.value, (newLocale) => {
//   selectedLanguage.value = newLocale;
// });
</script>

<template>
  <div class="flex h-[104px] justify-between items-center px-[72px]">
    <NuxtLink
      to="/"
      class="w-[150px] h-[50px] flex items-center justify-center"
    >
      <ClientOnly>
        <img 
          :src="logoSrc" 
          :alt="`Logo ${locale}`" 
        />
        <template #fallback>
          <img 
            :src="logoHeaderLight" 
            :alt="`Logo ${locale}`" 
          />
        </template>
      </ClientOnly>
    </NuxtLink>

    <div class="hidden md:flex gap-5 flex-row">
        <div v-for="item in pages" :key="item?.id">
            <NuxtLink :to="`/${item?.slug}`">
                <p class="text-primary hover:text-dark transition-all upper duration-300 ease-in-out text-xl font-semibold">{{ item?.title }}</p>
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

        <!-- Theme Toggle -->
        <ThemeToggle/>

        <!-- Language Switcher for Desktop -->
        <LangSwitcher/>
    </div>

    
    <div class="flex md:hidden items-center gap-3">
      <!-- Theme Toggle for Mobile -->
      <ThemeToggle/>

      <!-- Language Switcher for Mobile -->
      <LangSwitcher/>

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


    <ClientOnly>
      <Teleport to="body">
          <Transition name="fade-in-out">
              <TheBurger v-if="isBurgerOpen"/>
          </Transition>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style scoped></style>