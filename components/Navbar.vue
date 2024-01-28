<template>
    <div class="z-20 w-full h-16 shadow-sm flex justify-between items-center flex-row px-4 overflow-hidden sticky top-0 bg-white">
        <h1 class="text-primary font-bold text-xl md:text-3xl tracking-widest">Flux</h1>
        <div class="flex flex-row justify-center items-center gap-2">
            <!-- <form class="focus-within:border focus-within:border-primary flex flex-row justify-center items-center bg-gray-50 rounded-full p-1 px-3" @submit.prevent>
                <button type="submit" class="pr-1">
                    <i class="bx bx-search text-2xl text-primary"></i>
                </button>
                <input type="text" class="bg-transparent border-0">
            </form> -->
            <div class="flex flex-row justify-center items-center gap-2 border-l pl-3">
                <p>{{user.name}}</p>
            </div>
        </div>
    </div>
</template>
<script setup>
const user = useUser();
</script>