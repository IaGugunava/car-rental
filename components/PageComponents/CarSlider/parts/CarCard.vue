<script setup lang="ts">
import FuelSvg from '~/components/SvgComponents/FuelSvg.vue';
import GearSvg from '~/components/SvgComponents/GearSvg.vue';
import SeatSvg from '~/components/SvgComponents/SeatSvg.vue';
import CustomButton from '~/components/UIComponents/CustomButton.vue';
import CustomModal from '~/components/UIComponents/CustomModal.vue';
import CarModal from '~/components/CommonComponents/CarModal.vue';

const props = defineProps<{
  data: any;
}>();

const { $strapiMedia } = useNuxtApp();

const carsMedia = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return $strapiMedia(url);
};

const isModalOpen = ref(false)
</script>

<template>
  <div>
    <div class="p-6 bg-gray-light rounded-xl h-full">
      <div class="w-full">
        <NuxtImg
          class="aspect-[480/240] rounded-lg h-full w-full object-cover"
          :src="
            carsMedia(
              data?.image?.[0]?.formats?.large?.url ||
                data?.image?.[0]?.formats?.thumbnail?.url
            )
          "
        />
      </div>

      <div class="mt-5 flex gap-10 flex-col">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-2xl text-primary font-semibold">
              {{ data?.name }}
            </p>

            <p class="text-gray-dark text-base">
              {{ data?.type }}
            </p>
          </div>
          <div class="flex flex-col items-end">
            <p class="text-2xl text-primary font-semibold">
              ${{ data?.price }}
            </p>
            <p class="text-gray-dark text-base">Price per day</p>
          </div>
        </div>

        <div class="flex w-full justify-between items-center">
          <div class="flex gap-2">
            <GearSvg class="w-6 h-6"/>
            <p>{{ data?.transmission }}</p>
          </div>

          <div class="flex gap-2">
            <FuelSvg class="w-6 h-6"/>
            <p>{{ data?.fuel }}</p>
          </div>

          <div class="flex gap-2">
            <SeatSvg class="w-6 h-6"/>
            <p>{{ data?.seats }}</p>
            <p>seats</p>
          </div>
        </div>

        <div class="flex w-full flex-col gap-2">
          <CustomButton class="w-full" text="Book the car already" @click="isModalOpen = true" />
          <NuxtLink class="w-full" :to="getSingleUrl('cars', data)">
            <CustomButton class="w-full" text="view details" :type="3" />
          </NuxtLink>
        </div>
      </div>

    </div>

    <Teleport to="body">
    <Transition name="fade">
      <!-- Modal content would go here -->
       <CustomModal
        v-if="isModalOpen"
        title="Book Car"
        width="600px"
        @close="isModalOpen = false"
      >
      <CarModal :car-id="data?.id"/>
    </CustomModal>
    </Transition>

  </Teleport>
  </div>
</template>

<style scoped></style>
