import { defineStore } from "pinia";
import { fetchShows, searchShows } from "@/api/showsService";

export const useShowsStore = defineStore("shows", {
  state: () => ({
    shows: [],
    searchResults: [],
    loading: false,
    error: null,
    visibleCount: 10,
  }),

  getters: {
    // 🔥 Visible shows (for lazy loading)
    visibleShows: (state) => state.shows.slice(0, state.visibleCount),

    // ⭐ Popular shows (rating based)
    popularShows: (state) =>
      [...state.shows]
        .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
        .slice(0, 20),

    // 🎭 Group by genre
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
    // 📥 Load all shows
    async loadShows() {
      this.loading = true;
      this.error = null;

      try {
        this.shows = await fetchShows(); // interceptor returns data directly
      } catch (err) {
        this.error = "Failed to load shows";
      } finally {
        this.loading = false;
      }
    },

    async loadShowDetails(id) {
      this.loadingDetails = true;

      try {
        this.selectedShow = await getShowDetails(id);
      } finally {
        this.loadingDetails = false;
      }
    },

    // 🔍 Search shows
    async search(query) {
      if (!query) {
        this.searchResults = [];
        return;
      }

      try {
        const res = await searchShows(query);
        this.searchResults = res.map((item) => item.show);
      } catch (err) {
        this.error = "Search failed";
      }
    },

    // ➕ Load more (optional)
    loadMore() {
      this.visibleCount += 10;
    },
  },
});
