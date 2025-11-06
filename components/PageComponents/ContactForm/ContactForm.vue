<script setup lang="ts">
import CustomButton from '~/components/UIComponents/CustomButton.vue';
import CustomInput from '~/components/UIComponents/CustomInput.vue';
import { apiFetchForm } from '#imports';
import CustomTextArea from '~/components/UIComponents/CustomTextArea.vue';

const contactFormData = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const success = ref(false);
const error = ref("");

const submitForm = async () => {
  // Handle form submission logic here
  console.log("Form submitted:", contactFormData);
  error.value = "";
  success.value = false;

  try {
    const res = await apiFetchForm("/api/contact-forms", {
      body: {
        data: {
          name: contactFormData.name,
          email: contactFormData.email,
          phone: contactFormData.phone,
          message: contactFormData.message,
        },
      }
    });

    console.log("Response:", res);
    success.value = true;
  } catch (err: any) {
    error.value = "Failed to send booking request.";
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <CustomInput
      v-model="contactFormData.name"
      label="Name"
      placeholder="Enter your name"/>
    <CustomInput
      v-model="contactFormData.email"
      label="Email"
      placeholder="Enter your email"/>
      <CustomInput
      v-model="contactFormData.phone"
      label="Phone"
      placeholder="Enter your phone number"/>
    <CustomTextArea
      v-model="contactFormData.message"
      placeholder="Enter your message"
      textarea/>
      <CustomButton text="submit form" @click="submitForm">Submit</CustomButton>
    <div v-if="success" class="text-green-500">Your message has been sent successfully!</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
  </div>
</template>

<style scoped></style>
