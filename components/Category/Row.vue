<template>
    <tr class="text-center">
        <td>{{ i + 1 }}</td>
        <td>{{ category.name }}</td>
        <td>
            <button class="bg-primary px-3 py-1 font-medium rounded-sm text-white">
                Products
            </button>
        </td>
        <td>
            <div class="text-lg flex justify-center items-center flex-row gap-2">
                <button class="flex justify-center items-center bg-blue-500 text-white rounded-sm p-2 font-medium" @click="$emit('editCategory', category.id)">
                    <i class="bx bx-edit"></i>
                </button>
                <button class="flex justify-center items-center p-2 font-medium bg-red-500 text-white rounded-sm" @click="handleDeleteOrder">
                    <!-- <i v-if="pending" class="bx bx-loader-alt bx-spin"></i> -->
                    <i class="bx bx-trash"></i>
                </button>
            </div>
        </td>
    </tr>
</template>
<script setup>
const { category } = defineProps(["category", "i"]);

const { data, pending, refresh, execute } = deleteCategories(category.id)

const emit = defineEmits(["editCategory", "deleteCategory"])

const handleDeleteOrder = async () => {
    await execute();

    if (error.value) {
        notification.error("Error deleting category, try again");
        return;
    }

    emit("deleteCategory", data.value);
    notification.success("Category deleted");
}
</script>