<template>
    <div class="fixed w-full h-full top-0 left-0 bg-black/25 flex justify-center items-center">
        <form class="w-full h-full bg-white flex flex-col gap-4 p-4" @submit.prevent="handlePost">
            <ProductEditSkeleton v-if="pending" />
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
                <div class="h-full w-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4 items-center">
                    <div class="col-[1/-1] flex flex-col justify-center items-center">
                        <label for="image" class="relative w-48 h-48 rounded-md flex justify-center items-center cursor-pointer" :class="{'bg-black/25': !newImage && !image}">
                            <button v-if="newImage" @click.prevent="newImage = null" class="absolute top-0 right-0 hover p-1 rounded-full flex justify-center items-center text-white"><i class="bx bx-x"></i></button>
                            <img v-if="image && !newImage" :src="image" alt="" class="rounded-sm aspect-square object-center object-contain">
                            <img v-else-if="newImage" :src="renderImage(newImage)" alt="" class="rounded-sm aspect-square object-center object-contain">
                            <i v-else class="bx bx-camera"></i>
                        </label>
                        <p v-if="image === false || errors.image" class="text-red-500 text-sm text-center"> {{ errors.image || "Please put a image" }}</p>
                    </div>
                    <input type="file" id="image" class="hidden" accept=".jpg,.webp,.jpeg,.png" @input="handleInputFile">
                    <div class="w-full flex flex-col gap-1">
                        <p class="font-medium">Product Name</p>
                        <input type="text" class="w-full" placeholder="Product Name" v-model="name" :class="{'border border-red-500': errors.name}">
                        <p v-if="errors.name" class="text-red-500 text-sm"> {{ errors.name }} </p>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <p class="font-medium">Sub Text</p>
                        <input type="text" class="w-full" placeholder="Product Sub Text" v-model="sub" :class="{'border border-red-500': errors.sub}">
                        <p v-if="errors.sub" class="text-red-500 text-sm"> {{ errors.sub }} </p>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <p class="font-medium">Product Weight</p>
                        <div class="flex flex-row">
                            <input type="number" class="w-full appearance-none" placeholder="0" v-model="weight" :class="{'border border-red-500': errors.weight}">
                            <div class="flex justify-center items-center bg-primary/10 text-center">
                                <p class="bg-white font-medium h-full p-2">
                                    g
                                </p>
                            </div>
                        </div>
                        <p v-if="errors.weight" class="text-red-500 text-sm"> {{ errors.weight }} </p>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <p class="font-medium">Product Price</p>
                        <div class="flex flex-row">
                            <div class="flex justify-center items-center bg-primary/10 text-center">
                                <p class="bg-white font-medium h-full p-2">
                                    Rp.
                                </p>
                            </div>
                            <input type="number" class="w-full" placeholder="0" v-model="price" :class="{'border border-red-500': errors.price}">
                        </div>
                        <p v-if="errors.price" class="text-red-500 text-sm"> {{ errors.price }} </p>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <p class="font-medium">Status Product</p>
                        <div class="flex flex-row gap-2 items-center">
                            <div class="flex flex-row gap-1">
                                <input type="radio" v-model="available" value="true" name="available" id="available">
                                <label for="available">Available</label>
                            </div>
                            <div class="flex flex-row gap-1">
                                <input type="radio" v-model="available" value="false" name="available" id="unavailable">
                                <label for="unavailable">Out of Stock</label>
                            </div>
                        </div>
                        <p v-if="errors.available" class="text-red-500 text-sm"> {{ errors.available }} </p>
                    </div>
                    <div class="w-full flex flex-col gap-1">
                        <p class="font-medium">Published</p>
                        <div class="flex flex-row gap-2 items-center">
                            <div class="flex flex-row gap-1">
                                <input type="radio" v-model="published" value="true" name="publish" id="publish">
                                <label for="publish">Publish</label>
                            </div>
                            <div class="flex flex-row gap-1">
                                <input type="radio" v-model="published" value="false" name="publish" id="unpublish">
                                <label for="unpublish">Unpublish</label>
                            </div>
                        </div>
                        <p v-if="errors.published" class="text-red-500 text-sm"> {{ errors.published }} </p>
                    </div>
                    <div class="w-full flex flex-col gap-1 col-[1/-1]">
                        <p class="font-medium">Product Description</p>
                        <div class="w-full h-64">
                            <QuillEditor placeholder="Description" contentType="html" theme="snow" v-model:content.trim="description" />
                        </div>
                    </div>
                </div>
                <div class="flex flex-row gap-2">
                    <!-- <button type="submit" class="w-full text-white hover disabled:cursor-not-allowed py-2" @click="handlePost" :disabled="pending || !(newImage || image) || !name || !stock || !price || !description"> -->
                    <button type="submit" class="w-full text-white hover disabled:cursor-not-allowed py-2" @click="handlePost" >
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
import { toTypedSchema } from "@vee-validate/yup";
import { object, string, number, boolean } from "yup";

const QuillOptions = ref({
    modules: {
        toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{"header": 1}, {"header": 2}],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['clean']
        ]
    }
})
const emit = defineEmits(["editProduct", "closeEditProduct"]);
const { id } = defineProps(["id"]);
const notification = useNotification();

const { values, defineField, errors, setErrors, validate } = useForm({
    validationSchema: toTypedSchema(object({
        newImage: string().nullable().ensure(),
        image: string().required("Please put the product image"),
        name: string().required("Please fill the product name").trim(),
        sub: string().required("Please fill the product sub text").trim(),
        weight: number().typeError("Please fill stock the product").required("Please fill weight of product").min(0),
        available: boolean().default(false),
        published: boolean().default(false),
        price: number().typeError("Please fill price the product").required("Please fill price the product").min(0).max(99999999, max => `Price must less then or equal to ${formatRp(max.max)}`),
        description: string().nullable().ensure().trim()
    }))
});

const validateType = {
    validateOnBlur: false,
    validateOnChange: false,
    validateOnModelUpdate: false,
    validateOnInput: false
}

const [newImage, newImageAttr] = defineField("newImage", validateType)
const [image, imageAttr] = defineField("image", validateType)
const [sub, subAttr] = defineField("sub", validateType)
const [name, nameAttr] = defineField("name", validateType)
const [weight, weightAttr] = defineField("weight", validateType)
const [available, availableAttr] = defineField("available", validateType)
const [published, publishedAttr] = defineField("published", validateType)
const [price, priceAttr] = defineField("price", validateType)
const [description, descriptionAttr] = defineField("description", validateType)

const pending = ref(false);
const preview = ref(false);

const { data: product, pending: pendingProduct, error, refresh } = await getProduct(id);

watch(product, val => {
    if (val) {
        image.value = val.image
        name.value = val.name
        sub.value = val.sub
        weight.value = val.weight
        available.value = val.available
        published.value = val.published
        price.value = val.price
        description.value = val.description
    }
})

const handleInputFile = (target) => {
    newImage.value = handleFile(target);
}

const handlePost = async () => {
    if (pending.value) return;

    pending.value = true;

    const validating = await validate();

    if (!validating.valid) {
        pending.value = false;
        return;
    }

    const fd = new FormData();
    fd.append("name", name.value);
    fd.append("sub", sub.value);
    fd.append("weight", weight.value);
    fd.append("available", available.value);
    fd.append("published", published.value);
    fd.append("price", price.value);
    fd.append("description", description.value);

    if (newImage.value) {
        fd.append("image", newImage.value);
    }

    const {data, error} = await updateProduct(product.value.id, fd);

    pending.value = false;

    if (error.value) {
        notification.error("Something went wrong when updating product");
        setErrors(error.value.data.data);
        return;
    }

    emit("editProduct", data.value);
    notification.success("Success updating product");
    emit("closeEditProduct");
}
</script>