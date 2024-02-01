<template>
    <div class="fixed z-20 w-full h-full top-0 left-0 bg-black/25 flex justify-center items-center">
        <form class="w-96 bg-white flex flex-col gap-4 p-4" @submit.prevent="handlePost">
            <div class="flex flex-row justify-between">
                <div></div>
                <p class="text-primary text-2xl font-medium">
                    Add category
                </p>
                <button type="button" @click="$emit('closeAddCategory')" class="px-1 hover:bg-black/25 rounded-full">
                    <i class="bx bx-x text-2xl"></i>
                </button>
            </div>
            <div class="w-full flex flex-col gap-1">
                <p class="font-medium w-full">Category Name</p>
                <input type="text" class="w-full" placeholder="Product Name" v-model="name" :class="{'border border-red-500': errors.name}">
                <p v-if="errors.name" class="text-red-500 text-sm"> {{ errors.name }} </p>
            </div>
            <button type="submit" class="w-full text-white hover disabled:cursor-not-allowed py-2" @click="handlePost" >
            <!-- <button type="submit" class="w-full text-white hover disabled:cursor-not-allowed py-2" @click="handlePost" :disabled="pending || !image || !name || !stock || !price"> -->
                <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
                <p v-else>
                    Add
                </p>
            </button>
        </form>
    </div>
</template>
<script setup>
import { toTypedSchema } from "@vee-validate/yup";
import { object, string, number, boolean } from "yup";

const emit = defineEmits(["addCategory", "closeAddCategory"]);
const notification = useNotification();

const { values, defineField, errors, setErrors, validate } = useForm({
    validationSchema: toTypedSchema(object({
        name: string().required("Please fill the category name").trim(),
    }))
});

const validateType = {
    validateOnBlur: false,
    validateOnChange: false,
    validateOnModelUpdate: false,
    validateOnInput: false
}

const [name, nameAttr] = defineField("name", validateType)

const pending = ref(false);

const handlePost = async () => {
    if (pending.value || !name.value) return;
    pending.value = true;

    const validating = await validate();

    if (!validating.valid) {
        pending.value = false;
        return;
    }

    const {data, error} = await createCategory(values);

    pending.value = false;

    if (error.value) {
        if (error.value.statusCode === 400) {
            setErrors(error.value.data.data);
        }
        notification.error(error.value.data.message);
        return;
    }

    emit("addCategory", data.value);
    notification.success("Success creating category");
    emit("closeAddCategory");
}
</script>