<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core';
import { required, email, helpers } from '@vuelidate/validators';
import CustomButton from '~/components/UIComponents/CustomButton.vue';
import CustomInput from '~/components/UIComponents/CustomInput.vue';
import CustomTextArea from '../UIComponents/CustomTextArea.vue';

const { locale, t } = useI18n()

const props = defineProps<{
  carId: number;
}>();

const contactFormData = reactive({
  name: "",
  email: "",
  phone: "",
  message: "",
  date: {
    start: "",
    end: ""
  },
  startHour: "",
  startMinute: "",
  endHour: "",
  endMinute: ""
});

// Custom validators for time format
const isValidHour = helpers.withMessage(
  () => t('carModal.validation.invalidHour'),
  (value: string) => {
    if (!value) return true;
    const hour = parseInt(value);
    return !isNaN(hour) && hour >= 0 && hour <= 23;
  }
);

const isValidMinute = helpers.withMessage(
  () => t('carModal.validation.invalidMinute'),
  (value: string) => {
    if (!value) return true;
    const minute = parseInt(value);
    return !isNaN(minute) && minute >= 0 && minute <= 59;
  }
);

// Custom validator for date range
const hasDateRange = helpers.withMessage(
  () => t('carModal.validation.dateRequired'),
  (value: any) => {
    return value && value.start && value.end;
  }
);

// Validation rules
const rules = {
  name: { 
    required: helpers.withMessage(() => t('carModal.validation.nameRequired'), required) 
  },
  email: { 
    required: helpers.withMessage(() => t('carModal.validation.emailRequired'), required),
    email: helpers.withMessage(() => t('carModal.validation.emailInvalid'), email)
  },
  phone: { 
    required: helpers.withMessage(() => t('carModal.validation.phoneRequired'), required) 
  },
  date: {
    hasDateRange
  },
  startHour: { 
    required: helpers.withMessage(() => t('carModal.validation.startHourRequired'), required),
    isValidHour
  },
  startMinute: { 
    required: helpers.withMessage(() => t('carModal.validation.startMinuteRequired'), required),
    isValidMinute
  },
  endHour: { 
    required: helpers.withMessage(() => t('carModal.validation.endHourRequired'), required),
    isValidHour
  },
  endMinute: { 
    required: helpers.withMessage(() => t('carModal.validation.endMinuteRequired'), required),
    isValidMinute
  }
};

const v$ = useVuelidate(rules, contactFormData);

// Computed properties for formatted times
const startTime = computed(() => {
  if (contactFormData.startHour && contactFormData.startMinute) {
    return `${contactFormData.startHour.padStart(2, '0')}:${contactFormData.startMinute.padStart(2, '0')}`;
  }
  return '';
});

const endTime = computed(() => {
  if (contactFormData.endHour && contactFormData.endMinute) {
    return `${contactFormData.endHour.padStart(2, '0')}:${contactFormData.endMinute.padStart(2, '0')}`;
  }
  return '';
});

const success = ref(false);
const error = ref("");

// Format date and time for Strapi datetime field (ISO 8601)
const formatDateTime = (date: any, time: string) => {
  if (!date || !time) return null;
  
  // Convert CalendarDate to JS Date
  let dateObj: Date;
  if (typeof date === 'string') {
    dateObj = new Date(date);
  } else if (date instanceof Date) {
    dateObj = date;
  } else {
    // CalendarDate has year, month, day properties
    dateObj = new Date(date.year, date.month - 1, date.day);
  }
  
  // Parse the time (HH:MM)
  const [hours, minutes] = time.split(':');
  
  // Set the time on the date object
  dateObj.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  
  // Return ISO 8601 format (e.g., "2024-11-06T14:30:00.000Z")
  return dateObj.toISOString();
};

const submitForm = async () => {
  console.log("Form submitted:", contactFormData);
  error.value = "";
  success.value = false;

  // Validate form
  const isFormValid = await v$.value.$validate();
  
  if (!isFormValid) {
    error.value = t('carModal.validation.fillAllFields');
    return;
  }

  // Format start and end datetime for Strapi
  const startDateTime = formatDateTime(contactFormData.date.start, startTime.value);
  const endDateTime = formatDateTime(contactFormData.date.end, endTime.value);

  // Validation
  // if (!startDateTime || !endDateTime) {
  //   error.value = t('carModal.validationError');
  //   return;
  // }

  try {
    const res = await apiFetchForm("/api/bookings?populate=car", {
      body: {
        data: {
          name: contactFormData.name,
          email: contactFormData.email,
          phone: contactFormData.phone,
          message: contactFormData.message,
          car: props.carId,
          start: startDateTime,
          finish: endDateTime,
        },
      }
    });

    console.log("Response:", res);

    // Send email notification via EmailJS
    const config = useRuntimeConfig();
    const { sendEmail } = useEmailJS();
    const templateId = config.public.emailjsBookingTemplateId as string;
    
    if (templateId) {
      // Get car name from response, fallback to car ID
      const carName = res?.data?.car?.name || props.carId || 'N/A';
      
      // Format dates for email
      const formatDateForEmail = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleDateString(locale.value, { month: 'short', day: 'numeric', year: 'numeric' });
      };
      
      const formatTimeForEmail = (dateStr: string) => {
        const d = new Date(dateStr);
        return d.toLocaleTimeString(locale.value, { hour: '2-digit', minute: '2-digit' });
      };
      
      const startFormatted = `${formatDateForEmail(startDateTime)} ${formatTimeForEmail(startDateTime)}`;
      const finishFormatted = `${formatDateForEmail(endDateTime)} ${formatTimeForEmail(endDateTime)}`;
      
      await sendEmail(templateId, {
        name: contactFormData.name,
        email: contactFormData.email,
        phone: contactFormData.phone,
        car: carName || props.carId,
        start: startFormatted,
        finish: finishFormatted,
        message: contactFormData.message || '',
      });
    }

    success.value = true;
    
    // Reset form
    contactFormData.name = "";
    contactFormData.email = "";
    contactFormData.phone = "";
    contactFormData.message = "";
    contactFormData.date = { start: "", end: "" };
    contactFormData.startHour = "";
    contactFormData.startMinute = "";
    contactFormData.endHour = "";
    contactFormData.endMinute = "";
    
    v$.value.$reset();
  } catch (err: any) {
    error.value = t('carModal.error');
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <CustomInput
      v-model="contactFormData.name"
      :label="$t('carModal.labels.name')"
      :placeholder="$t('carModal.placeholders.name')"
      :error="v$.name.$errors[0]?.$message"
      @blur="v$.name.$touch()"
    />
    
    <CustomInput
      v-model="contactFormData.email"
      type="email"
      :label="$t('carModal.labels.email')"
      :placeholder="$t('carModal.placeholders.email')"
      :error="v$.email.$errors[0]?.$message"
      @blur="v$.email.$touch()"
    />
    
    <CustomInput
      v-model="contactFormData.phone"
      :label="$t('carModal.labels.phone')"
      :placeholder="$t('carModal.placeholders.phone')"
      :error="v$.phone.$errors[0]?.$message"
      @blur="v$.phone.$touch()"
    />
    
    <CustomTextArea
      v-model="contactFormData.message"
      :placeholder="$t('carModal.placeholders.message')"
      textarea
    />
    
    <!-- Date Range Picker -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        {{ $t('carModal.labels.selectDates') }}
      </label>
      <UCalendar 
        v-model="contactFormData.date" 
        :locale="locale"
        range
      />
      <div v-if="v$.date.$errors[0]" class="text-red-500 text-sm mt-1">
        {{ v$.date.$errors[0].$message }}
      </div>
    </div>

    <!-- Time Selectors -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Start Time -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('carModal.labels.startTime') }}
        </label>
        <div class="flex gap-2">
          <CustomInput
            v-model="contactFormData.startHour"
            type="number"
            min="0"
            max="23"
            :placeholder="$t('carModal.placeholders.hour')"
            :error="v$.startHour.$errors[0]?.$message"
            class="flex-1"
            @blur="v$.startHour.$touch()"
          />
          <CustomInput
            v-model="contactFormData.startMinute"
            type="number"
            min="0"
            max="59"
            :placeholder="$t('carModal.placeholders.min')"
            :error="v$.startMinute.$errors[0]?.$message"
            class="flex-1"
            @blur="v$.startMinute.$touch()"
          />
        </div>
        <div v-if="startTime" class="mt-2 text-sm text-gray-600">
          {{ $t('carModal.labels.selected') }}: {{ startTime }}
        </div>
      </div>

      <!-- End Time -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          {{ $t('carModal.labels.endTime') }}
        </label>
        <div class="flex gap-2">
          <CustomInput
            v-model="contactFormData.endHour"
            type="number"
            min="0"
            max="23"
            :placeholder="$t('carModal.placeholders.hour')"
            :error="v$.endHour.$errors[0]?.$message"
            class="flex-1"
            @blur="v$.endHour.$touch()"
          />
          <CustomInput
            v-model="contactFormData.endMinute"
            type="number"
            min="0"
            max="59"
            :placeholder="$t('carModal.placeholders.min')"
            :error="v$.endMinute.$errors[0]?.$message"
            class="flex-1"
            @blur="v$.endMinute.$touch()"
          />
        </div>
        <div v-if="endTime" class="mt-2 text-sm text-gray-600">
          {{ $t('carModal.labels.selected') }}: {{ endTime }}
        </div>
      </div>
    </div>

    <CustomButton :text="$t('carModal.submit')" @click="submitForm" />
    
    <div v-if="success" class="text-green-500">
      {{ $t('carModal.success') }}
    </div>
    <div v-if="error" class="text-red-500">
      {{ error }}
    </div>
  </div>
</template>

<style>
.ui-select-dropdown {
  z-index: 1003 !important;
}
</style>