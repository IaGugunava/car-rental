<script setup lang="ts">
import CarModal from "~/components/CommonComponents/CarModal.vue";
import Gallery from "~/components/CommonComponents/Gallery.vue";
import CustomButton from "~/components/UIComponents/CustomButton.vue";
import CustomEditor from "~/components/UIComponents/CustomEditor.vue";
import CustomModal from "~/components/UIComponents/CustomModal.vue";
import CarAdditionalDetails from "~/components/PageComponents/CarInner/CarAdditionalDetails.vue";

const props = defineProps<{
  car: any;
}>();

const isModalOpen = ref(false);

const { $strapiMedia } = useNuxtApp();

const carsMedia = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return $strapiMedia(url);
};

const galleryData = computed(() => {
  return props.car?.image?.length > 1 ? props.car?.image?.slice(1) : [];
});

</script>

<template>
  <div class="grid-container">
    <div class="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 md:mb-8 items-start sm:items-center gap-3">
      <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-primary">{{ car?.name }}</h1>

      <div class="w-full sm:w-auto">
        <CustomButton :text="$t('carInner.bookCar')" @click="isModalOpen = true" />
      </div>
    </div>
    <div class="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6 md:mb-8">
      <div class="w-full lg:w-1/2">
        <div class="mb-4 sm:mb-6 md:mb-8">
          <h2 class="text-lg sm:text-xl font-semibold text-dark mb-3">{{ $t('carInner.pricing') }}</h2>
          <div class="flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
            <div class="flex items-center gap-2">
              <span class="text-base sm:text-lg font-medium text-primary">{{ car?.price }}$</span>
              <span class="text-sm sm:text-base text-dark">{{ $t('carInner.perDay') }}</span>
            </div>
            <div v-if="car?.price3_6days" class="flex items-center gap-2">
              <span class="text-base sm:text-lg font-medium text-primary">{{ car?.price3_6days }}$</span>
              <span class="text-sm sm:text-base text-dark">{{ $t('carInner.per3to6Days') }}</span>
            </div>
            <div v-if="car?.price7ormore" class="flex items-center gap-2">
              <span class="text-base sm:text-lg font-medium text-primary">{{ car?.price7ormore }}$</span>
              <span class="text-sm sm:text-base text-dark">{{ $t('carInner.per7orMoreDays') }}</span>
            </div>
          </div>

          <div v-if="car?.priceDriver || car?.priceDriver3_6days || car?.priceDriver7days"
            class="mt-4 pt-4 border-t border-gray-200">
            <h3 class="text-base sm:text-lg font-semibold text-dark mb-2">{{ $t('carInner.withDriver') }}</h3>
            <div class="space-y-2">
              <div v-if="car?.priceDriver" class="flex items-center gap-2">
                <span class="text-base sm:text-lg font-medium text-primary">{{ car?.priceDriver }}$</span>
                <span class="text-sm sm:text-base text-dark">{{ $t('carInner.perDay') }}</span>
              </div>
              <div v-if="car?.priceDriver3_6days" class="flex items-center gap-2">
                <span class="text-base sm:text-lg font-medium text-primary">{{ car?.priceDriver3_6days }}$</span>
                <span class="text-sm sm:text-base text-dark">{{ $t('carInner.per3to6Days') }}</span>
              </div>
              <div v-if="car?.priceDriver7days" class="flex items-center gap-2">
                <span class="text-base sm:text-lg font-medium text-primary">{{ car?.priceDriver7days }}$</span>
                <span class="text-sm sm:text-base text-dark">{{ $t('carInner.per7orMoreDays') }}</span>
              </div>
            </div>
          </div>

          <div v-if="car?.airport" class="mt-4 pt-4 border-t border-gray-200">
            <h3 class="text-base sm:text-lg font-semibold text-dark mb-2">{{ $t('carInner.airportTransfer') }}</h3>
            <div class="flex items-center gap-2">
              <span class="text-base sm:text-lg font-medium text-primary">{{ car?.airport }}$</span>
            </div>
          </div>
        </div>
        <div class="w-full">
          <NuxtImg class="aspect-[1920/1080] rounded-lg h-full w-full object-cover" :src="carsMedia(
            car?.image?.[0]?.formats?.large?.url ||
            car?.image?.[0]?.formats?.thumbnail?.url
          )
            " />
          <Gallery :gallery-data="galleryData" />
        </div>
      </div>
      <div class="w-full lg:w-1/2">
        <CarAdditionalDetails :car="car" />
      </div>


    </div>

    <div>
      <CustomEditor :data="car?.description" />
    </div>
  </div>

  <Teleport to="body">
    <Transition name="fade">
      <!-- Modal content would go here -->
      <CustomModal v-if="isModalOpen" :title="$t('carModal.title')" width="600px" @close="isModalOpen = false">
        <CarModal :car-id="car?.id" />
      </CustomModal>
    </Transition>

  </Teleport>
</template>

<style scoped></style>
