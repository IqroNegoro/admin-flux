export const getOrders = async options => await useApi(`orders`, {
    ...options,
    lazy: true,
    default: () => {},
    key: "get-orders"
});

export const createOrder = async body => await useApi(`orders`, {
    method: "POST",
    lazy: true,
    default: () => {},
    body,
    key: "create-order"
});

export const getOrder = async id => await useApi(`orders/${id}`, {
    lazy: true,
    default: () => {},
    key: `get-${id}-order`
});

export const updateStatus = async (id, body) => await useApi(`orders/${id}`, {
    method: "PUT",
    lazy: true,
    default: () => {},
    body,
    key: `update-${id}-status`
});

export const deleteOrder = async id => await useApi(`orders/${id}`, {
    method: "DELETE",
    lazy: true,
    immediate: false,
    default: () => {},
    key: `delete-${id}-order`
});

export const getSalesThisMonth = async () => await useApi(`/`, {
    lazy: true,
    default: () => {},
    key: 'get-sales-this-month',
})