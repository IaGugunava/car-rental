<template>
  <div class="w-full max-w-[1680px] mx-auto px-4">
    <div
      class="flex flex-col lg:flex-row bg-white rounded-3xl lg:rounded-full shadow-lg p-4 lg:p-6 gap-4 lg:gap-0 relative"
    >
      <!-- Name Input -->
      <div class="flex-1 min-w-0">
        <CustomInput
          v-model="formData.name"
          :has-border="false"
          placeholder="name"
        />
      </div>

      <!-- Divider - Hidden on mobile -->
      <div class="hidden lg:block w-[1px] h-[50px] bg-gray-dark mx-4"></div>

      <!-- Phone Input -->
      <div class="flex-1 min-w-0">
        <CustomInput
          v-model="formData.phone"
          :has-border="false"
          placeholder="phone"
        />
      </div>

      <!-- Divider - Hidden on mobile -->
      <div class="hidden lg:block w-[1px] h-[50px] bg-gray-dark mx-4"></div>

      <!-- Email Input -->
      <div class="flex-1 min-w-0">
        <CustomInput
          v-model="formData.email"
          :has-border="false"
          placeholder="email"
        />
      </div>

      <!-- Divider - Hidden on mobile -->
      <div class="hidden lg:block w-[1px] h-[50px] bg-gray-dark mx-4"></div>

      <!-- Date Range Picker -->
      <div class="flex-1 min-w-0">
        <UPopover>
          <div
            class="h-full flex flex-col justify-center items-start lg:items-center text-base cursor-pointer px-3 py-2 lg:p-0"
            :class="{
              'text-dark': formData.date?.start && formData.date?.end,
              'text-[#626f86]': !(formData.date?.start || formData.date?.end),
            }"
          >
            {{
              formData.date?.start && formData.date?.end
                ? `${formatDate(formData.date.start)} - ${formatDate(formData.date.end)}`
                : "Select dates"
            }}
          </div>

          <template #content>
            <div class="p-4">
              <UCalendar v-model="formData.date" :locale="locale" range />
            </div>
          </template>
        </UPopover>
      </div>

      <!-- Divider - Hidden on mobile -->
      <div class="hidden lg:block w-[1px] h-[50px] bg-gray-dark mx-4"></div>

      <!-- Time Selectors Row -->
      <div class="flex gap-2 flex-1 min-w-0">
        <!-- Start Time -->
        <div class="flex-1">
          <UPopover>
            <div
              class="h-full flex flex-col justify-center items-start lg:items-center text-base cursor-pointer px-3 py-2 lg:p-0"
              :class="{
                'text-dark': formData.time.start,
                'text-[#626f86]': !formData.time.start,
              }"
            >
              {{ formData.time.start || "Start time" }}
            </div>

            <template #content>
              <div class="p-4 w-64">
                <div class="flex gap-2">
                  <USelect
                    v-model="startHour"
                    :items="hours"
                    placeholder="Hour"
                    class="flex-1"
                  />
                  <USelect
                    v-model="startMinute"
                    :items="minutes"
                    placeholder="Min"
                    class="flex-1"
                  />
                </div>
              </div>
            </template>
          </UPopover>
        </div>

        <!-- End Time -->
        <div class="flex-1">
          <UPopover>
            <div
              class="h-full flex flex-col justify-center items-start lg:items-center text-base cursor-pointer px-3 py-2 lg:p-0"
              :class="{
                'text-dark': formData.time.end,
                'text-[#626f86]': !formData.time.end,
              }"
            >
              {{ formData.time.end || "End time" }}
            </div>

            <template #content>
              <div class="p-4 w-64">
                <div class="flex gap-2">
                  <USelect
                    v-model="endHour"
                    :items="hours"
                    placeholder="Hour"
                    class="flex-1"
                  />
                  <USelect
                    v-model="endMinute"
                    :items="minutes"
                    placeholder="Min"
                    class="flex-1"
                  />
                </div>
              </div>
            </template>
          </UPopover>
        </div>
      </div>

      <!-- Divider - Hidden on mobile -->
      <div class="hidden lg:block w-[1px] h-[50px] bg-gray-dark mx-4"></div>

      <!-- Car Selection -->
      <div class="flex items-center justify-center lg:w-[400px]">
        <USelect
          v-model="formData.carId"
          :items="cars"
          placeholder="Select car"
          class="w-full text-base bg-transparent border-none ring-0 text-dark"
        />
      </div>

      <!-- Submit Button -->
      <div
        class="flex h-[50px] justify-center items-center cursor-pointer hover:opacity-80 transition-opacity lg:ml-4"
        @click="handleSubmit"
      >
        <SearchSvg class="w-6 h-6 [&_svg]:w-6 [&_svg]:h-6" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import CustomInput from "~/components/UIComponents/CustomInput.vue";
import type { CalendarDate } from '@internationalized/date'
import SearchSvg from "~/components/SvgComponents/SearchSvg.vue";

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

const startHour = ref('')
const startMinute = ref('')
const endHour = ref('')
const endMinute = ref('')

// Generate hours (00-23)
const hours = computed(() => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return { label: hour, value: hour }
  })
})

// Generate minutes (00, 15, 30, 45)
const minutes = computed(() => {
  return ['00', '15', '30', '45'].map(min => ({
    label: min,
    value: min
  }))
})

// Watch for time changes and update formData
watch([startHour, startMinute], ([hour, minute]) => {
  if (hour && minute) {
    formData.time.start = `${hour}:${minute}`
  }
})

watch([endHour, endMinute], ([hour, minute]) => {
  if (hour && minute) {
    formData.time.end = `${hour}:${minute}`
  }
})

const formatDate = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

// Validation rules
const rules = {
  name: {
    required: helpers.withMessage("Name is required", required),
  },
  phone: {
    required: helpers.withMessage("Phone number is required", required),
  },
  email: {
    required: helpers.withMessage("Email is required", required),
    email: helpers.withMessage("Please enter a valid email", email),
  },
  pickUpDate: {
    required: helpers.withMessage("Pick up date is required", required),
  },
  pickUpTime: {
    required: helpers.withMessage("Pick up time is required", required),
  },
  dropOffDate: {
    required: helpers.withMessage("Drop off date is required", required),
  },
  dropOffTime: {
    required: helpers.withMessage("Drop off time is required", required),
  },
  carId: {
    required: helpers.withMessage("Please select a car", required),
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
      title: "Error",
      description: "Failed to load cars",
    });
    console.error("Error fetching cars:", error);
  } finally {
    loadingCars.value = false;
  }
};

// Handle form submission
const handleSubmit = async () => {
  // const isValid = await v$.value.$validate();

  // if (!isValid) {
  //   toast.add({
  //     title: "Validation Error",
  //     description: "Please fill in all required fields correctly",
  //   });
  //   return;
  // }

  submitting.value = true;

  try {
    // Prepare data for Strapi
    const bookingData = {
      data: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        start: formData.date?.start,
        finish: formData.date?.end,
        car: formData.carId,
      },
    };

    // Submit to Strapi
    await apiFetchForm("/api/bookings?populate=car", {
      body: JSON.stringify(bookingData),
    });

    toast.add({
      title: "Success",
      description: "Booking created successfully!",
    });

    resetForm();
  } catch (error) {
    toast.add({
      title: "Error",
      description: "Failed to create booking",
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
    pickUpDate: null,
    pickUpTime: "",
    dropOffDate: null,
    dropOffTime: "",
    carId: null,
  });
  v$.value.$reset();
};

// Fetch cars on component mount
fetchCars();
</script>
