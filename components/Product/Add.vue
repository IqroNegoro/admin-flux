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
                <label for="image" class="w-48 h-48 rounded-md flex justify-center items-center cursor-pointer" :class="{'bg-black/25': !image}">
                    <img v-if="image" :src="renderImage(image)" alt="" class="rounded-sm aspect-square object-center object-contain">
                    <i v-if="!image" class="bx bx-camera"></i>
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
                <div contenteditable="true" placeholder="Describe product" class="relative w-full min-h-36" @input="({target}) => description = target.innerText"></div>
            </div>
            <div class="flex flex-row gap-2">
                <button type="submit" class="w-full text-white hover py-2" @click="handlePost">Add</button>
                <button type="button" class="w-full text-primary hover:text-white hover:bg-primary duration-150 transition-colors border border-primary" @click="preview = true">Preview</button>
            </div>
        </form>
        <LazyProductPreview v-if="preview" :product="product" @close-preview="preview = false" />
    </div>
</template>
<script setup>
const emits = defineEmits(["closeAddProduct"]);
const image = ref(null);
const name = ref(null);
const stock = ref(null);
const price = ref(null);
const description = ref(null);
const pending = ref(false);
const preview = ref(false);
const product = computed(() => ({
    image,
    name,
    stock,
    price
}));

const handleInputFile = (target) => {
    image.value = handleFile(target);
}

const handlePost = async () => {
    if (pending.value || !image.value || !name.value || !stock.value || !price.value) return;
    console.log("berak")
    pending.value = true;
    console.log(typeof price.value)
    const fd = new FormData();
    fd.append("name", name.value);
    fd.append("image", image.value);
    fd.append("stock", stock.value);
    fd.append("price", price.value);

    const {data, error} = await createProduct(fd);

    if (error.value) {
        console.log(error.value);
    }

    console.log(data.value)

    pending.value = false;
}
</script>