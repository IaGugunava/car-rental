<script setup lang="ts">
import CustomButton from '~/components/UIComponents/CustomButton.vue';
import CustomInput from '~/components/UIComponents/CustomInput.vue';
import { apiFetchForm } from '#imports';
import CustomTextArea from '~/components/UIComponents/CustomTextArea.vue';

const { t } = useI18n();

const contactFormData = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const success = ref(false);
const error = ref("");

const config = useRuntimeConfig();
const { sendEmail } = useEmailJS();

const submitForm = async () => {
  // Handle form submission logic here
  console.log("Form submitted:", contactFormData);
  error.value = "";
  success.value = false;

  try {
    // Submit to Strapi
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

    // Send email notification via EmailJS
    const templateId = config.public.emailjsContactTemplateId as string;
    if (templateId) {
      await sendEmail(templateId, {
        name: contactFormData.name,
        email: contactFormData.email,
        phone: contactFormData.phone,
        message: contactFormData.message,
      });
    }

    success.value = true;
  } catch (err: any) {
    error.value = t('contactForm.error');
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 w-full">
    <CustomInput
      v-model="contactFormData.name"
      :label="$t('contactForm.labels.name')"
      :placeholder="$t('contactForm.placeholders.name')"/>
    <CustomInput
      v-model="contactFormData.email"
      :label="$t('contactForm.labels.email')"
      :placeholder="$t('contactForm.placeholders.email')"/>
      <CustomInput
      v-model="contactFormData.phone"
      :label="$t('contactForm.labels.phone')"
      :placeholder="$t('contactForm.placeholders.phone')"/>
    <CustomTextArea
      v-model="contactFormData.message"
      :placeholder="$t('contactForm.placeholders.message')"
      textarea/>
      <CustomButton :text="$t('contactForm.submit')" @click="submitForm">Submit</CustomButton>
    <div v-if="success" class="text-green-500">{{ $t('contactForm.success') }}</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
  </div>
</template>

<style scoped></style>
