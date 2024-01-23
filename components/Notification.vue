<template>
    <button class="flex flex-row justify-center items-center fixed top-0 left-0 m-1 p-2  rounded-sm shadow-md z-50" :class="{'bg-primary text-white': notification.notification.type == 'success', 'bg-red-500 text-white': notification.notification.type == 'error'}" @click="notification.clear()">
        <div class="flex justify-center items-center pr-2">
            <i class='bx text-4xl text-white' :class="{'bx-check': notification.notification.type === 'success', 'bx-error-circle': notification.notification.type === 'error'}"></i>
        </div>
        <p class="text-sm text-left tracking-wide font-medium">
            {{ notification.notification.message }}
        </p>
    </button>
</template>
<script setup>
const notification = useNotification();
</script>