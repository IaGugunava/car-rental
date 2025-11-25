<script setup lang="ts">
const { isFirstLoad, isLoading, markAsVisited, setLoading } = useFirstLoad()
const { isDark } = useTheme()

const showLoader = computed(() => isFirstLoad.value && isLoading.value)

const handleVideoEnd = () => {
  setLoading(false)
  markAsVisited()
}

const handleVideoError = () => {
  // If video fails to load, hide loader after a short delay
  setTimeout(() => {
    setLoading(false)
    markAsVisited()
  }, 500)
}

onMounted(() => {
  // Fallback: hide loader after max 5 seconds
  setTimeout(() => {
    if (isLoading.value) {
      setLoading(false)
      markAsVisited()
    }
  }, 5000)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="showLoader" class="loader-overlay" :class="{ 'light-mode': !isDark }">
        <video
          class="loader-video"
          autoplay
          muted
          playsinline
          @ended="handleVideoEnd"
          @error="handleVideoError"
        >
          <source v-if="isDark" src="~/assets/videos/loader-dark.mp4" type="video/mp4" />
          <source v-if="isDark" src="~/assets/videos/loader-dark.webm" type="video/webm" />
          <source v-if="!isDark" src="~/assets/videos/loader-light.mp4" type="video/mp4" />
          <source v-if="!isDark" src="~/assets/videos/loader-light.webm" type="video/webm" />
        </video>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loader-overlay.light-mode {
  background: #fff;
}

.loader-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
