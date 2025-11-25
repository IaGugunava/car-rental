# Theme System Documentation

## Overview
This project now includes a fully functional light/dark mode theme system with smooth transitions and persistent user preferences.

## Features
- ✅ Light and Dark mode toggle
- ✅ Smooth color transitions
- ✅ Persistent theme preference (stored in localStorage)
- ✅ Accessible theme toggle button
- ✅ Responsive design (works on mobile and desktop)
- ✅ Uses CSS variables for easy customization

## Usage

### Theme Toggle Component
The `ThemeToggle` component is already integrated into the header and can be used anywhere:

```vue
<ThemeToggle />
```

### Using the Theme Composable
Access theme functionality in any component:

```vue
<script setup>
const { isDark, toggleTheme, setTheme } = useTheme()

// Check if dark mode is active
console.log(isDark.value) // true or false

// Toggle between light and dark
toggleTheme()

// Set specific theme
setTheme('dark')
setTheme('light')
</script>
```

## CSS Variables

### Light Mode Colors
- `--color-dark`: #181818
- `--color-primary`: #ED5507
- `--color-primary-light`: #861A88
- `--color-primary-dark`: #5A0460
- `--color-primary-subtle`: #6623751a
- `--color-gray-dark`: #B3B3B3
- `--color-gray-light`: #F5F5F5
- `--color-white`: #fff

### Dark Mode Colors
- `--color-dark`: #ffffff (inverted)
- `--color-primary`: #FF6B1A (brighter)
- `--color-primary-light`: #A855F7
- `--color-primary-dark`: #7C3AED
- `--color-primary-subtle`: #8b5cf633
- `--color-gray-dark`: #6B7280
- `--color-gray-light`: #1F2937
- `--color-white`: #0F172A (dark background)

## Customization

### Modifying Theme Colors
Edit `assets/css/main.css` to customize colors:

```css
:root {
  /* Light mode */
  --primary: #ED5507;
}

.dark {
  /* Dark mode */
  --primary: #FF6B1A;
}
```

### Using Theme Variables in Components
```vue
<style scoped>
.my-element {
  background: var(--color-white);
  color: var(--color-dark);
  border: 1px solid var(--color-primary);
}
</style>
```

## Configuration
Theme settings are configured in `nuxt.config.ts`:

```typescript
colorMode: {
  classSuffix: '',
  preference: 'light',
  fallback: 'light'
}
```

## Files Created/Modified

### New Files
- `composables/useTheme.ts` - Theme management composable
- `components/ThemeToggle.vue` - Theme toggle button component

### Modified Files
- `assets/css/main.css` - Added dark mode variables and transitions
- `components/LayoutComponents/header/TheHeader.vue` - Integrated theme toggle
- `nuxt.config.ts` - Added colorMode configuration

## Browser Support
The theme system uses modern CSS features and is supported in all modern browsers.
