  import { defineStore } from "pinia";

  export const useGlobalStore = defineStore(
    "globalStore",
    () => {
      // HANDLE THE LOADING
      const loading = ref(false);
      const switchLoading = () => {
        loading.value = !loading.value;
      };

      // HANDLE THE LANGUAGE
      const lang = ref("en");
      const setLang = (newLang) => {
        lang.value = newLang;
      };

      return {
        loading,
        switchLoading,
        lang,
        setLang,
      };
    },
    {
      persist: true
    },
  );
