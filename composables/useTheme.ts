export const useTheme = () => {
  const colorMode = useColorMode()

  const isDark = computed(() => colorMode.value === 'dark')

  const toggleTheme = () => {
    colorMode.preference = isDark.value ? 'light' : 'dark'
  }

  const setTheme = (theme: 'light' | 'dark') => {
    colorMode.preference = theme
  }

  return {
    isDark,
    theme: colorMode,
    toggleTheme,
    setTheme
  }
}
