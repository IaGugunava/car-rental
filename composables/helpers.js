// import { ka } from "date-fns/locale";
// import { format } from "date-fns"

export const useConfigs = () => {
  const config = useRuntimeConfig();
  return {
    apiUrl: config.public.NUXT_PUBLIC_BASE_URL,
    apiToken: config.public.NUXT_PUBLIC_STRAPI_TOKEN,
  };
};

export const apiFetch = (path, options = {}) => {
  const { apiUrl, apiToken } = useConfigs();

  return useFetch(path, {
    method: "GET",
    baseURL: apiUrl,
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
    ...options,
  });
};

export const apiFetchForm = (path, options = {}) => {
  const { apiUrl } = useConfigs();

  return useFetch(path, {
    method: "POST",
    baseURL: apiUrl,
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });
}

export const getSingleUrl = (path, item) => {
  const id = item?.id;
  const slug = item?.slug.toLowerCase().split(" ").join("-");
  return `/${path}/${id}-${slug}`;
};

// export const formatDate = (date, formatValue) => {
//   return format(new Date(date), formatValue, {
//     locale: ka
//   });
// };
