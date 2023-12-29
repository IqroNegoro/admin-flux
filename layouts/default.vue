<template>
    <Navbar />
    <div class="flex flex-row overflow-hidden h-[calc(100vh-4rem)] max-h-screen w-full">
        <Sidebar />
        <div class="p-4 w-full">
            <slot />
        </div>
    </div>
</template>
<script setup>
</script>