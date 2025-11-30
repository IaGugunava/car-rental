<script setup lang="ts">
import TheHeader from '~/components/LayoutComponents/header/TheHeader.vue';
import TheFooter from '~/components/LayoutComponents/footer/TheFooter.vue';

</script>

<template>
    <div class="w-full overflow-x-hidden">
        <TheHeader/>
            <slot/>
        <TheFooter/>
    </div>
</template>