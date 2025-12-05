<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
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

// Validation rules
const rules = {
  name: {
    required: helpers.withMessage(() => t('contactForm.validation.nameRequired'), required),
  },
  email: {
    required: helpers.withMessage(() => t('contactForm.validation.emailRequired'), required),
    email: helpers.withMessage(() => t('contactForm.validation.emailInvalid'), email),
  },
  phone: {
    required: helpers.withMessage(() => t('contactForm.validation.phoneRequired'), required),
  },
  message: {
    required: helpers.withMessage(() => t('contactForm.validation.messageRequired'), required),
  },
};

const v$ = useVuelidate(rules, contactFormData);

const success = ref(false);
const error = ref("");

const config = useRuntimeConfig();
const { sendEmail } = useEmailJS();

const submitForm = async () => {
  console.log("Form submitted:", contactFormData);
  error.value = "";
  success.value = false;

  // Validate form
  const isValid = await v$.value.$validate();
  
  if (!isValid) {
    error.value = t('contactForm.validation.fillAllFields');
    return;
  }

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
    
    // Reset form
    contactFormData.name = "";
    contactFormData.email = "";
    contactFormData.phone = "";
    contactFormData.message = "";
    v$.value.$reset();
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
      :placeholder="$t('contactForm.placeholders.name')"
      :error="v$.name.$errors[0]?.$message"
      @blur="v$.name.$touch()"
    />
    <CustomInput
      v-model="contactFormData.email"
      type="email"
      :label="$t('contactForm.labels.email')"
      :placeholder="$t('contactForm.placeholders.email')"
      :error="v$.email.$errors[0]?.$message"
      @blur="v$.email.$touch()"
    />
    <CustomInput
      v-model="contactFormData.phone"
      :label="$t('contactForm.labels.phone')"
      :placeholder="$t('contactForm.placeholders.phone')"
      :error="v$.phone.$errors[0]?.$message"
      @blur="v$.phone.$touch()"
    />
    <CustomTextArea
      v-model="contactFormData.message"
      :placeholder="$t('contactForm.placeholders.message')"
      :error="v$.message.$errors[0]?.$message"
      textarea
      @blur="v$.message.$touch()"
    />
    <CustomButton :text="$t('contactForm.submit')" @click="submitForm">Submit</CustomButton>
    <div v-if="success" class="text-green-500">{{ $t('contactForm.success') }}</div>
    <div v-if="error" class="text-red-500">{{ error }}</div>
  </div>
</template>

<style scoped></style>
