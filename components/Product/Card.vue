<template>
    <div class="rounded-md shadow-md border cursor-pointer">
        <div class="border border-primary border-b-0 rounded-t-md p-2">
            <img :src="product.image" :alt="product.name" class="w-48 aspect-square object-contain mx-auto">
        </div>
        <div class="p-2 bg-grey-100">
            <p class="truncate font-medium tracking-wide"> {{ product.name }} </p>
            <p class="text-gray-500">${{product.price}}</p>
            <p class="truncate">{{product.description}}</p>
        </div>
    </div>
</template>
<script setup>
const { product } = defineProps(["product"]);
</script>