<script setup lang="ts">
import CarModal from "~/components/CommonComponents/CarModal.vue";
import Gallery from "~/components/CommonComponents/Gallery.vue";
import CustomButton from "~/components/UIComponents/CustomButton.vue";
import CustomEditor from "~/components/UIComponents/CustomEditor.vue";
import CustomModal from "~/components/UIComponents/CustomModal.vue";

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
    <div class="flex gap-6">
      <div class="w-1/2">
        <h1 class="text-3xl font-bold mb-4 text-primary">{{ car?.name }}</h1>
        <h2 class="text-xl font-semibold text-dark">{{ car?.price }}$ / day</h2>
        <div class="w-full">
          <NuxtImg
            class="aspect-[480/240] rounded-lg h-full w-full object-cover"
            :src="
              carsMedia(
                car?.image?.[0]?.formats?.large?.url ||
                  car?.image?.[0]?.formats?.thumbnail?.url
              )
            "
          />
          <Gallery :gallery-data="galleryData" />
        </div>
      </div>
      <div>
        <CustomButton text="book the car already" @click="isModalOpen = true"/>
      </div>

    </div>

    <div>
      <CustomEditor :data="car?.description" />
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
      <CarModal/>
    </CustomModal>
    </Transition>

  </Teleport>
</template>

<style scoped></style>
