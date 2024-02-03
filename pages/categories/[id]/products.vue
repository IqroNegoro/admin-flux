<template>
    <div>
        <div class="flex justify-between">
            <div v-if="pendingCategory" class="skeleton h-8 w-64"></div>
            <h1 v-else class="text-primary text-2xl font-medium">{{category?.name ?? ""}} Products</h1>
            <div class="flex gap-2 flex-row">
                <button @click="products?.pagination?.prev ? page-- : null" class="disabled:text-gray-500 disabled:cursor-not-allowed px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" :disabled="pendingProducts || !products?.pagination?.prev">
                    <i class="bx bx-chevron-left"></i>
                </button>
                <p class="flex justify-center items-center">
                    {{ page }}
                </p>
                <button @click="products?.pagination?.next ? page++ : null" class="disabled:text-gray-500 disabled:cursor-not-allowed px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" :disabled="pendingProducts || !products?.pagination?.next">
                    <i class="bx bx-chevron-right"></i>
                </button>
                <div class="flex flex-row rounded-md">
                    <input type="text" class="border rounded-l-md" placeholder="Search product" v-model="q">
                    <button class="px-3 h-full bg-primary text-white flex justify-center items-center rounded-r-md">
                        <i class="bx bx-search"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-row my-2 gap-4">
            <template v-if="pendingProducts">
                <ProductSkeleton v-for="i in 8" :key="i" />
            </template>
            <template v-else>
                <ProductCard v-for="product in products.data" :key="product.id" :product="product" @edit-product="id => editStatus = id" @delete-product="id => products.data = products.data.filter(v => v.id != id)" />
            </template>
        </div>
        <LazyProductEdit v-if="editStatus" :id="editStatus" @edit-product="product => products.data.splice(products.data.findIndex(v => v.id == product.id), 1, product)" @close-edit-product="editStatus = null" />
    </div>
</template>
<script setup>
const { id } = useRoute().params
const limit = ref(10);
const page = ref(1);
const q = ref("");

const { data: category, pending: pendingCategory, error: errorCategory, refresh: refreshCategory } = await getCategory(id);

const { data: products, pending: pendingProducts, error: errorProducts, refresh: refreshProducts } = await getProductsByCategory(id, {
    params: {
        limit,
        page,
        q
    }
});

watch(q, val => {
    page.value = 1;
})

const editStatus = ref(null);

useHead({
    title: "Products",
})
</script>