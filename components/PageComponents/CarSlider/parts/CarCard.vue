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

// CREATE DATABASE carrentalstrapidb;
// CREATE USER carrentalstrapiuser WITH PASSWORD 'StrapiApi';
// GRANT ALL PRIVILEGES ON DATABASE carrentalstrapidb TO carrentalstrapiuser;
// ALTER ROLE carrentalstrapiuser SET client_encoding TO 'utf8';
// ALTER ROLE carrentalstrapiuser SET default_transaction_isolation TO 'read committed';
// ALTER ROLE carrentalstrapiuser SET timezone TO 'UTC';
// \q

// pgloader sqlite:////home/ia/Desktop/my-project/car-rental/car-rental-strapi/.tmp/data.db postgresql://carrentalstrapiuser:StrapiApi@localhost/carrentalstrapidb
// /home/ia/Desktop/my-project/car-rental/car-rental-strapi/.tmp/data.db
// sudo -u postgres psql -d carrentalstrapidb
</script>

<template>
  <div>
    <div class="p-6 bg-gray-light rounded-xl h-full">
      <div class="w-full">
        <NuxtImg
          class="aspect-[1920/1080] rounded-lg h-full w-full object-cover"
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

            <p class="text-dark text-base">
              {{ data?.type }}
            </p>
          </div>
          <div class="flex flex-col items-end">
            <p class="text-2xl text-primary font-semibold">
              ${{ data?.price }}
            </p>
            <p class="text-dark text-base">{{ $t('carCard.pricePerDay') }}</p>
          </div>
        </div>

        <div class="flex w-full justify-between items-center">
          <div class="flex gap-2">
            <GearSvg class="w-6 h-6 [&_path]:stroke-primary"/>
            <p>{{ data?.transmission }}</p>
          </div>

          <div class="flex gap-2">
            <FuelSvg class="w-6 h-6 [&_path]:stroke-primary"/>
            <p>{{ data?.fuel }}</p>
          </div>

          <div class="flex gap-2">
            <SeatSvg class="w-6 h-6 [&_path]:stroke-primary"/>
            <p>{{ data?.seats }}</p>
            <p>{{ $t('carCard.seats') }}</p>
          </div>
        </div>

        <div class="flex w-full flex-col gap-2">
          <CustomButton class="w-full" :text="$t('carCard.bookCar')" @click="isModalOpen = true" />
          <NuxtLink class="w-full" :to="getSingleUrl('cars', data)">
            <CustomButton class="w-full" :text="$t('carCard.viewDetails')" :type="3" />
          </NuxtLink>
        </div>
      </div>

    </div>

    <Teleport to="body">
    <Transition name="fade">
      <!-- Modal content would go here -->
       <CustomModal
        v-if="isModalOpen"
        :title="$t('carModal.title')"
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

