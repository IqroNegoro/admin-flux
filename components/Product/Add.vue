<template>
    <div class="fixed w-full h-full top-0 left-0 bg-black/25 flex justify-center items-center">
        <form class="w-full md:w-1/2 h-full md:h-auto bg-white flex flex-col gap-4 p-4" @submit.prevent="handlePost">
            <div class="flex flex-row justify-between">
                <div></div>
                <p class="text-primary text-2xl font-medium">
                    Add product
                </p>
                <button type="button" @click="$emit('closeAddProduct')" class="px-1 hover:bg-black/25 rounded-full">
                    <i class="bx bx-x text-2xl"></i>
                </button>
            </div>
            <div class="h-96 w-full overflow-y-auto flex flex-col gap-4 items-center">
                <div>
                    <label for="image" class="w-48 h-48 rounded-md flex justify-center items-center cursor-pointer" :class="{'bg-black/25': !image}">
                        <img v-if="image" :src="renderImage(image)" alt="" class="rounded-sm aspect-square object-center object-contain">
                        <i v-if="!image" class="bx bx-camera"></i>
                    </label>
                    <p v-if="image === false" class="text-red-500 text-sm">Please put a image</p>
                </div>
                <input type="file" id="image" class="hidden" accept=".jpg,.webp,.jpeg,.png" @input="handleInputFile">
                <div class="w-full">
                    <input type="text" class="w-full" placeholder="Product Name" v-model="name" :class="{'border border-red-500': inputError.name}">
                    <p v-if="inputError.name" class="text-red-500 text-sm"> {{ inputError.name }} </p>
                </div>
                <div class="w-full">
                    <input type="number" class="w-full" placeholder="Stock" v-model="stock" :class="{'border border-red-500': inputError.stock}">
                    <p v-if="inputError.stock" class="text-red-500 text-sm"> {{ inputError.stock }} </p>
                </div>
                <div class="w-full">
                    <div class="flex flex-row">
                        <div class="flex justify-center items-center bg-primary/10 text-center">
                            <p class="pl-2">
                                Rp.
                            </p>
                        </div>
                        <input type="number" class="w-full" placeholder="0" v-model="price" :class="{'border border-red-500': inputError.price}">
                    </div>
                    <p v-if="inputError.price" class="text-red-500 text-sm"> {{ inputError.price }} </p>
                </div>
                <div class="w-full">
                    <div contenteditable="true" placeholder="Describe product" class="relative w-full min-h-36" @input="({target}) => description = target.innerText" :class="{'border border-red-500': inputError.description}"></div>
                    <p v-if="inputError.description" class="text-red-500 text-sm"> {{ inputError.description }} </p>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <button type="submit" class="w-full text-white hover disabled:cursor-not-allowed py-2" @click="handlePost" :disabled="pending || !image || !name || !stock || !price">
                    <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
                    <p v-else>
                        Add
                    </p>
                </button>
                <button type="button" class="w-full text-primary hover:text-white hover:bg-primary duration-150 transition-colors border border-primary" @click="preview = true">Preview</button>
            </div>
        </form>
        <LazyProductPreview v-if="preview" :product="{image, name, stock, price, description}" @close-preview="preview = false" />
    </div>
</template>
<script setup>
const emit = defineEmits(["addProduct", "closeAddProduct"]);
const notification = useNotification();
const image = ref("");
const name = ref("");
const stock = ref("");
const price = ref("");
const description = ref("");
const pending = ref(false);
const inputError = ref({});
const preview = ref(false);

const handleInputFile = (target) => {
    image.value = handleFile(target);
}

const handlePost = async () => {
    if (pending.value || !image.value || !name.value || !stock.value || !price.value) return;
    inputError.value = {};
    pending.value = true;

    const fd = new FormData();
    fd.append("name", name.value);
    fd.append("image", image.value);
    fd.append("stock", stock.value);
    fd.append("price", price.value);
    fd.append("description", description.value);

    const {data, error} = await createProduct(fd);
    
    pending.value = false;

    if (error.value) {
        notification.value = {
            type: "error",
            message: "Something wrong when creating product"
        }
        inputError.value = error.value.data.data;
        return;
    }

    emit("addProduct", data.value);
    emit("closeAddProduct");
    notification.value = {
        type: "success",
        message: "Success creating product"
    }
}
</script>