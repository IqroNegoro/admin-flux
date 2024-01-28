<template>
    <div class="text-sm">
        <h1 class="text-primary text-2xl font-medium">Orders</h1>
        <div class="w-full mt-4 overflow-x-auto rounded-md shadow-md">
            <table class="table-auto w-full">
                <thead>
                    <tr class="border border-primary">
                        <th class="text-left">Order ID</th>
                        <th>Total</th>
                        <th>Customer</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-primary" v-if="transactions">
                    <OrderRow v-for="transaction in transactions" :key="transaction.id" :transaction="transaction" @update-status="order => transactions.find(v => v.id == order.id).status = order.status" @delete-order="order => transactions = transactions.filter(v => v.id != order.id)" />
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