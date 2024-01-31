export const getCategories = async options => await useApi(`categories`, {
    ...options,
    lazy: true,
    default: () => {},
    key: "get-categories"
});

export const getCategory = async id => await useApi(`categories/${id}`, {
    lazy: true,
    default: () => {},
    key: `get-${id}-category`
})

export const createCategory = async body => await useApi(`categories`, {
    method: "POST",
    body,
    key: "post-categories"
});

export const updateCategory = async (id, body) => await useApi(`categories/${id}`, {
    method: "PUT",
    body,
    key: `update-${id}-category`
})

export const deleteCategory = async id => await useApi(`categories/${id}`, {
    method: "DELETE",
    immediate: false,
    default: () => {},
    key: `delete-${id}-categories`
});