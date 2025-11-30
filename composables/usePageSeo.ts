export const usePageSeo = async (pageSlug: string) => {
  const { locale } = useI18n();
  
  const { data, error } = await apiFetch(
    `/api/pages?locale=${locale.value}&filters[slug][$eq]=${pageSlug}&populate=seo.image`
  );

  if (error.value || !data.value?.data?.[0]) {
    return null;
  }

  const pageData = data.value.data[0];
  const seo = pageData.seo;

  if (!seo) {
    return null;
  }

  const config = useRuntimeConfig();
  const baseUrl = config.public.NUXT_PUBLIC_BASE_URL || '';

  return {
    title: seo.title,
    description: seo.description,
    image: seo.image?.url ? `${baseUrl}${seo.image.url}` : undefined,
    keywords: seo.keywords,
  };
};
