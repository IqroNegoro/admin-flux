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
                    <p v-if="image === false || errors.image" class="text-red-500 text-sm text-center"> {{ errors.image || "Please put a image" }}</p>
                </div>
                <input type="file" id="image" class="hidden" accept=".jpg,.webp,.jpeg,.png" @input="handleInputFile">
                <div class="w-full flex flex-col gap-1">
                    <p class="font-medium">Product Name</p>
                    <input type="text" class="w-full" placeholder="Product Name" v-model="name" :class="{'border border-red-500': errors.name}">
                    <p v-if="errors.name" class="text-red-500 text-sm"> {{ errors.name }} </p>
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
                    <p class="font-medium">Stock Product</p>
                    <input type="number" class="w-full" placeholder="Stock" v-model="stock" :class="{'border border-red-500': errors.stock}">
                    <p v-if="errors.stock" class="text-red-500 text-sm"> {{ errors.stock }} </p>
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
                    <p class="font-medium">Product Description</p>
                    <div class="w-full">
                        <QuillEditor placeholder="Description" contentType="html" theme="snow" v-model:content.trim="description" />
                    </div>
                </div>
            </div>
            <div class="flex flex-row gap-2">
                <button type="submit" class="w-full text-white hover disabled:cursor-not-allowed py-2" @click="handlePost" >
                <!-- <button type="submit" class="w-full text-white hover disabled:cursor-not-allowed py-2" @click="handlePost" :disabled="pending || !image || !name || !stock || !price"> -->
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
import { toTypedSchema } from "@vee-validate/yup";
import { object, string, number } from "yup";

const QuillOptions = ref({
    modules: {
        toolbar: [
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{"header": 1}, {"header": 2}],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            ['clean']
        ]
    }
});

const emit = defineEmits(["addProduct", "closeAddProduct"]);
const notification = useNotification();

const { values, defineField, errors, setErrors, validate } = useForm({
    validationSchema: toTypedSchema(object({
        image: string().required("Please put the product image"),
        name: string().required("Please fill the product name").trim(),
        weight: number().typeError("Please fill stock the product").required("Please fill weight of product").min(0),
        stock: number().typeError("Please fill stock the product").required("Please fill stock the product").min(0),
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

const [image, imageAttr] = defineField("image", validateType)
const [name, nameAttr] = defineField("name", validateType)
const [weight, weightAttr] = defineField("weight", validateType)
const [stock, stockAttr] = defineField("stock", validateType)
const [price, priceAttr] = defineField("price", validateType)
const [description, descriptionAttr] = defineField("description", validateType)

const pending = ref(false);
const preview = ref(false);

const handleInputFile = (target) => {
    image.value = handleFile(target);
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
    fd.append("image", image.value);
    fd.append("weight", weight.value);
    fd.append("stock", stock.value);
    fd.append("price", price.value);
    fd.append("description", description.value);

    const {data, error} = await createProduct(fd);

    pending.value = false;

    if (error.value) {
        notification.error("Something went wrong when updating product");
        setErrors(error.value.data.data);
        return;
    }

    emit("addProduct", data.value);
    notification.success("Success updating product");
    emit("closeAddProduct");
}
</script>