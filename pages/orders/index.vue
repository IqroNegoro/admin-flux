<template>
    <div class="text-sm">
        <h1 class="text-primary text-2xl font-medium">Orders</h1>
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
                    <tr v-else-if="!transactions.length">
                        <td colspan="6">
                            <div class="flex justify-center items-center flex-col gap-4">
                                <p>0 Transactions</p>
                            </div>
                        </td>
                    </tr>
                    <template v-else>
                        <OrderRow v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" @update-status="order => transactions.find(v => v.id == order.id).status = order.status" @delete-order="order => transactions = transactions.filter(v => v.id != order.id)" />
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
const { data: transactions, pending, refresh, error } = await getOrders();

useHead({
    title: "Orders | Flux Store Admin"
});
</script>