<script setup lang="ts">
import FuelSvg from '~/components/SvgComponents/FuelSvg.vue';
import GearSvg from '~/components/SvgComponents/GearSvg.vue';
import SeatSvg from '~/components/SvgComponents/SeatSvg.vue';
import CustomButton from '~/components/UIComponents/CustomButton.vue';

const props = defineProps<{
  data: any;
}>();

const { $strapiMedia } = useNuxtApp();

const carsMedia = (url: string) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return $strapiMedia(url);
};
</script>

<template>
  <div>
    <div class="p-6 bg-gray-light rounded-xl">
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

        <div>
            <CustomButton text="view details"/>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped></style>
