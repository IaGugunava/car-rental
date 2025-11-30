export const useSeo = (seoData?: {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string;
}) => {
  const config = useRuntimeConfig();
  const siteUrl = config.public.NUXT_PUBLIC_SITE_URL || '';

  const defaultTitle = 'Car Rental Service';
  const defaultDescription = 'Premium car rental service with a wide selection of vehicles';
  const defaultImage = `${siteUrl}/og-image.jpg`;

  const title = seoData?.title || defaultTitle;
  const description = seoData?.description || defaultDescription;
  const image = seoData?.image || defaultImage;

  // Ensure image URL is absolute
  const imageUrl = image?.startsWith('http') ? image : `${siteUrl}${image}`;

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogImage: imageUrl,
    ogUrl: siteUrl,
    twitterCard: 'summary_large_image',
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: imageUrl,
    ...(seoData?.keywords && { keywords: seoData.keywords }),
  });

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: imageUrl },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    link: [
      { rel: 'canonical', href: siteUrl },
    ],
  });
};
