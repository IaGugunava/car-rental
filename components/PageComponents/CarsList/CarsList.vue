<script setup lang="ts">
import CarCard from '../CarSlider/parts/CarCard.vue';

const { locale } = useI18n();

// const router = useRouter();
const route = useRoute();

const pagination = ref({
  pageNumber: Number(route?.query?.page) || 1,
  maxPages: 5,
  perPage: 12
});

const { data, error } = await apiFetch(
  `/api/cars?locale=${locale.value}&populate=image&pagination[page]=${pagination.value?.pageNumber}&pagination[pageSize]=${pagination.value?.perPage}`
);

const carsData = computed(() => (!error.value ? data?.value?.data : null));

// const filteredLength = ref(carsData?.value?.length);

// const onClickHandler = (page: number) => {
//   router.push({ query: { ...route?.query, page } });
// };
</script>

<template>
    <div class="grid-container">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div v-for="item in carsData" :key="item?.id">
                <CarCard class="h-full" :data="item"/>
            </div>
        </div>

        <div
        class="flex items-center justify-center gap-2 [&_.active-page]:!rounded-card-radius-corner-050 [&_.active-page]:bg-color-background-brand-primary-bold [&_.active-page]:!text-white [&_.first-button]:!hidden md:[&_.first-button]:!flex [&_.last-button]:!hidden md:[&_.last-button]:!flex [&_.number-buttons]:!hidden md:[&_.number-buttons]:!flex [&_.paginate-buttons]:m-1 [&_.paginate-buttons]:flex [&_.paginate-buttons]:h-10 [&_.paginate-buttons]:w-10 [&_.paginate-buttons]:items-center [&_.paginate-buttons]:justify-center [&_.paginate-buttons]:text-color-text-primary [&_.pagination-container]:w-full [&_.pagination-container]:justify-between md:[&_.pagination-container]:w-auto md:[&_.pagination-container]:justify-start"
      >
        <!-- <vue-awesome-paginate
          v-model="pagination.pageNumber"
          :total-items="filteredLength"
          :items-per-page="pagination.perPage"
          :max-pages-shown="5"
          @click="onClickHandler(pagination.pageNumber)"
        > -->
          <!-- <template #prev-button>
            <div
              v-show="pagination.pageNumber > 1"
              class="ml-8 flex gap-sizing-rem-0-5rem py-sizing-rem-0-25rem pl-5 pr-3 md:block md:gap-0 md:py-0 md:pl-0 md:pr-0"
            >
              <base-icon icon="littleArrow" class="shrink-0 rotate-180" color="#44546F" :width="24" :height="24" />
              <p class="b14 block text-color-text-primary md:hidden">
                {{ $t("previous") }}
              </p>
            </div>
          </template>

          <template #next-button>
            <div
              v-show="pagination.pageNumber != isLastPage"
              class="mr-12 flex gap-sizing-rem-0-5rem py-sizing-rem-0-25rem pl-5 pr-3 md:mr-0 md:block md:gap-0 md:py-0 md:pl-0 md:pr-0"
            >
              <p class="b14 block text-color-text-primary md:hidden">{{ $t("next") }}</p>
              <base-icon icon="littleArrow" class="shrink-0" color="#44546F" :width="24" :height="24" />
            </div>
          </template> -->
        <!-- </vue-awesome-paginate> -->
      </div>
    </div>
</template>

<style scoped>

</style>