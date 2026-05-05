import { defineStore } from "pinia";

export const useUIStore = defineStore("ui", {
  state: () => ({
    loadingCount: 0, // 🔥 important (supports multiple API calls)
  }),

  getters: {
    isLoading: (state) => state.loadingCount > 0,
  },

  actions: {
    startLoading() {
      this.loadingCount++;
    },

    stopLoading() {
      if (this.loadingCount > 0) {
        this.loadingCount--;
      }
    },
  },
});