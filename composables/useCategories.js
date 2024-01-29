export const getCategories = async options => await useApi(`categories`, {
    ...options,
    lazy: true,
    default: () => [],
    key: "get-categories"
});

export const createCategories = async body => await useApi(`categories`, {
    method: "POST",
    lazy: true,
    body,
    default: () => {},
    key: "post-categories"
});

export const deleteCategories = async id => await useApi(`categories/${id}`, {
    method: "DELETE",
    lazy: true,
    immediate: false,
    default: () => {},
    key: `delete-${id}-categories`
})