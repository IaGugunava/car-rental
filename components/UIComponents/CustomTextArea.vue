<script setup lang="ts">
/**
 * @author Luka Tchigladze
 */

const props = withDefaults(
  defineProps<{
    modelValue?: any;
    placeholder?: string | null;
    error?: string | null | Ref<string>;
    textColor?: "black" | "white";
  }>(),
  {
    modelValue: "",
    placeholder: "",
    error: "",
    textColor: "black"
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", param: typeof props.modelValue): void;
}>();

const { t } = useI18n();

const errorText = computed(() => {
  if (props.error !== "") {
    return t(props.error?.toString().toLowerCase() as any);
  }
});

const inputModel = computed({
  get() {
    return props.modelValue;
  },
  set(newValue) {
    emit("update:modelValue", newValue);
  }
});
</script>

<template>
  <div>
    <div class="textarea-box custom-scroll relative bg-transparent overflow-hidden border border-primary rounded-lg pb-6 pr-2 transition-colors ease-in-out">
      <textarea
        v-model="inputModel"
        class="leading-13 h-24 w-full resize-none border-none pl-4 pr-8 outline-none placeholder:text-[#626f86] focus:outline-none"
        :style="{'color': textColor}"
        :placeholder="placeholder || ''"
      />
    </div>
    <p class="upper absolute px-4 pt-1 text-[12px] text-[#FC5A40]">{{ errorText }}</p>
  </div>
</template>
