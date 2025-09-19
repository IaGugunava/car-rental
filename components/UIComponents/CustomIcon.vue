<template>
  <component :is="dynamicIcon" :class="[props?.class]" :width="width" :height="height" :color="color" />
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    icon: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    class?: any;
    height?: number;
    width?: number;
    color?: string;
  }>(),
  {
    color: "#1A75D1",
    class: "",
    height: 25,
    width: 25
  }
);

const iconModules = import.meta.glob('../../assets/icons/*.svg', { eager: true, import: 'default' })

const dynamicIcon = computed(() => {
  const path = `../../assets/icons/${props.icon}.svg`
  return iconModules[path] || null
})
</script>

<style scoped></style>
