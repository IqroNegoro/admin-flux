export const getProducts = async options => await useApi("products", {
    ...options,
    default: () => [],
    lazy: true,
    key: "get-products",
});

export const getProduct = async id => await useApi(`products/${id}`, {
    default: () => {},
    lazy: true,
    key: `get-${id}-product`
});

export const searchProducts = async options => await useApi(`products/search`, {
    ...options,
    default: () => [],
    lazy: true,
    immediate: false,
    key: `search-products`
});

export const createProduct = async body => await useApi("products", {
    method: "POST",
    body,
    key: "post-products"
});

export const updateProduct = async (id, body) => await useApi(`products/${id}`, {
    method: "PUT",
    body,
    key: `update-${id}-products`
});

export const deleteProduct = async id => await useApi(`products/${id}`, {
    method: "DELETE",
    immediate: false,
    key: `delete-${id}-products`
})