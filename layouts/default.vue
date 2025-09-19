<script setup lang="ts">
import TheHeader from '~/components/LayoutComponents/header/TheHeader.vue';

</script>

<template>
    <div>
        <TheHeader/>
            <slot/>
        <TheFooter/>
    </div>
</template>