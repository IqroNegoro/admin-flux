export const getProducts = async () => await useApi("products", {
    default: () => [],
    lazy: true,
    key: "get-products",
});

export const getProduct = async id => await useApi(`products/${id}`, {
    default: () => {},
    lazy: true,
    key: `get-${id}-product`
})

export const createProduct = async body => await useApi("products", {
    method: "POST",
    transform: res => res.data,
    body,
    key: "post-products"
});

export const updateProduct = async (id, body) => await useApi(`products/${id}`, {
    method: "PUT",
    transform: res => res.data,
    body,
    key: "post-products"
});

export const deleteProduct = async id => await useApi(`products/${id}`, {
    method: "DELETE",
    transform: res => res.data,
    immediate: false,
    key: "delete-products"
})