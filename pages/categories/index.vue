<template>
    <div>
        <div class="flex justify-between max-md:flex-col max-md:gap-2">
            <h1 class="text-primary text-2xl font-medium">Categories</h1>
            <div class="flex gap-2 flex-row">
                <button @click="categories.pagination?.prev ? page-- : null" class="disabled:text-gray-500 disabled:cursor-not-allowed px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" :disabled="pending || !categories.pagination?.prev">
                    <i class="bx bx-chevron-left"></i>
                </button>
                <p class="flex justify-center items-center">
                    {{ page }}
                </p>
                <button @click="categories.pagination?.next ? page++ : null" class="disabled:text-gray-500 disabled:cursor-not-allowed px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" :disabled="pending || !categories.pagination?.next">
                    <i class="bx bx-chevron-right"></i>
                </button>
                <div class="flex flex-row rounded-md">
                    <input type="text" class="border rounded-l-md w-full" placeholder="Search categories" v-model="q">
                    <button class="px-3 h-full bg-primary text-white flex justify-center items-center rounded-r-md">
                        <i class="bx bx-search"></i>
                    </button>
                </div>
                <button class="px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" @click="addStatus = true">
                    <i class="bx bx-plus"></i>
                </button>
            </div>
        </div>
        <div class="w-full shadow-md rounded-md overflow-x-auto\">
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Products</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="pending">
                        <td colspan="4">
                            <div class="flex justify-center items-center">
                                <i class="bx bx-loader-alt bx-spin text-2xl mx-auto"></i>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="error">
                        <td colspan="4">
                            <div class="flex justify-center items-center flex-col gap-4">
                                <p>Something wrong</p>
                                <button class="px-3 py-1 bg-primary font-medium text-white" @click="refresh">Refresh</button>
                            </div>
                        </td>
                    </tr>
                    <tr v-else-if="!categories.data.length">
                        <td colspan="4">
                            <div class="flex justify-center items-center flex-col gap-4">
                                <p>0 Categories</p>
                            </div>
                        </td>
                    </tr>
                    <template v-else>
                        <CategoryRow v-for="(category, i) in categories.data" :key="category.id" :i="i" :category="category" @edit-category="id => editStatus = id" @delete-category="category => categories.data = categories.data.filter(v => v.id != category.id)" />
                    </template>
                </tbody>
            </table>    
        </div>
        <LazyCategoryEdit v-if="editStatus" :id="editStatus" @edit-category="category => categories.data.splice(categories.data.findIndex(v => v.id == category.id), 1, category)" @close-edit-category="editStatus = null" />
        <LazyCategoryAdd v-if="addStatus" @add-category="category => categories.data.push(category)" @close-add-category="addStatus = false" />
    </div>
</template>
<script setup>
const page = ref(1);
const skip = ref(0);
const limit = ref(10);

const q = ref("");

const { data: categories, pending, error, refresh } = await getCategories({
    params: {
        limit,
        page,
        q
    }
});

watch(q, val => {
    page.value = 1
})

const addStatus = ref(false);
const editStatus = ref(false);

useHead({
    title: "Categories | Flux"
})

</script>