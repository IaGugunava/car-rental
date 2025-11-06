<!-- pages/test.vue -->
<template>
  <div>
    <h1>Test Page</h1>
    <button @click="test">Click Me</button>
    <div @click="test" style="background: red; padding: 50px; cursor: pointer;">
      Click This Div
    </div>
  </div>
</template>

<script setup>
const test = () => {
  console.log('CLICKED!');
  alert('It works!');
};

onMounted(() => {
  console.log('Script loaded on CLIENT');
});
</script>