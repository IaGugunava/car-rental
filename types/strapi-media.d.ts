declare module "#app" {
  interface NuxtApp {
    $strapiMedia: (path?: string | null) => string;
  }
}

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $strapiMedia: (path?: string | null) => string;
  }
}
