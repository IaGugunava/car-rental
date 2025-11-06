<script setup lang="ts">
import { Vue3SlideUpDown } from "vue3-slide-up-down";

const { locale } = useI18n();

const { data, error } = await apiFetch(
  `/api/faq?populate=items&locale=${locale.value}`
);

const contentData = computed(() => (!error.value ? data?.value?.data : null));

const faqItems = computed(() => contentData.value?.items);

const isActive = ref<boolean[]>([])

onMounted(() => {
  // initialize reactivity array
  isActive.value = Array(faqItems.value.length).fill(false)
})

const onQuestionClick = (index: number) => {
  // recreate array for reactivity
  console.log(index, "question clicked")
  isActive.value = isActive.value.map((v: any, i: number) => (i === index ? !v : false))
}
</script>

<template>
  <div class="grid-container py-10"
  >
   <div
      v-for="(item, index) in faqItems"
      :key="item.id"
      class="group cursor-pointer border-t border-gray-200 py-6 relative z-50"
      @click="onQuestionClick(index)"
    >
      <div class="relative flex w-full justify-between">
        <div>
          <h3
            class="pr-8 text-lg font-medium text-gray-900 transition-all duration-300 ease-in-out group-hover:text-gray-600"
          >
            {{ item.title }}
          </h3>

          <Vue3SlideUpDown v-model="isActive[index]" :duration="300">
            <p class="text-gray-600 mt-2">
              {{ item.teaser }}
            </p>
          </Vue3SlideUpDown>
        </div>

        <div class="absolute right-0 top-0 pl-6">
          <div class="transition-opacity duration-300 ease-in-out group-hover:opacity-70 relative">
            <div
              class="absolute left-0 top-0 transition-all duration-700 ease-in-out"
              :class="{ 'opacity-0': isActive[index] }"
            >
              <base-icon icon="plus" color="#FC5A40" :width="24" :height="24" />
            </div>
            <div
              class="absolute left-0 top-0 transition-opacity duration-700 ease-in-out"
              :class="{ 'opacity-0': !isActive[index] }"
            >
              <base-icon icon="minus" color="#FC5A40" :width="24" :height="24" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
