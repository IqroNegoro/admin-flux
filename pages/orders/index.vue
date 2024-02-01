<template>
    <div class="text-sm">
        <div class="flex justify-between max-md:flex-col max-md:gap-2">
            <h1 class="text-primary text-2xl font-medium">Orders</h1>
            <div class="flex gap-2 flex-row">
                <button @click="transactions.pagination?.prev ? page-- : null" class="disabled:text-gray-500 disabled:cursor-not-allowed px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" :disabled="pending || !transactions.pagination?.prev">
                    <i class="bx bx-chevron-left"></i>
                </button>
                <p class="flex justify-center items-center">
                    {{ page }}
                </p>
                <button @click="transactions.pagination?.next ? page++ : null" class="disabled:text-gray-500 disabled:cursor-not-allowed px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" :disabled="pending || !transactions.pagination?.next">
                    <i class="bx bx-chevron-right"></i>
                </button>
                <div class="flex flex-row rounded-md">
                    <input type="text" class="border rounded-l-md w-full" placeholder="Search orders" v-model="q">
                    <button class="px-3 h-full bg-primary text-white flex justify-center items-center rounded-r-md">
                        <i class="bx bx-search"></i>
                    </button>
                </div>
                <button class="px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" @click="addStatus = true">
                    <i class="bx bx-plus"></i>
                </button>
            </div>
        </div>
        <div class="w-full mt-4 overflow-x-auto rounded-md shadow-md">
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th class="text-left">Order ID</th>
                        <th>Total</th>
                        <th>Customer</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="pending">
                        <td colspan="6">
                            <div class="flex justify-center items-center">
                                <i class="bx bx-loader-alt bx-spin text-2xl mx-auto"></i>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="error">
                        <td colspan="6">
                            <div class="flex justify-center items-center flex-col gap-4">
                                <p>Something wrong</p>
                                <button class="px-3 py-1 bg-primary font-medium text-white" @click="refresh">Refresh</button>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="!transactions.data.length">
                        <td colspan="6">
                            <div class="flex justify-center items-center flex-col gap-4">
                                <p>0 Transactions</p>
                            </div>
                        </td>
                    </tr>
                    <template v-else>
                        <OrderRow v-for="transaction in transactions.data" :key="transaction.id" :transaction="transaction" @update-status="order => transactions.data.find(v => v.id == order.id).status = order.status" @delete-order="order => transactions.data = transactions.data.filter(v => v.id != order.id)" />
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
const page = ref(1);
const limit = ref(10);
const q = ref("");

const { data: transactions, pending, refresh, error } = await getOrders({
    params: {
        page,
        limit,
        q
    }
});

watch(q, val => {
    page.value = 1;
});

useHead({
    title: "Orders | Flux Store Admin"
});
</script>