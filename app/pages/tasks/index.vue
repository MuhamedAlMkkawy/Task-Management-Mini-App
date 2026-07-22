<template>
  <section class="py-8">
    <div class="flex items-center justify-between mb-6" v-if="!tasks">
      <h1 class="text-3xl font-bold">Tasks</h1>

      <MainButton
        label="Add Task"
        path="/tasks/modify"
        class="max-w-[150px] !m-0"
      />
    </div>

    <!-- Search & Filter -->
    <div
      v-if="tasks.length"
      class="flex flex-col md:flex-row gap-4 mb-6 border-[1px] border-[#000] px-4 rounded-[10px]"
    >
    <input
      v-model="search"
      type="text"
      placeholder="Search by title..."
      class="w-full md:flex-1 border rounded-lg px-4 py-2"
    />
    <div class="border-l-[1px] border-[#000]">
      <select
        v-model="statusFilter"
        class="border rounded-lg px-4 py-2 w-[180px]"
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
    </div>
    
    <div
      v-if="filteredTasks.length"
      class="grid gap-4"
    >
      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="rounded-xl border p-5 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div>
            <h2 class="text-xl font-semibold">
              {{ task.title }}
            </h2>

            <p class="mt-2 text-gray-600">
              {{ task.description || "No description." }}
            </p>
          </div>

          <span
            class="rounded-full px-3 py-1 text-sm"
            :class="statusClass(task.status)"
          >
            {{ task.status }}
          </span>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <span>
            <strong>Due:</strong>
            {{ formatDate(task.dueDate) }}
          </span>

          <div class="flex gap-2">
            <MainButton
              icon="pi pi-pencil"
              :path="`/tasks/modify?id=${task.id}`"
              class="!bg-[#F59E0B] hover:!bg-[#fcd34d] !h-[40px] !w-[50px] text-white p-2 !m-0"
            />
            <MainButton
              icon="pi pi-trash"
              @click="handleRemoveTask(task.id)"
              class="!bg-[#EF4444] !hover:bg-[#f87171] !h-[40px] !w-[50px] text-[#fff] p-2 !m-0"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="rounded-lg p-10 text-center flex flex-col items-center justify-center h-[80vh] max-w-[400px] mx-auto"
    >
      <FeaturesNotFoundEyes class="!h-[fit-content]"/>
      <h2 class="text-xl mt-5 font-semibold">No tasks found</h2>

      <p class="mt-2 text-gray-500">
        Create your first task.
      </p>

      <MainButton
        class="mt-6"
        label="Add Task"
        path="/tasks/modify"
      />
    </div>
  </section>
</template>

<script setup>
const taskStore = useTaskStore();
const toast = useToast();

const { tasks } = storeToRefs(taskStore);

const { removeTask } = taskStore;

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};


// handle the status class for the task status badge
const statusClass = (status) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-700";

    case "in-progress":
      return "bg-blue-100 text-blue-700";

    case "done":
      return "bg-green-100 text-green-700";

    default:
      return "";
  }
};

// handle remove the task
const handleRemoveTask = (taskId) => {
  if(taskId){
    removeTask(taskId);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task removed successfully",
      life: 1000,
    });
  }else{
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Task ID is invalid",
      life: 1000,
    });
  }
};


// handle search and filter
const search = ref("");
const statusFilter = ref("all");

const filteredTasks = computed(() => {
  let result = [...tasks.value];

  // Search by title only
  if (search.value.trim()) {
    result = result.filter(task =>
      task.title.toLowerCase().includes(search.value.trim().toLowerCase())
    );
  }

  // Filter by status only
  if (statusFilter.value !== "all") {
    result = result.filter(task =>
      task.status === statusFilter.value
    );
  }

  return result;
});
</script>