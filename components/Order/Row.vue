<template>
    <tr class="text-center text-sm">
        <td class="text-left">{{ transaction.orderId }}</td>
        <td class="grid justify-center items-center" :class="{'grid-cols-1 grid-rows-1': transaction.products.length == 1, 'grid-cols-2 grid-rows-1': transaction.products.length == 2, 'grid-cols-2 grid-rows-2': transaction.products.length == 3, 'grid-cols-2 grid-rows-2': transaction.products.length == 4}">
            <img v-for="product in transaction.products" :key="product.id" :src="product.image" alt="" :class="{'w-12 h-12': transaction.products.length >= 4, 'w-16 h-16': transaction.products.length == 3, 'w-20 h-20': transaction.products.length == 2, 'w-24 h-24': transaction.products.length == 1}" class="aspect-square rounded-md mx-auto">
        </td>
        <td>{{ formatRp(transaction.total) }}</td>
        <td>{{transaction.user.name}}</td>
        <td>
            <div class="border border-primary px-2 py-1 font-light" :class="{'bg-primary text-white': transaction.paymentStatus === 'settlement'}">
                {{ transaction.paymentStatus === 'settlement' ? 'Paid' : 'Unpaid' }}
            </div>
        </td>
        <td>
            <div class="group relative w-24 mx-auto text-white font-light">
                <button class="w-24 px-2 py-1" :class="{'bg-red-500': transaction.status == 'CANCEL', 'bg-blue-500': transaction.status == 'CREATED', 'bg-primary': transaction.status == 'PENDING', 'bg-green-500': transaction.status == 'SUCCESS'}">
                    <i v-if="pendingStatus" class="bx bx-loader-alt bx-spin"></i>
                    <template v-else>
                        {{ transaction.status == 'CANCEL' ? 'CANCEL' : transaction.status == 'CREATED' ? 'CREATED' : transaction.status == 'PENDING' ? 'PENDING' : 'SUCCESS' }}
                    </template>
                </button>
                <div class="group-focus-within:flex hidden z-50 absolute left-1/2 -translate-x-1/2 top-full flex-col w-full">
                    <button @click="handlingUpdateStatus(transaction.id, 'CANCEL')" v-if="transaction.status != 'CANCEL'" class="bg-red-500 w-24 px-2 py-1">CANCEL</button>
                    <button @click="handlingUpdateStatus(transaction.id, 'CREATED')" v-if="transaction.status != 'CREATED'" class="bg-blue-500 w-24 px-2 py-1">CREATED</button>
                    <button @click="handlingUpdateStatus(transaction.id, 'PENDING')" v-if="transaction.status != 'PENDING'" class="bg-primary w-24 px-2 py-1">PENDING</button>
                    <button @click="handlingUpdateStatus(transaction.id, 'SUCCESS')" v-if="transaction.status != 'SUCCESS'" class="peer bg-green-500 w-24 py-1"> SUCCESS </button>
                </div>
            </div>
        </td>
        <td>
            <div class="text-lg flex flex-row gap-2">
                <NuxtLink class="flex justify-center items-center bg-blue-500 text-white rounded-sm p-2 font-medium" :to="{name: 'orders-id', params: {id: transaction.id}}">
                    <i class="bx bx-info-circle"></i>
                </NuxtLink>
                <button class="flex justify-center items-center p-2 font-medium bg-red-500 text-white rounded-sm" @click="handleDeleteOrder">
                    <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
                    <i v-else class="bx bx-trash"></i>
                </button>
            </div>
        </td>
    </tr>
</template>
<script setup>
const { transaction } = defineProps(["transaction"]);
const emit = defineEmits(["updateStatus", "deleteOrder"]);

const { data, pending, error, execute } = await deleteOrder(transaction.id);
pending.value = false;
const notification = useNotification();
const pendingStatus = ref(false);

const handlingUpdateStatus = async (id, status) => {
    if (pendingStatus.value) return;

    pendingStatus.value = true;

    const { data, error } = await updateStatus(id, {status})

    pendingStatus.value = false;

    console.log(data.value, error.value);

    if (error.value) return;

    emit("updateStatus", data.value);
    notification.success("Success update status order")
}

const handleDeleteOrder = async () => {
    await execute();

    if (error.value) {
        notification.error("Error deleting order, try again");
        return;
    }

    emit("deleteOrder", data.value);
    notification.success("Order deleted");
}
</script>