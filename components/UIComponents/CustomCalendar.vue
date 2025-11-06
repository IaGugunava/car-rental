<template>
  <div class="space-y-4">
    <!-- Calendar Mode -->
    <div v-if="mode === 'calendar'" class="space-y-2">
      <label v-if="label" class="block text-sm font-medium">{{ label }}</label>
      <UCalendar 
        :model-value="calendarValue" 
        @update:model-value="handleCalendarUpdate"
        :locale="locale" 
      />
    </div>

    <!-- Range Calendar Mode -->
    <div v-else-if="mode === 'range-calendar'" class="space-y-2">
      <label v-if="label" class="block text-sm font-medium">{{ label }}</label>
      <UCalendar 
        :model-value="rangeCalendarValue" 
        @update:model-value="handleRangeCalendarUpdate"
        :locale="locale"
        range
      />
      <div v-if="showRangePreview && rangeCalendarValue?.start && rangeCalendarValue?.end" 
           class="text-sm text-gray-600 dark:text-gray-400 mt-2">
        {{ formatRangePreview(rangeCalendarValue.start, rangeCalendarValue.end) }}
      </div>
    </div>

    <!-- DateTime Local Input Mode -->
    <div v-else-if="mode === 'datetime-local'" class="space-y-2">
      <label v-if="label" class="block text-sm font-medium">{{ label }}</label>
      <UInput 
        :model-value="modelValue" 
        @update:model-value="handleInputUpdate"
        type="datetime-local"
        :size="size"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>

    <!-- Date Input Mode -->
    <div v-else-if="mode === 'date'" class="space-y-2">
      <label v-if="label" class="block text-sm font-medium">{{ label }}</label>
      <UInput 
        :model-value="modelValue" 
        @update:model-value="handleInputUpdate"
        type="date"
        :size="size"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>

    <!-- Time Input Mode -->
    <div v-else-if="mode === 'time'" class="space-y-2">
      <label v-if="label" class="block text-sm font-medium">{{ label }}</label>
      <UInput 
        :model-value="modelValue" 
        @update:model-value="handleInputUpdate"
        type="time"
        :size="size"
        :placeholder="placeholder"
        :disabled="disabled"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

interface DateRange {
  start: CalendarDate
  end: CalendarDate
}

interface Props {
  modelValue?: string | CalendarDate | DateRange | null
  mode?: 'calendar' | 'range-calendar' | 'datetime-local' | 'date' | 'time'
  locale?: 'en' | 'ka'
  label?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  placeholder?: string
  disabled?: boolean
  showRangePreview?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'datetime-local',
  locale: 'en',
  size: 'md',
  disabled: false,
  showRangePreview: true
})

const emit = defineEmits<{
  'update:modelValue': [value: string | CalendarDate | DateRange]
}>()

// Computed value for calendar mode
const calendarValue = computed(() => {
  if (props.mode === 'calendar' && props.modelValue) {
    if (props.modelValue instanceof CalendarDate) {
      return props.modelValue
    }
    // Convert string to CalendarDate if needed
    const date = new Date(props.modelValue as string)
    return new CalendarDate(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    )
  }
  return props.modelValue as CalendarDate
})

// Computed value for range calendar mode
const rangeCalendarValue = computed(() => {
  if (props.mode === 'range-calendar' && props.modelValue) {
    // Check if it's already a DateRange object
    if (typeof props.modelValue === 'object' && 'start' in props.modelValue && 'end' in props.modelValue) {
      return props.modelValue as DateRange
    }
  }
  return props.modelValue as DateRange
})

// Handle calendar update
const handleCalendarUpdate = (date: CalendarDate) => {
  emit('update:modelValue', date)
}

// Handle range calendar update
const handleRangeCalendarUpdate = (range: DateRange) => {
  emit('update:modelValue', range)
}

// Handle input update
const handleInputUpdate = (value: string) => {
  emit('update:modelValue', value)
}

// Format range preview
const formatRangePreview = (start: CalendarDate, end: CalendarDate) => {
  const startStr = `${start.year}-${String(start.month).padStart(2, '0')}-${String(start.day).padStart(2, '0')}`
  const endStr = `${end.year}-${String(end.month).padStart(2, '0')}-${String(end.day).padStart(2, '0')}`
  
  if (props.locale === 'ka') {
    return `${startStr} - ${endStr}`
  }
  return `${startStr} - ${endStr}`
}
</script>