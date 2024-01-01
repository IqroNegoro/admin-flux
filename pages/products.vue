<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-primary text-2xl font-medium">Products</h1>
            <button class="px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" @click="addStatus = true">
                <i class="bx bx-plus"></i>
            </button>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row my-2 gap-4">
            <template v-if="pending">
                <ProductSkeleton v-for="i in 8" :key="i" />
            </template>
            <template v-else>
                <ProductCard v-for="product in products" :key="product.id" :product="product" />
            </template>
        </div>
        <LazyProductAdd v-if="addStatus" @close-add-product="addStatus = false" />
    </div>
</template>
<script setup>
// const { data, pending, error, refresh } = await useFetch("https://fakestoreapi.com/products", {
//     lazy: true,
//     key: "products",
// });
const { data: products, pending, error, refresh } = await getProducts();

const addStatus = ref(false);

useHead({
    title: "Products"
})
</script>