<template>
    <div class="flex flex-col justify-between rounded-md shadow-md cursor-pointer p-2">
        <div class="border-b-0 rounded-t-md p-2">
            <img :src="product?.images[0]" :alt="product?.name" class="rounded-md w-full object-center object-cover aspect-square mx-auto">
        </div>
        <div class="p-2 bg-grey-100 flex flex-col gap-1">
            <p class="truncate font-medium tracking-wide max-md:text-sm"> {{ product?.title ?? product?.name }} </p>
            <p class="text-gray-500 max-md:text-xs text-sm">{{formatRp(product?.price)}}</p>
            <div class="text-gray-500 text-xs flex flex-row justify-between">
                <p>Stock</p>
                <p>x{{product?.stock || 0}}</p>
            </div>
            <p class="truncate text-sm">{{ product?.sub }}</p>
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
        notification.error("Something error when deleting product");
        return;
    }
    notification.success("Success deleting product");

    emit("deleteProduct", product.id);
}
</script>