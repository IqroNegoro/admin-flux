<template>
    <div>
        <h1 class="text-primary text-2xl font-medium">Orders</h1>
        <div class="w-full mt-4 shadow rounded-md border border-primary">
            <table class="table-auto w-full">
                <thead>
                    <tr class="border-b border-primary">
                        <th class="text-left">Order ID</th>
                        <th>Product</th>
                        <th>Total</th>
                        <th>Customer</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-primary">
                    <tr class="text-center even:bg-primary even:text-white" v-for="i in 10" :key="Math.random()">
                        <td class="text-left">4mx45c-5245c5-6v2fdcv-2dfsd</td>
                        <td class="flex flex-row justify-center items-center">
                            <img src="https://voila.id/cdn/shop/files/2product-59.98919-BLACKWHITE-Xms-2023-08-19T1352210700_1000x.png?v=1692438635" alt="" class="aspect-square w-24 h-24 rounded-md">
                            <!-- <p>
                                Prot
                            </p> -->
                        </td>
                        <td>{{ formatRp(i) }}</td>
                        <td>Iqro Negoro</td>
                        <td>
                            <div class="relative w-full">
                                <button class="peer w-full bg-green-500 py-1 text-white font-medium rounded-sm"> SUCCESS </button>
                                <div class="peer-focus-within:flex hidden z-50 absolute left-0 top-full mt-1 flex-col w-full">
                                    <button class="bg-red-500 px-2 py-1 text-white font-medium">CANCEL</button>
                                    <button class="bg-blue-500 px-2 py-1 text-white font-medium">CREATED</button>
                                    <button class="bg-primary px-2 py-1 text-white font-medium">PENDING</button>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>

useHead({
    title: "Orders | Flux Store Admin"
});
</script>