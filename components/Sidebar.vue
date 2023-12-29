<template>
    <div class="bg-white w-64 h-full shadow-md flex flex-col gap-4 p-2">
        <NuxtLink to="/" class="group flex justify-between items-center hover:bg-black/5 p-2 rounded-sm">
            <div class="flex gap-4 justify-center items-center">
                <i class="bx bxs-dashboard text-primary text-xl"></i>
                <p class="font-medium">
                    Dashboard
                </p>
            </div>
            <i class="group-hover:translate-x-0 -translate-x-4 opacity-0 group-hover:opacity-100 duration-150 transition-all bx bx-chevron-right text-xl"></i>
        </NuxtLink>
        <NuxtLink :to="{name: 'products'}" class="group flex justify-between items-center hover:bg-black/5 p-2 rounded-sm">
            <div class="flex gap-4 justify-center items-center">
                <i class="bx bxs-component text-primary text-xl"></i>
                <p class="font-medium">
                    Products
                </p>
            </div>
            <i class="group-hover:translate-x-0 -translate-x-4 opacity-0 group-hover:opacity-100 duration-150 transition-all bx bx-chevron-right text-xl"></i>
        </NuxtLink>
        <NuxtLink to="/" class="group flex justify-between items-center hover:bg-black/5 p-2 rounded-sm">
            <div class="flex gap-4 justify-center items-center">
                <i class="bx bx-package text-primary text-xl"></i>
                <p class="font-medium">
                    Orders
                </p>
            </div>
            <i class="group-hover:translate-x-0 -translate-x-4 opacity-0 group-hover:opacity-100 duration-150 transition-all bx bx-chevron-right text-xl"></i>
        </NuxtLink>
        <button @click="logout" class="group flex justify-between items-center hover:bg-black/5 p-2 rounded-sm">
            <div class="flex gap-4 justify-center items-center">
                <i class="bx bx-log-out text-primary text-xl"></i>
                <p class="font-medium">
                    Logout
                </p>
            </div>
            <i class="group-hover:translate-x-0 -translate-x-4 opacity-0 group-hover:opacity-100 duration-150 transition-all bx bx-chevron-right text-xl"></i>
        </button>
    </div>
</template>
<script setup>

</script>