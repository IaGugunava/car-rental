<script setup lang="ts">
const { t } = useI18n();

const goHome = () => {
  navigateTo('/');
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
    <div class="text-center">
      <!-- Animated Traffic Cone -->
      <div class="relative inline-block mb-8">
        <!-- Cone Shadow -->
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 bg-black/10 rounded-full blur-md animate-pulse"></div>
        
        <!-- Traffic Cone SVG with Animation -->
        <div class="traffic-cone">
          <svg
            class="w-48 h-48 mx-auto"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- Wide Orange Base -->
            <ellipse cx="100" cy="172" rx="55" ry="12" fill="#FF6B35" opacity="0.9" />
            <rect x="45" y="165" width="110" height="7" rx="3" fill="#FF8C42" />
            
            <!-- Black Rubber Base -->
            <rect x="50" y="172" width="100" height="8" rx="2" fill="#2C3E50" />
            
            <!-- Cone Body -->
            <path
              d="M100 30 L150 165 L50 165 Z"
              fill="#FF6B35"
              class="cone-body"
            />
            
            <!-- White Stripes -->
            <path
              d="M90 75 L110 75 L115 95 L85 95 Z"
              fill="white"
              class="stripe"
            />
            <path
              d="M80 115 L120 115 L127 140 L73 140 Z"
              fill="white"
              class="stripe"
            />
            
            <!-- Cute Face -->
            <g class="face">
              <!-- Eyes -->
              <circle cx="85" cy="105" r="3" fill="#2C3E50" class="eye-left" />
              <circle cx="115" cy="105" r="3" fill="#2C3E50" class="eye-right" />
              
              <!-- Mouth (sad) -->
              <path
                d="M 85 125 Q 100 120 115 125"
                stroke="#2C3E50"
                stroke-width="2"
                fill="none"
                stroke-linecap="round"
              />
            </g>
          </svg>
        </div>
      </div>

      <!-- Error Message -->
      <h1 class="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 class="text-2xl font-semibold text-dark mb-2">{{ t('error404.title') }}</h2>
      <p class="text-gray-600 mb-8 max-w-md mx-auto">
        {{ t('error404.description') }}
      </p>

      <!-- Action Button -->
      <button
        @click="goHome"
        class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        {{ t('error404.goHome') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.traffic-cone {
  animation: wobble 3s ease-in-out infinite;
  transform-origin: bottom center;
}

@keyframes wobble {
  0%, 100% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-5deg);
  }
  75% {
    transform: rotate(5deg);
  }
}

.cone-body {
  animation: pulse-color 2s ease-in-out infinite;
}

@keyframes pulse-color {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.9;
  }
}

.stripe {
  animation: shine 3s ease-in-out infinite;
}

@keyframes shine {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.eye-left, .eye-right {
  animation: blink 4s ease-in-out infinite;
}

@keyframes blink {
  0%, 48%, 52%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.1);
  }
}

.face {
  animation: face-move 3s ease-in-out infinite;
}

@keyframes face-move {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-2px);
  }
}
</style>
