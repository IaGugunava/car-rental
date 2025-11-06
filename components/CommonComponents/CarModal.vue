<script setup lang="ts">
import CustomButton from '~/components/UIComponents/CustomButton.vue';
import CustomInput from '~/components/UIComponents/CustomInput.vue';
import CustomTextArea from '../UIComponents/CustomTextArea.vue';

const { locale } = useI18n()

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
  startTime: "",
  endTime: ""
});

// Time selector values
const startHour = ref("");
const startMinute = ref("");
const endHour = ref("");
const endMinute = ref("");

// Generate hours (00-23)
const hours = computed(() => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return { label: hour, value: hour };
  });
});

// Generate minutes (00, 15, 30, 45)
const minutes = computed(() => {
  return ['00', '15', '30', '45'].map(min => ({
    label: min,
    value: min
  }));
});

// Watch for time changes and update contactFormData
watch([startHour, startMinute], ([hour, minute]) => {
  if (hour && minute) {
    contactFormData.startTime = `${hour}:${minute}`;
  }
});

watch([endHour, endMinute], ([hour, minute]) => {
  if (hour && minute) {
    contactFormData.endTime = `${hour}:${minute}`;
  }
});

const success = ref(false);
const error = ref("");

// Format date and time for Strapi datetime field (ISO 8601)
const formatDateTime = (date: string | Date, time: string) => {
  if (!date || !time) return null;
  
  // Create a date object from the date
  const dateObj = new Date(date);
  
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

  // Format start and end datetime for Strapi
  const startDateTime = formatDateTime(contactFormData.date.start, contactFormData.startTime);
  const endDateTime = formatDateTime(contactFormData.date.end, contactFormData.endTime);

  // Validation
  if (!startDateTime || !endDateTime) {
    error.value = "Please select both dates and times.";
    return;
  }

  try {
    const res = await apiFetchForm("/api/bookings", {
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
    success.value = true;
  } catch (err: any) {
    error.value = "Failed to send booking request.";
  }
};
</script>

<template>
  <div class="flex flex-col gap-4">
    <CustomInput
      v-model="contactFormData.name"
      label="Name"
      placeholder="Enter your name"
    />
    
    <CustomInput
      v-model="contactFormData.email"
      label="Email"
      placeholder="Enter your email"
    />
    
    <CustomInput
      v-model="contactFormData.phone"
      label="Phone"
      placeholder="Enter your phone number"
    />
    
    <CustomTextArea
      v-model="contactFormData.message"
      placeholder="Enter your message"
      textarea
    />
    
    <!-- Date Range Picker -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Select Dates
      </label>
      <UCalendar 
        v-model="contactFormData.date" 
        :locale="locale"
        range
      />
    </div>

    <!-- Time Selectors -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Start Time -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Start Time
        </label>
        <div class="flex gap-2">
          <USelect
            v-model="startHour"
            :items="hours"
            placeholder="Hour"
            class="flex-1 z-[1003]"
             :ui="{ wrapper: 'relative z-[1003]',
    dropdown: 'z-[1003] absolute' }"
          />
          <USelect
            v-model="startMinute"
            :items="minutes"
            placeholder="Min"
            class="flex-1 z-[1003]"
             :ui="{ wrapper: 'relative z-[1003]',
    dropdown: 'z-[1003] absolute' }"
          />
        </div>
        <div v-if="contactFormData.startTime" class="mt-2 text-sm text-gray-600">
          Selected: {{ contactFormData.startTime }}
        </div>
      </div>

      <!-- End Time -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          End Time
        </label>
        <div class="flex gap-2">
          <USelect
            v-model="endHour"
            :items="hours"
            placeholder="Hour"
            class="flex-1 z-[1003]"
             :ui="{ wrapper: 'relative z-[1003]',
    dropdown: 'z-[1003] absolute' }"
          />
          <USelect
            v-model="endMinute"
            :items="minutes"
            placeholder="Min"
            class="flex-1 z-[1003]"
             :ui="{ wrapper: 'relative z-[1003]',
    dropdown: 'z-[1003] absolute' }"
          />
        </div>
        <div v-if="contactFormData.endTime" class="mt-2 text-sm text-gray-600">
          Selected: {{ contactFormData.endTime }}
        </div>
      </div>
    </div>

    <CustomButton text="submit car" @click="submitForm" />
    
    <div v-if="success" class="text-green-500">
      Your message has been sent successfully!
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