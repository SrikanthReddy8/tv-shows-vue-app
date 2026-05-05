import { defineStore } from "pinia";
import { fetchShows, searchShows } from "@/api/tvmaze";

export const useShowsStore = defineStore("shows", {
  state: () => ({
    shows: [],
    searchResults: [],
    loading: false,
  }),

  getters: {
    // ⭐ Popular shows (rating > 7)
    popularShows: (state) =>
      state.shows.filter(s => s.rating?.average > 7),

    // 🎭 Group by genre
    showsByGenre: (state) => {
      const map = {};
      state.shows.forEach(show => {
        show.genres.forEach(g => {
          if (!map[g]) map[g] = [];
          map[g].push(show);
        });
      });
      return map;
    },
  },

  actions: {
    async loadShows() {
      this.loading = true;
      this.shows = await fetchShows();
      this.loading = false;
    },

    async search(query) {
      if (!query) {
        this.searchResults = [];
        return;
      }
      const res = await searchShows(query);
      this.searchResults = res.map(r => r.show);
    },
  },
});