<script setup lang="ts">
import ContactForm from '~/components/PageComponents/ContactForm/ContactForm.vue';
import ContactMap from '~/components/PageComponents/ContactMap/ContactMap.vue';


</script>

<template>
    <div class="grid-container">
        <h1 class="text-3xl font-bold text-dark">contact us</h1>
        <div class="flex flex-col-reverse md:flex-row w-full gap-24 items-start mt-4">
            <ContactMap class="w-full md:w-1/2 flex-1"/>
            <ContactForm class="w-full md:w-1/2 flex-1"/>
        </div>
    </div>
</template>

<style scoped>

</style>