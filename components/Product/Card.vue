<template>
    <div class="rounded-md shadow-md cursor-pointer">
        <div class="border-b-0 rounded-t-md p-2">
            <img :src="product.image" :alt="product.name" class="rounded-md object-contain aspect-square mx-auto">
        </div>
        <div class="p-2 bg-grey-100">
            <p class="truncate font-medium tracking-wide"> {{ product.name }} </p>
            <p class="text-gray-500">${{product.price}}</p>
            <p class="truncate text-sm">{{product.description}}</p>
            <button class="w-full flex flex-row gap-2 justify-center items-center mt-4 hover text-white rounded-md py-2 font-medium text-sm">Edit</button>
        </div>
    </div>
</template>
<script setup>
const { product } = defineProps(["product"]);
</script>