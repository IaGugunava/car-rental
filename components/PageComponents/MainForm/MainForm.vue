<template>
  <div class="w-full relative z-10 max-w-[1680px] mx-auto px-3 sm:px-4 md:px-6">
    <div
      class="flex flex-col lg:flex-row bg-white rounded-3xl lg:rounded-full shadow-lg p-3 sm:p-4 lg:p-6 pb-8 sm:pb-10 lg:pb-6 gap-3 sm:gap-4 lg:gap-0 relative">
      <!-- Name Input -->
      <div class="flex-1 min-w-0">
        <CustomInput v-model="formData.name" :has-border="false" :placeholder="$t('mainForm.placeholders.name')"
          :error="v$.name.$errors[0]?.$message" @blur="v$.name.$touch()" />
      </div>

      <!-- Divider - Hidden on mobile -->
      <div class="hidden lg:block w-[1px] h-[50px] bg-gray-dark mx-4"></div>

      <!-- Phone Input -->
      <div class="flex-1 min-w-0">
        <CustomInput v-model="formData.phone" :has-border="false" :placeholder="$t('mainForm.placeholders.phone')"
          :error="v$.phone.$errors[0]?.$message" @blur="v$.phone.$touch()" />
      </div>

      <!-- Divider - Hidden on mobile -->
      <div class="hidden lg:block w-[1px] h-[50px] bg-gray-dark mx-4"></div>

      <!-- Email Input -->
      <div class="flex-1 min-w-0">
        <CustomInput v-model="formData.email" type="email" :has-border="false"
          :placeholder="$t('mainForm.placeholders.email')" :error="v$.email.$errors[0]?.$message"
          @blur="v$.email.$touch()" />
      </div>

      <!-- Divider - Hidden on mobile -->
      <div class="hidden lg:block w-[1px] h-[50px] bg-gray-dark mx-4"></div>

      <!-- Date Range Picker -->
      <div class="flex-1 min-w-0 relative">
        <UPopover>
          <div
            class="h-full flex flex-col justify-center items-start lg:items-center text-base cursor-pointer px-3 py-2 lg:p-0"
            :class="{
              'text-dark': formData.date?.start && formData.date?.end,
              'text-[#626f86]': !(formData.date?.start || formData.date?.end),
              'border-red-500': v$.date.$errors.length > 0
            }" @blur="v$.date.$touch()">
            {{
              formData.date?.start && formData.date?.end
                ? `${formatDate(formData.date.start)} - ${formatDate(formData.date.end)}`
                : $t('mainForm.placeholders.selectDates')
            }}
          </div>

          <template #content>
            <div class="p-4">
              <UCalendar v-model="formData.date" :locale="locale" range />
            </div>
          </template>
        </UPopover>
        <transition name="fade-in-out">
          <p v-if="v$.date.$errors[0]"
            class="upper absolute left-0 top-full px-4 pt-1 text-[12px] text-[#FC5A40] whitespace-nowrap z-10">
            {{ v$.date.$errors[0].$message }}
          </p>
        </transition>
      </div>

      <!-- Divider - Hidden on mobile -->
      <div class="hidden lg:block w-[1px] h-[50px] bg-gray-dark mx-4"></div>

      <!-- Time Selectors Row -->
      <div class="flex flex-col lg:flex-row gap-2 flex-1 min-w-0 lg:min-w-[280px]">
        <!-- Start Time -->
        <div class="relative flex-1 min-w-0">
          <CustomInput ref="startTimeInput" v-model="formData.time.start" type="time" :has-border="false"
            :error="v$.time.start.$errors[0]?.$message"
            class="w-full cursor-pointer [&_input]:cursor-pointer [&_input::-webkit-calendar-picker-indicator]:absolute [&_input::-webkit-calendar-picker-indicator]:inset-0 [&_input::-webkit-calendar-picker-indicator]:w-full [&_input::-webkit-calendar-picker-indicator]:h-full [&_input::-webkit-calendar-picker-indicator]:opacity-0 [&_input::-webkit-calendar-picker-indicator]:cursor-pointer [&_input::-webkit-datetime-edit]:opacity-0 [&_input::-webkit-datetime-edit]:focus:opacity-100"
            @focus="startTimeFocused = true" @blur="startTimeFocused = false; v$.time.start.$touch()" />
          <!-- Custom Placeholder -->
          <span v-if="!formData.time.start && !startTimeFocused"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-[#626f86] pointer-events-none">
            {{ $t('mainForm.placeholders.startTime') }}
          </span>
        </div>

        <!-- Time Separator - Hidden on mobile -->
        <div class="hidden lg:flex items-center justify-center px-1">
          <span class="text-gray-400">-</span>
        </div>

        <!-- End Time -->
        <div class="relative flex-1 min-w-0">
          <CustomInput ref="endTimeInput" v-model="formData.time.end" type="time" :has-border="false"
            :error="v$.time.end.$errors[0]?.$message"
            class="w-full cursor-pointer [&_input]:cursor-pointer [&_input::-webkit-calendar-picker-indicator]:absolute [&_input::-webkit-calendar-picker-indicator]:inset-0 [&_input::-webkit-calendar-picker-indicator]:w-full [&_input::-webkit-calendar-picker-indicator]:h-full [&_input::-webkit-calendar-picker-indicator]:opacity-0 [&_input::-webkit-calendar-picker-indicator]:cursor-pointer [&_input::-webkit-datetime-edit]:opacity-0 [&_input::-webkit-datetime-edit]:focus:opacity-100"
            @focus="endTimeFocused = true" @blur="endTimeFocused = false; v$.time.end.$touch()" />
          <!-- Custom Placeholder -->
          <span v-if="!formData.time.end && !endTimeFocused"
            class="absolute left-3 top-1/2 -translate-y-1/2 text-[#626f86] pointer-events-none">
            {{ $t('mainForm.placeholders.endTime') }}
          </span>
        </div>
      </div>

      <!-- Divider - Hidden on mobile -->
      <div class="hidden lg:block w-[1px] h-[50px] bg-gray-dark mx-4"></div>

      <!-- Car Selection -->
      <div class="flex items-center justify-center lg:w-[400px] relative">
        <USelect v-model="formData.carId" :items="cars" :placeholder="$t('mainForm.placeholders.selectCar')"
          class="w-full text-base bg-transparent border-none ring-0 text-dark" @blur="v$.carId.$touch()" />
        <transition name="fade-in-out">
          <p v-if="v$.carId.$errors[0]"
            class="upper absolute left-0 top-full px-4 pt-1 text-[12px] text-[#FC5A40] whitespace-nowrap z-10">
            {{ v$.carId.$errors[0].$message }}
          </p>
        </transition>
      </div>

      <!-- Submit Button -->
      <div class="flex h-[50px] justify-center items-center cursor-pointer hover:opacity-80 transition-opacity lg:ml-4"
        @click="handleSubmit">
        <SubmitSvg class="w-6 h-6 text-primary" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import CustomInput from "~/components/UIComponents/CustomInput.vue";
import type { CalendarDate } from '@internationalized/date'
import SubmitSvg from "~/components/SvgComponents/SubmitSvg.vue";

const { locale } = useI18n();

interface Car {
  documentId: number;
  name: string;
  brand: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  date: {
    start: CalendarDate;
    end: CalendarDate;
  }
  time: {
    start: string;
    end: string;
  }
  carId: number | null;
}

const formData = reactive<FormData>({
  name: "",
  phone: "",
  email: "",
  date: {
    start: "",
    end: ""
  },
  time: {
    start: "",
    end: ""
  },
  carId: null,
});

// Watch for time input changes and validate format
watch(() => formData.time.start, (value: string) => {
  if (value && value.length === 5) {
    const [hours, minutes] = value.split(':');
    const h = parseInt(hours);
    const m = parseInt(minutes);
    if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
      formData.time.start = '';
    }
  }
});

watch(() => formData.time.end, (value: string) => {
  if (value && value.length === 5) {
    const [hours, minutes] = value.split(':');
    const h = parseInt(hours);
    const m = parseInt(minutes);
    if (isNaN(h) || isNaN(m) || h < 0 || h > 23 || m < 0 || m > 59) {
      formData.time.end = '';
    }
  }
});

const formatDate = (date: CalendarDate | string) => {
  if (!date) return ''
  const d = new Date(date as any)
  return d.toLocaleDateString(locale.value, { month: 'short', day: 'numeric' })
}

const { t } = useI18n();

// Custom validator for date range
const hasDateRange = helpers.withMessage(
  () => t('mainForm.validation.dateRequired'),
  (value: { start: CalendarDate | string; end: CalendarDate | string }) => {
    return !!(value && value.start && value.end);
  }
);

// Custom validator for time fields
const hasTime = helpers.withMessage(
  () => t('mainForm.validation.timeRequired'),
  (value: string) => {
    return !!(value && value.length > 0);
  }
);

// Validation rules
const rules = {
  name: {
    required: helpers.withMessage(() => t('mainForm.validation.nameRequired'), required),
  },
  phone: {
    required: helpers.withMessage(() => t('mainForm.validation.phoneRequired'), required),
  },
  email: {
    required: helpers.withMessage(() => t('mainForm.validation.emailRequired'), required),
    email: helpers.withMessage(() => t('mainForm.validation.emailInvalid'), email),
  },
  date: {
    hasDateRange
  },
  time: {
    start: {
      hasTime
    },
    end: {
      hasTime
    }
  },
  carId: {
    required: helpers.withMessage(() => t('mainForm.validation.carRequired'), required),
  },
};

const v$ = useVuelidate(rules, formData);

// Fetch cars from Strapi
const cars = ref<Array<{ id: number; name: string }>>([]);
const loadingCars = ref(false);
const submitting = ref(false);

const toast = useToast();

// Fetch cars from Strapi
const fetchCars = async () => {
  loadingCars.value = true;
  try {
    const { data, error } = await apiFetch(
      `/api/cars?locale=${locale.value}&populate=image&pagination[limit]=100`
    );

    cars.value = !error.value
      ? data.value.data.map((car: Car) => ({
        value: car.documentId,
        label: `${car.name} ${car.brand}`,
      }))
      : null;
  } catch (error) {
    toast.add({
      title: t('mainForm.toast.error'),
      description: t('mainForm.toast.failedToLoadCars'),
    });
    console.error("Error fetching cars:", error);
  } finally {
    loadingCars.value = false;
  }
};

// Format date and time for Strapi datetime field (ISO 8601)
const formatDateTime = (date: CalendarDate | string, time: string) => {
  if (!date || !time) return null;

  // Convert CalendarDate to JS Date
  let dateObj: Date;
  if (typeof date === 'string') {
    dateObj = new Date(date);
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

const config = useRuntimeConfig();
const { sendEmail } = useEmailJS();

// Handle form submission
const handleSubmit = async () => {
  const isValid = await v$.value.$validate();

  if (!isValid) {
    toast.add({
      title: t('mainForm.toast.validationError'),
      description: t('mainForm.toast.fillAllFields'),
      color: 'error'
    });
    return;
  }

  submitting.value = true;

  try {
    // Format start and end datetime for Strapi
    const startDateTime = formatDateTime(formData.date?.start, formData.time.start);
    const endDateTime = formatDateTime(formData.date?.end, formData.time.end);

    // Prepare data for Strapi
    const bookingData = {
      data: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        start: startDateTime,
        finish: endDateTime,
        car: formData.carId,
      },
    };

    // Submit to Strapi
    await apiFetchForm("/api/bookings?populate=car", {
      body: JSON.stringify(bookingData),
    });

    // Get selected car name for email
    const selectedCar = cars.value.find((car: { value: number; label: string }) => car.value === formData.carId);
    const carName = selectedCar ? selectedCar.label : formData.carId || 'N/A';

    // Format dates for email
    const startFormatted = `${formatDate(formData.date?.start)} ${formData.time.start}`;
    const finishFormatted = `${formatDate(formData.date?.end)} ${formData.time.end}`;

    // Send email notification via EmailJS
    const templateId = config.public.emailjsBookingTemplateId as string;
    if (templateId) {
      await sendEmail(templateId, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        car: carName || formData.carId,
        start: startFormatted,
        finish: finishFormatted,
        message: '', // No message field in main form
      });
    }

    toast.add({
      title: t('mainForm.toast.success'),
      description: t('mainForm.toast.bookingCreated'),
    });

    resetForm();
  } catch (error) {
    toast.add({
      title: t('mainForm.toast.error'),
      description: t('mainForm.toast.bookingFailed'),
    });
    console.error("Error submitting form:", error);
  } finally {
    submitting.value = false;
  }
};

// Reset form
const resetForm = () => {
  Object.assign(formData, {
    name: "",
    phone: "",
    email: "",
    date: {
      start: "",
      end: ""
    },
    time: {
      start: "",
      end: ""
    },
    carId: null,
  });
  v$.value.$reset();
};

// Fetch cars on component mount
fetchCars();
</script>
