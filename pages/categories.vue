<template>
    <div>
        <div class="flex justify-between">
            <h1 class="text-primary text-2xl font-medium">Categories</h1>
            <div class="flex gap-2 flex-row">
                <!-- <button @click="prev" class="px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150">
                    <i class="bx bx-chevron-left"></i>
                </button>
                <button @click="next" class="px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150">
                    <i class="bx bx-chevron-right"></i>
                </button> -->
                <div class="flex flex-row rounded-md">
                    <input type="text" class="border rounded-l-md" placeholder="Search categories" v-model="q">
                    <button class="px-3 h-full bg-primary text-white flex justify-center items-center rounded-r-md">
                        <i class="bx bx-search"></i>
                    </button>
                </div>
                <button class="px-2 flex justify-center items-center border border-primary rounded-md hover:bg-primary hover:text-white transition-colors duration-150" @click="addStatus = true">
                    <i class="bx bx-plus"></i>
                </button>
            </div>
        </div>
        <div class="w-full shadow-md rounded-md">
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
                    <CategoryRow v-for="(category, i) in categories" :key="category.id" :i="i" :category="category" @edit-category="id => editStatus = id" @delete-category="category => categories = categories.filter(v => v.id != category.id)" />
                </tbody>
            </table>    
        </div>
        <LazyCategoryEdit v-if="editStatus" :id="editStatus" @edit-category="category => categories.splice(categories.findIndex(v => v.id == category.id), 1, category)" @close-edit-category="editStatus = null" />
        <LazyCategoryAdd v-if="addStatus" @add-category="category => categories.push(category)" @close-add-category="addStatus = false" />
    </div>
</template>
<script setup>
const q = ref("");

const { data: categories, pending: pendingCategories, error: errorCategories, refresh: refreshCategories } = await getCategories();

const addStatus = ref(false);
const editStatus = ref(false);

useHead({
    title: "Categories | Flux"
})

</script>