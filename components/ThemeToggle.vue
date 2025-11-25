<script setup lang="ts">
const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <ClientOnly>
    <button
      @click="toggleTheme"
      class="theme-toggle"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <svg v-if="!isDark" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2"/>
        <path d="M12 20v2"/>
        <path d="m4.93 4.93 1.41 1.41"/>
        <path d="m17.66 17.66 1.41 1.41"/>
        <path d="M2 12h2"/>
        <path d="M20 12h2"/>
        <path d="m6.34 17.66-1.41 1.41"/>
        <path d="m19.07 4.93-1.41 1.41"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
    </button>
    <template #fallback>
      <div class="theme-toggle-skeleton"></div>
    </template>
  </ClientOnly>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--ui-bg);
  color: var(--ui-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-toggle:hover {
  background: var(--color-muted);
  border-color: var(--color-primary);
}

.theme-toggle:focus {
  outline: 2px dashed var(--color-ring);
  outline-offset: 2px;
}

.theme-toggle svg {
  width: 20px;
  height: 20px;
  stroke: var(--color-dark);
}

.theme-toggle-skeleton {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: var(--color-muted);
  opacity: 0.5;
}
</style>
