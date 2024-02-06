<template>
    <div class="fixed z-20 w-full h-full top-0 left-0 bg-black/25 flex justify-center items-center">
        <form class="w-full h-full bg-white flex flex-col gap-4 p-4" @submit.prevent="handlePost">
            <div class="flex flex-row justify-between">
                <div></div>
                <p class="text-primary text-2xl font-medium">
                    Add product
                </p>
                <button type="button" @click="$emit('closeAddProduct')" class="px-1 hover:bg-black/25 rounded-full">
                    <i class="bx bx-x text-2xl"></i>
                </button>
            </div>
            <div class="h-full w-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4 items-center">
                <div class="col-[1/-1] w-96 mx-auto flex flex-col gap-2 cursor-pointer">
                    <label for="images0" :class="{'bg-black/25': !images[0]}" class="aspect-square col-span-4">
                        <img v-if="images[0]" :src="renderImage(images[0])" alt="" class="w-full rounded-sm aspect-square object-center object-cover col-span-4" @click="images.splice(0,1, '')" />
                    </label>
                    <div class="grid grid-cols-4 grid-rows-2 gap-2 cursor-pointer">
                        <img v-if="images[1]" :src="renderImage(images[1])" alt="" class="rounded-sm aspect-square object-center object-cover" @click="images.splice(1, 1, '')">
                        <label v-else for="images1" class="bg-black/25 aspect-square"></label>
                        <img v-if="images[2]" :src="renderImage(images[2])" alt="" class="rounded-sm aspect-square object-center object-cover" @click="images.splice(2, 1, '')">
                        <label v-else for="images2" class="bg-black/25 aspect-square"></label>
                        <img v-if="images[3]" :src="renderImage(images[3])" alt="" class="rounded-sm aspect-square object-center object-cover" @click="images.splice(3, 1, '')">
                        <label v-else for="images3" class="bg-black/25 aspect-square"></label>
                        <img v-if="images[4]" :src="renderImage(images[4])" alt="" class="rounded-sm aspect-square object-center object-cover" @click="images.splice(4, 1, '')">
                        <label v-else for="images4" class="bg-black/25 aspect-square"></label>
                    </div>
                    <p v-if="images === false || errors.images" class="text-red-500 text-sm text-center"> {{ errors.images || "Please put a image" }}</p>
                </div>
                <input type="file" id="images0" class="hidden" accept=".jpg,.webp,.jpeg,.png" @input="handleInputFile">
                <input type="file" id="images1" class="hidden" accept=".jpg,.webp,.jpeg,.png" @input="handleInputFile">
                <input type="file" id="images2" class="hidden" accept=".jpg,.webp,.jpeg,.png" @input="handleInputFile">
                <input type="file" id="images3" class="hidden" accept=".jpg,.webp,.jpeg,.png" @input="handleInputFile">
                <input type="file" id="images4" class="hidden" accept=".jpg,.webp,.jpeg,.png" @input="handleInputFile">
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
                    <p class="font-medium">Stock Product</p>
                    <input type="text" class="w-full" placeholder="Stock Product" v-model="stock" :class="{'border border-red-500': errors.stock}">
                    <p v-if="errors.stock" class="text-red-500 text-sm"> {{ errors.stock }} </p>
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
                <div class="group relative w-full flex flex-col gap-1 md:col-span-2 lg:col-span-3">
                    <p class="font-medium">Category</p>
                    <button type="button" class="group text-left">Select Category</button>
                    <div class="hidden absolute top-full left-0 w-full max-h-64 overflow-y-auto border z-20 bg-white group-focus-within:flex flex-col gap-2" :class="{'justify-center items-center': pendingCategories}">
                        <i v-if="pendingCategories" class="bx bx-loader-alt bx-spin text-5xl"></i>
                        <template v-else>
                            <button v-for="category in productCategories.data" :key="category.id" :class="{'hidden': categories.includes(category.id)}" type="button" @click="categories.push(category.id)" class="p-2 hover:bg-black/10 font-medium w-full text-left"> {{ category.name }} </button>
                        </template>
                    </div>
                    <div class="w-full flex flex-row pb-2 gap-2 overflow-x-auto">
                        <button type="button" class="px-3 py-1 bg-primary font-medium text-white rounded-sm" v-for="category in categories" :key="category.id" @click="categories = categories.filter(v => v != category)">
                            {{ productCategories.data.find(v => v.id == category).name }}
                        </button>
                    </div>
                    <p v-if="errors.categories" class="text-red-500 text-sm"> {{ errors.categories }} </p>
                </div>
                <div class="w-full flex flex-col gap-1 col-[1/-1]">
                    <p class="font-medium">Product Description</p>
                    <div class="w-full h-64">
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
        <LazyProductPreview v-if="preview" :product="{image: images[0], name, stock, price, sub}" @close-preview="preview = false" />
    </div>
</template>
<script setup>
import { toTypedSchema } from "@vee-validate/yup";
import { object, string, number, boolean, array } from "yup";

const { data: productCategories, pending: pendingCategories, error, refresh } = await getCategories();

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
        images: array().required("Please put the product image"),
        name: string().required("Please fill the product name").ensure().trim(),
        sub: string().required("Please fill the product sub text").ensure().trim(),
        weight: number().min(0).typeError("Please fill weight of product").required("Please fill weight of product"),
        stock: number().min(0).typeError("Please fill stock the product").required("Please fill weight of product"),
        published: boolean().default(false),
        categories: array().min(1, "Please select min 1 category of product").required("Please select min 1 category of product"),
        price: number().min(0).typeError("Please fill price the product").required("Please fill price the product").max(99999999, max => `Price must less then or equal to ${formatRp(max.max)}`),
        description: string().nullable().ensure().trim()
    })),
    initialValues: {
        images: ["","","","",""],
        categories: []
    }
});

const validateType = {
    validateOnBlur: false,
    validateOnChange: false,
    validateOnModelUpdate: false,
    validateOnInput: false
}

const [images, imagesAttr] = defineField("images", validateType)
const [sub, subAttr] = defineField("sub", validateType)
const [name, nameAttr] = defineField("name", validateType)
const [weight, weightAttr] = defineField("weight", validateType)
const [stock, stockAttr] = defineField("stock", validateType)
const [published, publishedAttr] = defineField("published", validateType)
const [categories, categoriesAttr] = defineField("categories", validateType)
const [price, priceAttr] = defineField("price", validateType)
const [description, descriptionAttr] = defineField("description", validateType)

const pending = ref(false);
const preview = ref(false);

const handleInputFile = el => {
    const image = handleFile(el);
    if (!image) return;
    images.value[el.target.id.at(-1, '')] = image;
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
    for (let image of images.value.filter(v => v)) {
        fd.append("images[]", image);
    }
    fd.append("sub", sub.value);
    fd.append("weight", weight.value);
    fd.append("stock", stock.value);
    fd.append("published", published.value);
    for (let category of categories.value) {
        fd.append("categories[]", category);
    }
    fd.append("price", price.value);
    fd.append("description", description.value);

    const {data, error} = await createProduct(fd);

    pending.value = false;

    if (error.value) {
        notification.error("Something went wrong when creating product");
        setErrors(error.value.data.data);
        return;
    }

    emit("addProduct", data.value);
    notification.success("Success creating product");
    emit("closeAddProduct");
}
</script>