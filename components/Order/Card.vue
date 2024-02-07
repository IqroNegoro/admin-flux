<template>
    <div class="flex flex-row gap-4 p-2 w-full relative">
        <img :src="product?.images[0]" alt="" class="aspect-square w-32 h-32 object-cover object-center rounded-md">
        <div class="flex flex-col justify-between items-start w-full truncate">
            <div class="truncate w-full">
                <p class="font-medium text-sm md:text-lg truncate w-full">
                    {{ product?.name }}
                </p>
                <p class="text-gray-500 text-sm">
                    x{{ product.quantity }}
                </p>
            </div>
            <div class="flex flex-col">
                <span class="text-sm text-gray-500">{{formatRp(product?.price)}}</span>
                <span class="text-sm text-gray-500">{{formatRp(product?.price * product.quantity)}}</span>
            </div>
        </div>
    </div>
</template>
<script setup>
const { product } = defineProps(["product"]);
</script>