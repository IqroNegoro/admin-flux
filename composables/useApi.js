export const useApi = async (url, options) => await useFetch(url, {
    ...options,
    headers: useRequestHeaders(["cookie"]),
    baseURL: "/api/"
});