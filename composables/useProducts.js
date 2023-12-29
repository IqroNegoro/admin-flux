export const getProducts = async () => await useApi("products", {
    default: () => [],
    key: "get-products",
})