<template>
    <div class="fixed w-full h-full top-0 left-0 bg-black/25 flex justify-center items-center">
        <form class="w-full md:w-1/2 h-full md:h-auto bg-white flex flex-col gap-4 p-4" @submit.prevent="handlePost">
            <ProductEditSkeleton v-if="pendingProduct" />
            <template v-else>
                <div class="flex flex-row justify-between">
                    <div></div>
                    <p class="text-primary text-2xl font-medium">
                        Edit product
                    </p>
                    <button type="button" @click="$emit('closeEditProduct')" class="px-1 hover:bg-black/25 rounded-full">
                        <i class="bx bx-x text-2xl"></i>
                    </button>
                </div>
                <div class="h-96 w-full overflow-y-auto flex flex-col gap-4 items-center">
                    <label for="image" class="relative w-48 h-48 rounded-md flex justify-center items-center cursor-pointer" :class="{'bg-black/25': !newImage && !image}">
                        <button v-if="newImage" @click.prevent="newImage = null" class="absolute top-0 right-0 hover p-1 rounded-full flex justify-center items-center text-white"><i class="bx bx-x"></i></button>
                        <img v-if="image && !newImage" :src="image" alt="" class="rounded-sm aspect-square object-center object-contain">
                        <img v-else-if="newImage" :src="renderImage(newImage)" alt="" class="rounded-sm aspect-square object-center object-contain">
                        <i v-else class="bx bx-camera"></i>
                    </label>
                    <p v-if="image === false" class="text-red-500">Please put a image</p>
                    <input type="file" id="image" class="hidden" accept=".jpg,.webp,.jpeg,.png" @input="handleInputFile">
                    <input type="text" class="w-full" placeholder="Product Name" v-model="name">
                    <div class="flex flex-row w-full gap-2">
                        <input type="number" class="w-full" placeholder="Stock" v-model="stock">
                        <div class="flex flex-row w-full">
                            <div class="flex justify-center items-center bg-primary/10 text-center">
                                <p class="pl-2">
                                    Rp.
                                </p>
                            </div>
                            <input type="number" class="w-full" placeholder="0" v-model="price">
                        </div>
                    </div>
                    <div contenteditable="true" placeholder="Describe product" class="relative w-full min-h-36" @input="({target}) => description = target.innerText"> {{ description }} </div>
                </div>
                <div class="flex flex-row gap-2">
                    <button type="submit" class="w-full text-white hover disabled:cursor-not-allowed py-2" @click="handlePost" :disabled="pending || !(newImage || image) || !name || !stock || !price || !description">
                        <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
                        <p v-else>
                            Edit
                        </p>
                    </button>
                    <!-- <button type="button" class="w-full text-primary hover:text-white hover:bg-primary duration-150 transition-colors border border-primary" @click="preview = true">Preview</button> -->
                </div>
            </template>
        </form>
        <!-- <LazyProductPreview v-if="preview" :product="{image, name, stock, price, description}" @close-preview="preview = false" /> -->
    </div>
</template>
<script setup>
const emit = defineEmits(["editProduct", "closeEditProduct"]);
const { id } = defineProps(["id"]);
const notification = useNotification();
const newImage = ref("");
const image = ref("");
const name = ref("");
const stock = ref("");
const price = ref("");
const description = ref("");
const pending = ref(false);
const preview = ref(false);

const { data: product, pending: pendingProduct, error, refresh } = await getProduct(id);

watch(product, val => {
    if (val) {
        image.value = val.image
        name.value = val.name
        stock.value = val.stock
        price.value = val.price
        description.value = val.description
    }
})

const handleInputFile = (target) => {
    newImage.value = handleFile(target);
}

const handlePost = async () => {
    if (pending.value || !(newImage.value || image.value) || !name.value || !stock.value || !price.value || !description.value) return;

    pending.value = true;

    const fd = new FormData();
    fd.append("name", name.value);
    fd.append("stock", stock.value);
    fd.append("price", price.value);
    fd.append("description", description.value);

    if (newImage.value) {
        fd.append("image", newImage.value);
    }

    const {data, error} = await updateProduct(product.value.id, fd);

    pending.value = false;

    if (error.value) {
        notification.value = {
            type: "error",
            message: "Something wrong when updating product"
        }
        return;
    }

    emit("editProduct", data.value);
    notification.value = {
        type: "success",
        message: "Success updating product"
    }
    emit("closeEditProduct");
}
</script>