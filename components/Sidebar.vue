<template>
    <div class="max-md:hidden z-10 fixed left-0 bottom-0 h-[calc(100dvh-4rem)] group hover:active unactive w-16 transition-[width] duration-500 hover:w-64 bg-primary shadow-md flex flex-col gap-2 p-2">
        <NuxtLink :to="{name: 'index'}" :class="{'bg-white/25': $route.name == 'index'}" class="group flex justify-between items-center hover:bg-white/25 transition-colors duration-150 py-2 px-4 rounded-sm">
            <div class="flex gap-4 justify-center items-center">
                <i class="bx bxs-dashboard text-white text-xl"></i>
                <p class="font-medium text-white">
                    Dashboard
                </p>
            </div>
            <i class="text-white group-hover:translate-x-0 -translate-x-4 opacity-0 group-hover:opacity-100 duration-150 transition-all bx bx-chevron-right text-xl"></i>
        </NuxtLink>
        <NuxtLink :to="{name: 'categories'}" :class="{'bg-white/25': $route.name == 'categories'}" class="group flex justify-between items-center hover:bg-white/25 transition-colors duration-150 py-2 px-4 rounded-sm">
            <div class="flex gap-4 justify-center items-center">
                <i class="bx bx-category text-white text-xl"></i>
                <p class="font-medium text-white">
                    Categories
                </p>
            </div>
            <i class="text-white group-hover:translate-x-0 -translate-x-4 opacity-0 group-hover:opacity-100 duration-150 transition-all bx bx-chevron-right text-xl"></i>
        </NuxtLink>
        <NuxtLink :to="{name: 'products'}" :class="{'bg-white/25': $route.name == 'products'}" class="group flex justify-between items-center hover:bg-white/25 transition-colors duration-150 py-2 px-4 rounded-sm">
            <div class="flex gap-4 justify-center items-center">
                <i class="bx bxs-component text-white text-xl"></i>
                <p class="font-medium text-white">
                    Products
                </p>
            </div>
            <i class="text-white group-hover:translate-x-0 -translate-x-4 opacity-0 group-hover:opacity-100 duration-150 transition-all bx bx-chevron-right text-xl"></i>
        </NuxtLink>
        <NuxtLink :to="{name: 'orders'}" :class="{'bg-white/25': $route.name == 'orders'}" class="group flex justify-between items-center hover:bg-white/25 transition-colors duration-150 py-2 px-4 rounded-sm">
            <div class="flex gap-4 justify-center items-center">
                <i class="bx bx-package text-white text-xl"></i>
                <p class="font-medium text-white">
                    Orders
                </p>
            </div>
            <i class="text-white group-hover:translate-x-0 -translate-x-4 opacity-0 group-hover:opacity-100 duration-150 transition-all bx bx-chevron-right text-xl"></i>
        </NuxtLink>
        <button @click="logout" class="group flex justify-between items-center hover:bg-white/25 transition-colors duration-150 py-2 px-4 rounded-sm">
            <div class="flex gap-4 justify-center items-center">
                <i class="bx bx-log-out text-white text-xl"></i>
                <p class="font-medium text-white">
                    Logout
                </p>
            </div>
            <i class="text-white group-hover:translate-x-0 -translate-x-4 opacity-0 group-hover:opacity-100 duration-150 transition-all bx bx-chevron-right text-xl"></i>
        </button>
    </div>
</template>
<script setup>

</script>