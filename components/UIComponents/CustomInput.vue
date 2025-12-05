<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string | number | undefined;
    placeholder?: string;
    type?: string;
    icon?: string;
    isIconRight?: boolean;
    borderStyle?: "Default" | "Underlined";
    required?: boolean;
    error?: string | null;
    transparentBg?: boolean;
    textColor?: "black" | "white";
    hasBorder?: boolean;
  }>(),
  {
    placeholder: "",
    type: "text",
    icon: "",
    isIconRight: false,
    borderStyle: "Default",
    required: false,
    error: "",
    transparentBg: false,
    textColor: "black",
    hasBorder: true,
  }
);

const { t } = useI18n();

const errorText = computed(() => {
  return props.error ? t(props.error?.toString().toLowerCase() as any) : "";
});

const emit = defineEmits<{
  (e: "update:modelValue", params: typeof props.modelValue): void;
  (e: "isFocused"): void;
  (e: "change", params: InputEvent): void;
}>();

const input = ref(null);
const isFocused = ref(false);

// const containerStyles = computed(() => {
//   return {
//     "ring-1 ring-color-border-primary focus-within:ring-2 focus-within:ring-color-border-brand-primary-bold bg-black ":
//       props.borderStyle === "Default",
//     "ring-0 ":
//       props.borderStyle === "Underlined",
//     "flex-row-reverse": props.isIconRight,
//     "!border-color-border-danger !ring-color-border-danger": errorText.value,
//     "bg-transparent  focus-within:bg-transparent": props.transparentBg
//   };
// });

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(newValue: string | number | undefined) {
    emit("update:modelValue", newValue);
  }
});

watch(
  () => isFocused.value,
  (ns: any) => {
    if (ns) {
      emit("isFocused");
    }
  }
);
</script>

<template>
  <div class="w-full bg-tarnsparent relative">
    <div
      class="group relative flex h-[48px] items-center overflow-hidden rounded-lg transition-all"
      :class="[{ 'flex-row-reverse': isIconRight }, { 'border-none': !hasBorder }, { 'border border-primary': hasBorder }]"
    >
      <!-- <base-icon v-if="icon" :icon="icon" class="mx-sizing-rem-0-5rem [&_path]:fill-primary" /> -->

      <input
        :id="placeholder"
        ref="input"
        v-model="inputModel"
        class="peer h-full w-full p-4 outline-none text-dark"
        :type="type"
        :name="placeholder"
        autocomplete="off"
        :placeholder="placeholder"
        v-bind="$attrs"
        @focus="isFocused = true"
        @blur="isFocused = false"
        @input="(e) => emit('change', e as InputEvent)"
      />

      <!-- <transition name="fade-in-out">
        <base-icon v-if="errorText" icon="warning" class="absolute right-5 top-1/2 -translate-y-1/2" color="#E34935" />
      </transition> -->
    </div>

    <transition name="fade-in-out">
      <p v-if="errorText" class="upper absolute left-0 top-full px-4 pt-1 text-[12px] text-[#FC5A40] whitespace-nowrap z-10">
        {{ errorText }}
      </p>
    </transition>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
}
input::placeholder {
  color: #626f86;
  font-size: 16px;
}
</style>
