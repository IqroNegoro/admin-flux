<template>
    <div class="fixed w-full h-full top-0 left-0 bg-black/25 flex justify-center items-center" @click="$emit('closePreview')">
        <div class="rounded-md shadow-md bg-white">
            <div class="border-b-0 rounded-t-md p-2 flex justify-center items-center">
                <img v-if="product?.image.value" :src="renderImage(product.image)" :alt="product?.name" class="rounded-md object-contain aspect-square mx-auto">
                <div v-else class="w-48 h-48 rounded-md bg-black/10"></div>
            </div>
            <div class="p-2 bg-grey-100">
                <p class="truncate font-medium tracking-wide"> {{ product?.title || product?.name || "Lorem ipsum dolor sit amet." }} </p>
                <p class="text-gray-500">${{product?.price || 0}}</p>
                <p class="truncate text-sm">{{product?.description || ""}}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
const { product } = defineProps(["product"]);
console.log(product)
const emits = defineEmits(["closePreview"]);
</script>