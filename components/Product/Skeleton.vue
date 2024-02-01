<template>
    <div class="rounded-md shadow-md cursor-pointer flex flex-col">
        <div class="bg-black/25 rounded-md h-48 md:h-64 mx-auto w-full md:w-48 animate-pulse"></div>
        <div class="p-2 bg-grey-100 flex flex-col gap-1">
            <p class="skeleton h-4 w-full"></p>
            <p class="text-gray-500 w-16 h-4 skeleton"></p>
            <p class="text-sm h-4 skeleton"></p>
            <div class="w-full flex flex-row gap-2 justify-center items-center mt-4 skeleton bg-black/25 text-white rounded-md py-2 h-9 font-medium text-sm"></div>
        </div>
    </div>
</template>
<script setup>
const { product } = defineProps(["product"]);
</script>