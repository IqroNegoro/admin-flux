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

</script>