<template>
    <Navbar />
    <div class="flex bg-white flex-row overflow-hidden h-[calc(100vh-4rem)] max-h-screen w-full">
        <Sidebar />
        <div class="p-4 w-full overflow-y-auto">
            <slot />
        </div>
    </div>
</template>
<script setup>
</script>