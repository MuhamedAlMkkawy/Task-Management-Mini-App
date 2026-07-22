<template>
  <NuxtLayout>
    <NuxtPage />
    <Toast />
  </NuxtLayout>
</template>

<script setup>
  import Toast from "primevue/toast";
</script>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: all 0.4s;
  }
  .page-enter-from,
  .page-leave-to {
    opacity: 0;
    /* transform: scale(0.7) rotate(4deg); */
    transform: translateX(15px);
  }
</style>
