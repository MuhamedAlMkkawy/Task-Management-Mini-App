<template>
  <section>
    <div class="task_container">
      <!-- Skeleton Loading -->
      <template v-if="!getResult">
        <div
          v-for="i in 40"
          :key="i"
          class="flex flex-col border-[1px] border-[grey] p-4 w-full rounded-[10px]"
        >
          <Skeleton width="70%" height="22px" class="mb-3" />

          <Skeleton width="100%" height="16px" class="mb-2" />
          <Skeleton width="90%" height="16px" class="mb-2" />
          <Skeleton width="60%" height="16px" class="mb-4" />

        </div>
      </template>

      <!-- Data -->
      <template v-else>
        <div
          class="flex flex-col border-[1px] border-[#000] p-4 w-full rounded-[10px]"
          v-for="item in getResult"
          :key="item.id"
        >
          <div class="flex items-baseline justify-between gap-2 mb-2">
            <div class="text-[18px] truncate">
              {{ item.title }}
            </div>
          </div>

          <p class="text-[14px] text-[grey] line-clamp-3">
            {{ item.body }}
          </p>

        </div>
      </template>
    </div>
  </section>
</template>

<script setup>
import Skeleton from "primevue/skeleton";

const { getMethod, getResult } = useApiMethods();

onMounted(() => {
  setTimeout(() => {
    getMethod(
      "https://jsonplaceholder.typicode.com/posts",
      null,
      false,
      true
    );
  }, 5000);
});
</script>