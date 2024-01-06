<template>
    <div class="flex flex-col justify-between rounded-md shadow-md cursor-pointer">
        <div class="border-b-0 rounded-t-md p-2">
            <img :src="product?.image" :alt="product?.name" class="rounded-md w-48 h-48 object-contain aspect-square mx-auto">
        </div>
        <div class="p-2 bg-grey-100">
            <p class="truncate font-medium tracking-wide"> {{ product?.title ?? product?.name }} </p>
            <p class="text-gray-500">{{formatRp(product?.price)}}</p>
            <p class="truncate text-sm" :class="{'text-gray-500': !product?.description}">{{product?.description || 'No description product'}}</p>
        </div>
        <div class="flex flex-row gap-2">
            <button class="w-full flex flex-row gap-2 justify-center items-center hover text-white rounded-sm py-2 font-medium text-sm" @click="$emit('editProduct', product.id)">Edit</button>
            <button class="hover text-white flex justify-center items-center px-3 rounded-sm" @click="handleDeleteProduct"><i class="bx" :class="{'bx-trash': !pending, 'bx-loader-alt bx-spin': pending}"></i></button>
        </div>
    </div>
</template>
<script setup>
const emit = defineEmits(["editProduct", "deleteProduct"]);
const { product } = defineProps(["product"]);
const notification = useNotification();

const { data, pending, error, execute } = await deleteProduct(product.id);
pending.value = false;
const handleDeleteProduct = async () => {
    await execute();

    if (error.value) {
        notification.value = {
            type: "error",
            message: "Something wrong when deleting product"
        }
        return;
    }
    notification.value = {
        type: "success",
        message: "Product deleted"
    }

    emit("deleteProduct", data.value.id);
}
</script>