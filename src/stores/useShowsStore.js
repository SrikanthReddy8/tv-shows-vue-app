import { defineStore } from "pinia";
import { fetchShows } from "@/api/tvmaze";

export const useShowsStore = defineStore("shows", {
  state: () => ({
    shows: [],
    loading: false,
    error: null,
    visibleCount: 10,
  }),

  getters: {
    visibleShows: (state) => state.shows.slice(0, state.visibleCount),

    showsByGenre: (state) => {
      const map = {};

      state.shows.forEach((show) => {
        show.genres.forEach((genre) => {
          if (!map[genre]) {
            map[genre] = [];
          }
          map[genre].push(show);
        });
      });

      return map;
    },
  },

  actions: {
    async loadShows() {
      this.loading = true;
      try {
        this.shows = await fetchShows();
      } catch (err) {
        this.error = err;
      } finally {
        this.loading = false;
      }
    },

    loadMore() {
      this.visibleCount += 10;
    },
  },
});
