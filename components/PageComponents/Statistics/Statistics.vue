<script setup lang="ts">

defineOptions({
  ssr: false
})

const { locale } = useI18n();

const { data, execute, error } = await apiFetch(
  `/api/statistics?locale=${locale.value}`
);

const statisticsData = computed(() => !error?.value ? data?.value?.data : null)

const stats = computed(() => statisticsData?.value?.map((e: any) => e?.amount));

const finishValues = computed(() => stats?.value?.map((e: any) => e?.value));

// const stationaryState = computed(() => stats?.value?.filter((el: any) => el?.value?.includes("/"))?.[0]?.value);

const duration = ref(4000);
const displayedValues = ref([0, 0, 0, 0]);
const statsRef = ref();
const rectTop = ref();
const stopDisplay = ref(false);

const animateValues = () => {
  displayedValues.value.forEach((el: any, index: number) => {
    const value = finishValues.value?.[index];
    const start = 0;
    let startTime: number | null = null;
    if (value?.includes("/")) return;
    const stopValue = Number(value?.replace(/,/g, ""));

    const animate = (timestamp: number) => {
      if (typeof el === "string") return;
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const normalizedTime = Math.min(progress / duration.value, 1);

      const easedProgress = easeOut(normalizedTime);
      const current = Math.min(start + easedProgress * stopValue, stopValue);

      displayedValues.value[index] = Math.floor(current);

      if (current < stopValue) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  });
};

const easeOut = (x: number) => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};


watch(
  locale,
  async () => {
    await execute();
    if (error.value) {
      console.log(error.value);
    }
  },
  {
    immediate: true,
  }
);

watch(
  rectTop,
  (n: any) => {
    console.log("triggered")
    if (typeof window === "undefined" || stopDisplay.value) return;
    if (n < window.innerHeight) {
      stopDisplay.value = true;
      animateValues();
    }
  },
  {
    immediate: true
  }
);

onBeforeMount(() => {
  console.log("mounted run")
  window.addEventListener("scroll", () => {
    rectTop.value = statsRef.value?.getBoundingClientRect()?.top;
  });
  rectTop.value = statsRef.value?.getBoundingClientRect()?.top;
});

</script>

<template>
    <div ref="statsRef" class="grid-container py-[60px] flex justify-between">
      {{ rectTop }}
        <div v-for="(item, index) in statisticsData" :key="item?.id" class="">
            <h2 class="text-3xl text-primary font-bold">{{ displayedValues[index] }}+</h2>
            <h3 class="text-xl text-gray-dark mt-2">{{ item?.title }}</h3>
        </div>
    </div>
</template>

<style scoped>

</style>