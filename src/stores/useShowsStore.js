import { defineStore } from "pinia";
import {
  fetchShows,
  searchShows,
  getShowDetails,
} from "@/api/showsService";

export const useShowsStore = defineStore("shows", {
  state: () => ({
    shows: [],
    searchResults: [],
    selectedShow: null,

    error: null,
    visibleCount: 10,
  }),

  getters: {
    visibleShows: (state) =>
      state.shows.slice(0, state.visibleCount),

    popularShows: (state) =>
      [...state.shows]
        .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
        .slice(0, 20),

    showsByGenre: (state) => {
      const map = {};

      state.shows.forEach((show) => {
        show.genres.forEach((genre) => {
          if (!map[genre]) map[genre] = [];
          map[genre].push(show);
        });
      });

      return map;
    },
  },

  actions: {
    // 📥 Load all shows
    async loadShows() {
      this.error = null;

      try {
        this.shows = await fetchShows();
      } catch (err) {
        this.error = "Failed to load shows";
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

    // 🎬 Show details
    async loadShowDetails(id) {
      this.error = null;

      try {
        this.selectedShow = await getShowDetails(id);
      } catch (err) {
        this.error = "Failed to load show details";
      }
    },

    loadMore() {
      this.visibleCount += 10;
    },
  },
});