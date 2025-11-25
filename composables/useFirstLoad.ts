export const useFirstLoad = () => {
  const isFirstLoad = useState('isFirstLoad', () => true)
  const isLoading = useState('isLoading', () => true)

  const checkFirstLoad = () => {
    if (import.meta.client) {
      const hasVisited = sessionStorage.getItem('hasVisited')
      isFirstLoad.value = !hasVisited
    }
  }

  const markAsVisited = () => {
    if (import.meta.client) {
      sessionStorage.setItem('hasVisited', 'true')
      isFirstLoad.value = false
    }
  }

  const setLoading = (value: boolean) => {
    isLoading.value = value
  }

  return {
    isFirstLoad,
    isLoading,
    checkFirstLoad,
    markAsVisited,
    setLoading
  }
}
