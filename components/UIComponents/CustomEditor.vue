<script setup lang="ts">
import { marked } from 'marked'

const props = defineProps<{
  data: any;
}>();

const editorContent = computed(() => props?.data ? props?.data : null)
const htmlContent = computed(() => editorContent.value ? marked.parse(editorContent.value) : null)
</script>

<template>
  <div>
    <div
      class="[&_p]:text-lg [&_p]:text-dark [&_strong]:py-4 [&_img]:aspect-[375/296] [&_ul]:py-4 [&_ol]:py-4 md:[&_img]:aspect-[1920/1020] [&_img]:my-8 [&_img]:h-full [&_img]:w-full [&_img]:object-cover [&_img]:rounded-xl [&_ol]:list-decimal [&_ol_li]:marker:text-primary [&_ol_li]:marker:font-bold [&_ul_li]:relative [&_ul_li]:pl-[40px] [&_ul_li]:before:absolute [&_ul_li]:before:left-2 [&_ul_li]:before:top-2 [&_ul_li]:before:block [&_ul_li]:before:size-2 [&_ul_li]:before:rounded-sm [&_ul_li]:before:bg-primary"
      v-html="htmlContent"
    ></div>
  </div>
</template>

<style>
pre{
  text-wrap: pretty;
}</style>
