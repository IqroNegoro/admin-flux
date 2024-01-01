export const getProducts = async () => await useApi("products", {
    default: () => [],
    lazy: true,
    key: "get-products",
})

export const createProduct = async body => await useApi("products", {
    method: "POST",
    transform: res => res.data,
    body,
    key: "post-products"
})