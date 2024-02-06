<template>
    <div class="fixed w-full h-full top-0 left-0 bg-black/25 flex justify-center items-center" @click="$emit('closePreview')">
        <div class="rounded-md shadow-md bg-white">
            <div class="p-2 flex justify-center items-center">
                <img v-if="product?.image" :src="renderImage(product.image)" :alt="product?.name" class="w-48 h-48 rounded-md object-center object-cover aspect-square mx-auto">
                <div v-else class="w-48 h-48 rounded-md bg-black/10"></div>
            </div>
            <div class="p-2 bg-grey-100">
                <p class="truncate font-medium tracking-wide"> {{ product?.title || product?.name || "Lorem ipsum dolor sit amet." }} </p>
                <p class="text-gray-500">{{formatRp(product?.price) || 0}}</p>
                <p class="truncate text-sm whitespace-pre-line" :class="{'text-gray-500': !product?.sub}" v-html="product?.sub || 'No description product'"></p>
            </div>
        </div>
    </div>
</template>
<script setup>
const { product } = defineProps(["product"]);
const emits = defineEmits(["closePreview"]);
</script>