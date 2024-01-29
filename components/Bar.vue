<template>
    <div class="md:hidden z-10 fixed bottom-0 left-0 w-full h-16 bg-primary flex flex-row justify-around items-center px-1">
        <NuxtLink :to="{name: 'index'}" :class="{'bg-white/25': $route.name == 'index'}" class="text-white w-full hover:bg-white/25 flex justify-center items-center flex-col transition-colors duration-150 px-3 py-1 rounded-sm">
            <i class="bx bxs-dashboard text-xl"></i>
            <p class="text-xs font-medium">Dashboard</p>
        </NuxtLink>
        <NuxtLink :to="{name: 'categories'}" :class="{'bg-white/25': $route.name == 'categories'}" class="text-white w-full hover:bg-white/25 flex justify-center items-center flex-col transition-colors duration-150 px-3 py-1 rounded-sm">
            <i class="bx bx-category text-xl"></i>
            <p class="text-xs font-medium">Categories</p>
        </NuxtLink>
        <NuxtLink :to="{name: 'products'}" :class="{'bg-white/25': $route.name == 'products'}" class="text-white w-full hover:bg-white/25 flex justify-center items-center flex-col transition-colors duration-150 px-3 py-1 rounded-sm">
            <i class="bx bxs-component text-xl"></i>
            <p class="text-xs font-medium">Products</p>
        </NuxtLink>
        <NuxtLink :to="{name: 'orders'}" :class="{'bg-white/25': $route.name == 'orders'}" class="text-white w-full hover:bg-white/25 flex justify-center items-center flex-col transition-colors duration-150 px-3 py-1 rounded-sm">
            <i class="bx bx-package text-xl"></i>
            <p class="text-xs font-medium">Orders</p>
        </NuxtLink>
        <button @click="logout" class="text-white w-full hover:bg-white/25 flex justify-center items-center flex-col transition-colors duration-150 px-3 py-1 rounded-sm">
            <i class="bx bx-log-out text-xl"></i>
            <p class="text-xs font-medium">Logout</p>
        </button>
    </div>
</template>
<script setup>

</script>