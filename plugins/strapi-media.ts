export default defineNuxtPlugin((nuxtApp) => {
    const { apiUrl } = useConfigs();
  
    function normalizeUrl(url: string) {
      return url.replace(/([^:]\/)\/+/g, '$1')
    }
  
    const getStrapiMedia = (path: string) => {
      if (!path) return ''
      if (path.startsWith('http')) return normalizeUrl(path)
      return normalizeUrl(`${apiUrl}/${path}`)
    }
  
    nuxtApp.provide('strapiMedia', getStrapiMedia)
  })
  