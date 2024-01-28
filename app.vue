<template>
  <NuxtLayout>
    <Transition name="pop-down">
      <Notification v-if="notification.notification" />
    </Transition>
    <!-- <NuxtLoadingIndicator /> -->
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
const notification = useNotification();
</script>
<style>
.pop-down-enter-active,
.pop-down-leave-active {
  transition: all 0.4s;
}
.pop-down-enter-from,
.pop-down-leave-to {
  opacity: 0;
  transform: translateY(-1rem)
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
