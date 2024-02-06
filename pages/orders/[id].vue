<template>
    <div class="flex flex-col md:grid md:grid-cols-2 md:grid-rows-2 md:gap-12 py-4 w-full lg:w-3/4 mx-auto" v-if="order">
        <div class="col-span-2 row-span-2">
            <div class="font-medium text-xl flex flex-row justify-between items-center w-full">
                <p>Status Order</p>
                <p class="text-xs"> Updated at {{moment(order.updatedAt).format('D/MM/y h:mm a')}}</p>
            </div>
            <div class="flex flex-col gap-4 w-full">
                <div class="w-full rounded-full h-4 bg-black/10">
                    <div class="bg-primary h-4 rounded-full" :class="{ 'w-[25%]': order.status === 'CREATED', 'w-[50%]': order.status === 'PENDING', 'w-[75%]': order.status === 'CONFIRMED', 'w-full': order.status === 'SUCCESS' || order.status === 'SHIP' || order.status == 'CANCEL' }"></div>
                </div>
                <div class="flex flex-row justify-between items-center">
                    <div class="flex flex-col gap-2 justify-center items-center">
                        <div class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                            <div class="rounded-full p-1 flex justify-center items-center bg-white">
                                <i class="bx bx-check"></i>
                            </div>
                        </div>
                        <p class="max-md:text-xs font-medium">Created</p>
                    </div>
                    <template v-if="order.status != 'CANCEL' && order.status != 'SUCCESS'">
                        <div class="flex flex-col gap-2 justify-center items-center">
                            <div
                                class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                                <div class="rounded-full p-1 flex justify-center items-center bg-white">
                                    <i class="bx bx-check-double"></i>
                                </div>
                            </div>
                            <p class="max-md:text-xs font-medium">Paided</p>
                        </div>
                        <div class="flex flex-col gap-2 justify-center items-center">
                            <div
                                class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                                <div class="rounded-full p-1 flex justify-center items-center bg-white">
                                    <i class="bx bx-package"></i>
                                </div>
                            </div>
                            <p class="max-md:text-xs font-medium">Processed</p>
                        </div>
                        <div class="flex flex-col gap-2 justify-center items-center">
                            <div
                                class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                                <div class="rounded-full p-1 flex justify-center items-center bg-white">
                                    <i class="bx bxs-ship"></i>
                                </div>
                            </div>
                            <p class="max-md:text-xs font-medium">Shipped</p>
                        </div>
                    </template>
                    <div v-else-if="order.status === 'SUCCESS'" class="flex flex-col gap-2 justify-center items-center">
                        <div class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                            <div class="rounded-full p-1 flex justify-center items-center bg-white">
                                <i class='bx bxs-checkbox-checked'></i>
                            </div>
                        </div>
                        <p class="max-md:text-xs font-medium">Success</p>
                    </div>
                    <div v-else class="flex flex-col gap-2 justify-center items-center">
                        <div class="bg-primary p-2 rounded-md w-min hover:-translate-y-2 duration-150 transition-transform">
                            <div class="rounded-full p-1 flex justify-center items-center bg-white">
                                <i class="bx bx-x"></i>
                            </div>
                        </div>
                        <p class="max-md:text-xs font-medium">Cancel</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <h1 class="text-xl font-medium">Products</h1>
            <OrderCard v-for="product in order.products" :key="product.id" :product="product" />
        </div>
        <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-1">
                <h1 class="text-xl font-medium">Order Detail</h1>
                <p class="font-medium">ID</p>
                <p class="text-sm"> {{ order.orderId }} </p>
                <p class="font-medium">Customer</p>
                <p class="text-sm">{{ order.user.name }}</p>
                <p class="font-medium">Total</p>
                <p class="text-sm"> {{ formatRp(order.total) }} </p>
                <p class="font-medium">Status</p>
                <p class="text-sm">
                    {{ order.paymentStatus == 'settlement' ? 'Paided' : 'Unpaid' }}
                </p>
                <p class="font-medium">Method</p>
                <p class="text-sm"> {{ pascal(order.method) }} </p>
                <p class="font-medium">Paid before</p>
                <p class="text-sm"> {{ moment(order.midtransResponse.expiry_time).format("D MMMM YYYY, hh:mm:ss A") }} </p>
                <template v-if="order.method === 'bank_transfer'">
                    <template v-if="order.paymentStatus != 'settlement'">
                        <p class="font-medium">Bank</p>
                        <p class="text-sm"> {{ capitalize(order.midtransResponse.va_numbers[0].bank) }} </p>
                        <p class="font-medium">VA Number</p>
                        <p class="text-sm"> {{ order.midtransResponse.va_numbers[0].va_number }} </p>
                    </template>
                </template>
                <template v-else>
                    <p class="font-medium">QR</p>
                    <p class="text-sm"> {{ order.midtransResponse.actions[0].url }} (sandbox) </p>
                    <img :src="order.midtransResponse.actions[0].url" alt="">
                    <!-- <NuxtLink external="true" target="_blank" :to="order.midtransResponse.actions[1].url" class="flex flex-row border border-primary justify-center items-center py-2">
                        Pay at <img src="/images/gojek.png" alt="" class="w-24">
                    </NuxtLink> -->
                </template>
            </div>
            <div class="flex flex-col gap-1">
                <h1 class="text-xl font-medium">Delivery Address</h1>
                <div class="flex flex-col text-sm text-gray-500">
                    <p> {{ order.shippingAddress.first_name }} </p>
                    <p> {{ order.shippingAddress.province }}, {{ order.shippingAddress.city }}</p>
                    <p> {{ order.shippingAddress.address }} </p>
                    <p> {{ order.shippingAddress.postal_code }} </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import moment from "moment";
const { id } = useRoute().params;
console.log(id)
const { data: order, pending, error, refresh } = await getOrder(id);

useHead({
    title: "Order | Flux"
})
</script>