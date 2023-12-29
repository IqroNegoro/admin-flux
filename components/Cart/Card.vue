<template>
    <div class="flex flex-row gap-4">
        <img :src="product.image" alt="" class="w-24 object-contain">
        <div class="flex flex-col justify-between items-start w-full">
            <div>
                <p class="text-sm font-medium">
                    {{ product.title }}
                </p>
                <span class="text-xs">${{product.price}}</span>
            </div>
            <div class="flex justify-between items-center w-full">
                <button class="border border-primary px-2 rounded-sm font-bold" @click="i--">-</button>
                {{ i }}
                <button class="border border-primary px-2 rounded-sm font-bold" @click="i++">+</button>
            </div>
        </div>
    </div>
</template>
<script setup>
const { product } = defineProps(["product"]);
const i = ref(1)
</script>