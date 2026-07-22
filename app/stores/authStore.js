import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "authStore",
  () => {
    const user = ref(null);

    const handleUserData = (newUser) => {
      user.value = newUser;
    };

    return {
      user,
      handleUserData,
    };
  },
  {
    persist: true
  },
);
