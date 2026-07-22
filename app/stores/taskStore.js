import { defineStore } from "pinia";

export const useTaskStore = defineStore(
  "taskStore",
  () => {
    const tasks = ref([]);

    const addTask = (task) => {
      tasks.value.push({
        id: Date.now(),
        ...task,
      });
    };

    const removeTask = (id) => {
      tasks.value = tasks.value.filter((task) => task.id !== id);
    };

    const updateTask = (updatedTask) => {
      const index = tasks.value.findIndex(
        (task) => task.id === updatedTask.id
      );

      if (index !== -1) {
        tasks.value[index] = updatedTask;
      }
    };

    return {
      tasks,
      addTask,
      removeTask,
      updateTask,
    };
  },
  {
    persist: true
  }
);