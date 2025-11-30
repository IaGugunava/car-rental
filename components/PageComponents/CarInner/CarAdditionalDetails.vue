<script setup lang="ts">
const props = defineProps<{
  car: any;
}>();

const { t } = useI18n();

const getEnumTranslation = (type: string, value: string) => {
  const key = `enums.${type}.${value}`;
  return t(key);
};

const details = computed(() => [
  {
    icon: 'calendar',
    label: t('carDetails.year'),
    value: props.car?.year
  },
  {
    icon: 'transmission',
    label: t('carDetails.transmission'),
    value: getEnumTranslation('transmission', props.car?.transmission)
  },
  {
    icon: 'seats',
    label: t('carDetails.seats'),
    value: props.car?.seats
  },
  {
    icon: 'fuel',
    label: t('carDetails.fuel'),
    value: getEnumTranslation('fuel', props.car?.fuel)
  },
  {
    icon: 'type',
    label: t('carDetails.type'),
    value: getEnumTranslation('type', props.car?.type)
  },
  {
    icon: 'color',
    label: t('carDetails.color'),
    value: props.car?.color
  }
]);
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div v-for="detail in details" :key="detail.label"
      class="flex items-center gap-3 p-4 bg-gray-light dark:bg-gray-dark rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
      <!-- Calendar Icon -->
      <div v-if="detail.icon === 'calendar'" class="flex-shrink-0">
        <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      <!-- Transmission Icon -->
      <div v-else-if="detail.icon === 'transmission'" class="flex-shrink-0">
        <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </div>

      <!-- Seats Icon -->
      <div v-else-if="detail.icon === 'seats'" class="flex-shrink-0">
        <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      <!-- Fuel Icon -->
      <div v-else-if="detail.icon === 'fuel'" class="flex-shrink-0">
        <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      </div>

      <!-- Type Icon -->
      <div v-else-if="detail.icon === 'type'" class="flex-shrink-0">
        <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>

      <!-- Color Icon -->
      <div v-else-if="detail.icon === 'color'" class="flex-shrink-0">
        <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      </div>

      <div class="flex flex-col">
        <span class="text-xs text-dark uppercase tracking-wide">{{ detail.label }}</span>
        <span class="text-sm font-semibold text-dark">{{ detail.value }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
