<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-primary text-2xl font-medium">Products</h1>
            <button>
                <i class="bx bx-plus"></i>
            </button>
        </div>
        <div class="grid grid-cols-3 grid-flow-row my-2">
            <ProductCard v-for="product in data" :key="product.id" :product="product" />
        </div>
    </div>
</template>
<script setup>
const { data, pending, error, refresh } = await getProducts();
console.log(data.value)
</script>