<script setup lang="ts">

/**
 * @description BUTTON TYPE ONE: Button with filled background
 * @description BUTTON TYPE TWO: Transparent button
 * @description BUTTON TYPE THREE: Transparent button with filled border and text 
 */


const props = withDefaults(
  defineProps<{
    text: string;
    type?: number;
    icon?: any;
    isActive?: boolean;
    color?: string;
  }>(),
  {
    text: "",
    type: 1,
    icon: null,
    isActive: false,
    color: 'primary'
  }
);

const colorClasses = {
  primary: {
    1: 'bg-primary text-white hover:bg-primary-opacity active:bg-primary-opacity',
    2: 'border border-white font-semibold text-white hover:bg-primary active:bg-primary',
    3: 'border border-primary text-primary hover:bg-primary hover:text-white active:bg-primary active:text-white'
  },
  secondary: {
    1: 'bg-secondary text-light hover:bg-secondary-opacity active:bg-secondary-opacity',
    2: 'border border-light font-semibold text-light hover:bg-secondary active:bg-secondary',
    3: 'border border-secondary text-secondary hover:bg-secondary hover:text-light active:bg-secondary active:text-light'
  },
  purple: {
    1: 'bg-purple text-light hover:bg-purple-opacity active:bg-purple-opacity',
    2: 'border border-light font-semibold text-light hover:bg-purple active:bg-purple',
    3: 'border border-purple text-purple hover:bg-purple hover:text-light active:bg-purple active:text-light'
  },
  orange: {
    1: 'bg-orange text-light hover:bg-orange-opacity active:bg-orange-opacity',
    2: 'border border-light font-semibold text-light hover:bg-orange active:bg-orange',
    3: 'border border-orange text-orange hover:bg-orange hover:text-light active:bg-orange active:text-light'
  },
  yellow: {
    1: 'bg-yellow text-light hover:bg-yellow-opacity active:bg-yellow-opacity',
    2: 'border border-light font-semibold text-light hover:bg-yellow active:bg-yellow',
    3: 'border border-yellow text-yellow hover:bg-yellow hover:text-light active:bg-yellow active:text-light'
  },
  green: {
    1: 'bg-green text-light hover:bg-green-opacity active:bg-green-opacity',
    2: 'border border-light font-semibold text-light hover:bg-green active:bg-green',
    3: 'border border-green text-green hover:bg-green hover:text-light active:bg-green active:text-light'
  },
};


// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const buttonType = colorClasses?.[props?.color]?.[props?.type]
</script>

<template>
    <button class="px-3 sm:px-6 py-3 rounded-lg cursor-pointer text-sm sm:text-lg font-semibold transition-all duration-300 ease-in-out"
    :class="buttonType"
    >
        <div>
            {{ text }}
        </div>
    </button>
</template>

<style scoped>

</style>