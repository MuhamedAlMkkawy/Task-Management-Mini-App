<template>
  <section class="h-[80vh] flex flex-col items-center justify-center">
    <VeeForm
      :key="isEdit"
      :validation-schema="taskSchema"
      :initial-values="initialValues"
      @submit="handleSubmit"
      class="w-full"
      >

      <div class="inputs">
        <!-- Title -->
        <FormCustomField
          label="Title"
          name="title"
          as="input"
          type="text"
          placeholder="Task Title"
        />
        
        <!-- Status -->
        <FormCustomField
        label="Status"
        name="status"
        as="select"
        placeholder="Select Status"
        :options="[
          { label: 'Pending', value: 'pending' },
          { label: 'In Progress', value: 'in-progress' },
          { label: 'Done', value: 'done' },
        ]"
        />
      </div>

      <!-- Due Date -->
      <FormCustomField
        label="Due Date"
        name="dueDate"
        type="date"
        placeholder="Select Due Date"
      />
      <!-- Description -->
      <FormCustomField
        label="Description"
        name="description"
        as="textarea"
        placeholder="Task Description"
      />

      <MainButton
        type="submit"
        :label="isEdit ? 'Update Task' : 'Add Task'"
      />
    </VeeForm>
  </section>
</template>

<script setup>
const taskSchema = useTaskSchema();
const route = useRoute();
const router = useRouter();
const taskStore = useTaskStore();
const toast = useToast();

// check if the form is in edit mode based on the route query
const isEdit = computed(() => !!route.query.id);

// define the initial values for the form
const initialValues = computed(() => {
  const id = Number(route.query.id);

  if (!id) {
    return {
      title: "",
      description: "",
      status: "",
      dueDate: null,
    };
  }

  const task = taskStore.tasks.find(t => t.id === id);

  return task
    ? {
        title: task.title,
        description: task.description,
        status: task.status.toLowerCase(),
        dueDate: new Date(task.dueDate),
      }
    : {
        title: "",
        description: "",
        status: "",
        dueDate: null,
      };
});


const handleSubmit = (values) => {
  if (isEdit.value) {
    taskStore.updateTask({
      id: Number(route.query.id),
      ...values,
    });
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task updated successfully",
      life: 3000,
    });
  } else {
    taskStore.addTask(values);
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task added successfully",
      life: 3000,
    });
  }

  router.push("/tasks");
};
</script>