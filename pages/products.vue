<template>
    <div>
        <div class="flex justify-between max-md:flex-col max-md:gap-2">
            <h1 class="text-primary text-2xl font-medium">Products</h1>
            <div class="flex gap-2 flex-row">
                <button @click="products.pagination?.prev ? page-- : null" class="disabled:text-gray-500 disabled:cursor-not-allowed px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" :disabled="pending || !products.pagination?.prev">
                    <i class="bx bx-chevron-left"></i>
                </button>
                <p class="flex justify-center items-center">
                    {{ page }}
                </p>
                <button @click="products.pagination?.next ? page++ : null" class="disabled:text-gray-500 disabled:cursor-not-allowed px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" :disabled="pending || !products.pagination?.next">
                    <i class="bx bx-chevron-right"></i>
                </button>
                <div class="flex flex-row rounded-md">
                    <input type="text" class="border rounded-l-md w-full" placeholder="Search products" v-model="q">
                    <button class="px-3 h-full bg-primary text-white flex justify-center items-center rounded-r-md">
                        <i class="bx bx-search"></i>
                    </button>
                </div>
                <button class="px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" @click="addStatus = true">
                    <i class="bx bx-plus"></i>
                </button>
            </div>
        </div>
        <div class="gap-4" :class="{'flex justify-center items-center': error || !products?.data.length, 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row my-2': !error && products?.data.length}">
            <template v-if="pending">
                <ProductSkeleton v-for="i in 8" :key="i" />
            </template>
            <div v-else-if="error" class="w-full flex justify-center items-center flex-col gap-4">
                <p>Something wrong</p>
                <button class="px-3 py-1 bg-primary font-medium text-white" @click="refresh">Refresh</button>
            </div>
            <div v-else-if="!products?.data.length" class="borderflex justify-center items-center flex-col gap-4">
                <p>0 Transactions</p>
            </div>
            <template v-else>
                <ProductCard v-for="product in products.data" :key="product.id" :product="product" @edit-product="id => editStatus = id" @delete-product="id => products.data = products.data.filter(v => v.id != id)" />
            </template>
        </div>
        <LazyProductEdit v-if="editStatus" :id="editStatus" @edit-product="product => products.data.splice(products.data.findIndex(v => v.id == product.id), 1, product)" @close-edit-product="editStatus = null" />
        <LazyProductAdd v-if="addStatus" @add-product="product => products.data.push(product)" @close-add-product="addStatus = false" />
    </div>
</template>
<script setup>
const limit = ref(10);
const page = ref(1);
const q = ref("");

const { data: products, pending, error, refresh } = await getProducts({
    params: {
        limit,
        page,
        q
    }
});

watch(q, val => {
    page.value = 1;
})

const addStatus = ref(false);
const editStatus = ref(null);

useHead({
    title: "Products",
})
</script>