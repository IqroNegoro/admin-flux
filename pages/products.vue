<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-primary text-2xl font-medium">Products</h1>
            <div class="flex gap-2 flex-row">
                <!-- <button @click="prev" class="px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150">
                    <i class="bx bx-chevron-left"></i>
                </button>
                <button @click="next" class="px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150">
                    <i class="bx bx-chevron-right"></i>
                </button> -->
                <div class="flex flex-row rounded-md">
                    <input type="text" class="border rounded-l-md" placeholder="Search product" v-model="q">
                    <button class="px-3 h-full bg-primary text-white flex justify-center items-center rounded-r-md">
                        <i class="bx bx-search"></i>
                    </button>
                </div>
                <button class="px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" @click="addStatus = true">
                    <i class="bx bx-plus"></i>
                </button>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row my-2 gap-4">
            <template v-if="pendingProducts || pendingSearch">
                <ProductSkeleton v-for="i in 8" :key="i" />
            </template>
            <template v-else-if="searchedProducts.length">
                <ProductCard v-for="product in searchedProducts" :key="product.id" :product="product" @edit-product="id => editStatus = id" @delete-product="id => searchedProducts = searchedProducts.filter(v => v.id != id)" />
            </template>
            <template v-else>
                <ProductCard v-for="product in products" :key="product.id" :product="product" @edit-product="id => editStatus = id" @delete-product="id => products = products.filter(v => v.id != id)" />
            </template>
        </div>
        <LazyProductEdit v-if="editStatus" :id="editStatus" @edit-product="product => products.splice(products.findIndex(v => v.id == product.id), 1, product)" @close-edit-product="editStatus = null" />
        <LazyProductAdd v-if="addStatus" @add-product="product => products.push(product)" @close-add-product="addStatus = false" />
    </div>
</template>
<script setup>
const q = ref("");
const { data: products, pending: pendingProducts, error: errorProducts, refresh: refreshProducts } = await getProducts();
const { data: searchedProducts, pending: pendingSearch, error: errorSearch, execute: executeSearch } = await searchProducts({
    params: {
        q
    }
});
pendingSearch.value = false;
watch(searchedProducts, val => {
    console.log(val);
})
// const { data: products, pending, error, refresh } = await getProducts({
//     params: {
//         cursor,
//         type,
//         limit
//     }
// });

const addStatus = ref(false);
const editStatus = ref(null);

watch(products, val => {
    console.log(val)
})

const next = () => {
    type.value = "gt";
    cursor.value = products.value?.data.at(-1).createdAt;
}

const prev = () => {
    type.value = "lt";
    cursor.value = products.value?.data.at(0).createdAt;
}

useHead({
    title: "Products",
})
</script>