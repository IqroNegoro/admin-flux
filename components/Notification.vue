<template>
    <button class="flex flex-row justify-center items-center fixed top-0 left-0 m-1 p-2  rounded-sm shadow-md z-50" :class="{'bg-primary text-white': notification.type == 'success', 'bg-red-500 text-white': notification.type == 'error'}" @click="notification.message = null">
        <div class="flex justify-center items-center pr-2">
            <i class='bx text-4xl text-white' :class="{'bx-check': notification.type === 'success', 'bx-error-circle': notification.type === 'error'}"></i>
        </div>
        <p class="text-sm text-left tracking-wide font-medium">
            {{ notification.message }}
        </p>
    </button>
</template>
<script setup>
const { notification } = defineProps(["notification"])
</script>