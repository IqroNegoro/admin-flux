let baseURL = "http://localhost:3000/api/";
// if (process.env.NODE_ENV === "production") baseURL = "https://flux.netlify.app/";

export const useApi = async (url, options) => await useFetch(url, {
    ...options,
    headers: useRequestHeaders(["cookie"]),
    baseURL
});