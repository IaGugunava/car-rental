<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
//@ts-ignore
import FsLightbox from "fslightbox-vue";

import "swiper/css";
import Arrow from "../SvgComponents/Arrow.vue";

const props = defineProps<{
  galleryData: any;
}>();


const galleriesData = computed(() => props.galleryData);

const sources = computed(() => {
  return galleriesData.value?.map((el: any) =>
    el?.video ? el.video : galleriesMedia(el?.formats?.large?.url || el?.formats?.medium?.url || el?.formats?.small?.url || el?.formats?.thumbnail?.url)
  );
});

const { $strapiMedia } = useNuxtApp();

const galleriesMedia = (url: string) => {
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return $strapiMedia(url);
};

const swiperKey = ref(0);
const show = ref(false);
const index = ref(0);

function openLightbox(i: number) {
console.log("opened", i);
  index.value = i;
  show.value = !show.value;
}

onMounted(() => {
  swiperKey.value++;
});


</script>

<template>
  <div class="py-20 overflow-x-hidden" v-if="galleriesData?.length" @click="test">
    <div class="relative">
        <ClientOnly>
            <swiper-container
              class="gallery-swiper"
              :key="swiperKey"
              :slides-per-view="2"
              :space-between="24"
              :loop="true"
              :navigation="{
                nextEl: '.gallery-slider-next',
                prevEl: '.gallery-slider-prev',
                }"
                :breakpoints="{
                  0: {
                    slidesPerView: 1,
                  },
                  480: {
                    slidesPerView: 2,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 2,
                  },
                  1280: {
                    slidesPerView: 3,
                  },
                  1920: {
                    slidesPerView: 3,
                  }
                }"
            >
              <swiper-slide
                v-for="(item, index) in galleriesData"
                :key="item?.id"
                @click="openLightbox(index)"
              >
                <NuxtImg
                  class="aspect-[351/296] h-full w-full object-cover sm:aspect-[768/432] 2xl:aspect-[1920/1080]"
                  :src="galleriesMedia(item?.formats?.thumbnail?.url || item?.formats?.small?.url)"
                />
              </swiper-slide>
            </swiper-container>
        </ClientOnly>

        <div
        class="pointer-events-none left-0 z-30 my-auto flex w-full items-center gap-2 px-3 absolute top-1/2 mt-0 justify-between"
      >
        <div
          class="gallery-slider-prev bg-white flex justify-center items-center rounded-full pointer-events-auto -rotate-180 cursor-pointer xl:h-10 xl:w-10 [&_path]:stroke-grey-3 [&_svg]:h-full [&_svg]:w-full"
        >
          <Arrow class="p-3 h-3 w-3 [&_svg]:w-full [&_svg]:h-full"/>
        </div>
  
        <div
          class="gallery-slider-next bg-white flex justify-center items-center rounded-full pointer-events-auto cursor-pointer xl:h-10 xl:w-10 [&_path]:stroke-grey-3 [&_svg]:h-full [&_svg]:w-full"
        >
          <Arrow class="p-3 h-3 w-3 [&_svg]:w-full [&_svg]:h-full"/>
        </div>
      </div>
  
      <!-- <vue-easy-lightbox
        :visible="show"
        :imgs="sources"
        :index="index"
        @hide="show = false"
        :loop="true"
        :move-disabled="true"
        :zoom-disabled="true"
        :rotate-disabled="true"
        teleport="body"
        class="[&_.vel-img]:!scale-150 lg:[&_.vel-img]:scale-200"
      >
      </vue-easy-lightbox> -->

      <FsLightbox
        class="[&_.fslightbox-source]:object-contain lg:[&_.fslightbox-source]:!w-[1280px] lg:[&_.fslightbox-source]:!h-[720px] [&_.fslightbox-video]:!scale-100"
        :toggler="show"
        :sources="sources"
        :slide="index + 1"
      >
        
      </FsLightbox>
    </div>
  </div>
</template>

<style>
.swiper-wrapper {
  overflow: visible !important;
}

.gallery-swiper .swiper-slide-next,
.gallery-swiper .swiper-slide-prev {
  opacity: 0.8;
  transition: all 500ms ease-in-out;
}

.vel-img{
  transform: scale(2);
}

@media(max-width: 1024px){
  .vel-img{
    transform: scale(1.5);
  }
}

.swiper-button-prev svg path, .swiper-button-next svg path{
    stroke: #4B5563;
}
</style>
