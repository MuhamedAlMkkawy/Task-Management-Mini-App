<template>
  <header class="header flex justify-between items-center bg-[#000] text-[#fff] text-center text-[20px] align-center font-bold p-5">
    <NuxtLink to="/">Task Management Mini App</NuxtLink>
    <div class="flex align-center gap-4">
      <MainButton
        label="Tasks"
        path="/tasks"
        class="py-2 !h-[fit-content] px-5 !m-0"
      />
      <MainButton
        icon="pi pi-plus"
        label="Add Task"
        path="/tasks/modify"
        class="py-2 !h-[fit-content] px-5 !m-0 !min-w-[150px]"
      />
    </div>
  </header>
</template>

<script setup>

</script>


