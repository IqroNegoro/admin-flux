<template>
    <div class="fixed z-20 w-full h-full top-0 left-0 bg-black/25 flex justify-center items-center">
        <form class="w-96 bg-white flex flex-col gap-4 p-4" @submit.prevent="handlePost">
            <div class="flex flex-row justify-between">
                <div></div>
                <p class="text-primary text-2xl font-medium">
                    Edit category
                </p>
                <button type="button" @click="$emit('closeEditCategory')" class="px-1 hover:bg-black/25 rounded-full">
                    <i class="bx bx-x text-2xl"></i>
                </button>
            </div>
            <div class="w-full flex flex-col gap-1">
                <p class="font-medium w-full">Category Name</p>
                <div v-if="pendingCategory" class="w-full skeleton h-8 rounded-sm"></div>
                <input v-else type="text" class="w-full" placeholder="Product Name" v-model="name" :class="{'border border-red-500': errors.name}">
                <p v-if="errors.name" class="text-red-500 text-sm"> {{ errors.name }} </p>
            </div>
            <button type="submit" class="w-full text-white hover disabled:cursor-not-allowed py-2" @click="handlePost" :disabled="pending || pendingCategory || !name" >
                <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
                <p v-else>
                    Edit
                </p>
            </button>
        </form>
    </div>
</template>
<script setup>
import { toTypedSchema } from "@vee-validate/yup";
import { object, string } from "yup";

const notification = useNotification();

const { id } = defineProps(["id"]);

const emit = defineEmits(["editCategory", "closeEditCategory"]);

const {data: category, pending: pendingCategory, error: errorCategory, refresh } = await getCategory(id);

const { values, defineField, errors, setErrors, validate } = useForm({
    validationSchema: toTypedSchema(object({
        name: string().required("Please fill the category name").trim(),
    })),
});

const validateType = {
    validateOnBlur: false,
    validateOnChange: false,
    validateOnModelUpdate: false,
    validateOnInput: false
}

const [name, nameAttr] = defineField("name", validateType)

watch(category, val => {
    if (val) name.value = val.name
})

const pending = ref(false);

const handlePost = async () => {
    if (pending.value || !name.value) return;

    pending.value = true;

    const validating = await validate();

    if (!validating.valid) {
        pending.value = false;
        return;
    }

    const {data, error} = await updateCategory(category.value.id, values);

    pending.value = false;

    if (error.value) {
        notification.error("Something went wrong when updating category");
        setErrors(error.value.data.data);
        return;
    }

    emit("editCategory", data.value);
    notification.success("Success updating category");
    emit("closeEditCategory");
}

</script>