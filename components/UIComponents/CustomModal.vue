<script setup lang="ts">
import CloseSvg from '../SvgComponents/CloseSvg.vue';

/**
 * @author Ia Gugunava
 */

defineProps<{
  title?: string;
  width?: string;
}>();

defineEmits<{
  (e: "close"): void;
}>();
</script>

<template>
  <div class="fixed left-0 top-0 z-[1001] h-full w-full">
    <div
      class="modal-wrapper absolute bottom-0 left-0 right-0 top-0 z-[1002] m-auto h-max w-full overflow-y-auto rounded-xl bg-white p-5 opacity-100"
      :style="{ 'max-width': width }"
      @click.stop
    >
      <div>
        <div class="relative flex items-center justify-between mb-6">
          <h3 v-if="title" class="text-dark">{{ title }}</h3>

          <div
            class="cursor-pointer [&_svg]:w-6 [&_svg]:h-6 [&_path]:fill-dark [&_path]:stroke-dark"
            @click="$emit('close')"
          >
          <CloseSvg/>
          </div>
        </div>
      </div>

      <div
      >
        <slot />
      </div>
    </div>

    <div
      class="fixed left-0 top-0 z-[1000] h-full w-full cursor-pointer bg-dark opacity-70"
      @click="$emit('close')"
    ></div>
  </div>
</template>

<style scoped></style>
