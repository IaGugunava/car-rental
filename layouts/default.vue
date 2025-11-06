<script setup lang="ts">
import TheHeader from '~/components/LayoutComponents/header/TheHeader.vue';
import TheFooter from '~/components/LayoutComponents/footer/TheFooter.vue';

</script>

<template>
    <div>
        <TheHeader/>
            <slot/>
        <TheFooter/>
    </div>
</template>