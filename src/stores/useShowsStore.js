import { defineStore } from "pinia";
import { fetchShows, searchShows, getShowDetails } from "@/api/showsService";

export const useShowsStore = defineStore("shows", {
  state: () => ({
    shows: [],
    searchResults: [],
    selectedShow: null,

    myList: new Set(), // ✅ better than array

    error: null,
    visibleCount: 100,
  }),

  getters: {
    // 🔥 Visible shows (lazy load support)
    visibleShows: (state) => state.shows,

    // ⭐ Popular shows (top rated sorted)
    popularShows: (state) =>
      [...state.shows]
        .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
        .slice(0, 100),

    // 🎭 Group shows by genre
    showsByGenre: (state) => {
      const map = {};

      state.shows.forEach((show) => {
        show.genres?.forEach((genre) => {
          if (!map[genre]) map[genre] = [];
          map[genre].push(show);
        });
      });

      return map;
    },

    // ⭐ Top Rated (>= 8)
    topRatedShows: (state) =>
      [...state.shows]
        .filter((show) => (show.rating?.average || 0) >= 8)
        .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0)),

    // ❤️ My List (full show objects)
    myListShows: (state) =>
      state.shows.filter((show) => state.myList.has(show.id)),

    latestShows: (state) =>
      [...state.shows]
        .filter((show) => show.premiered) // remove null dates
        .sort((a, b) => new Date(b.premiered) - new Date(a.premiered))
        .slice(0, 40),
  },

  actions: {
    // 📥 Load all shows
    async loadShows() {
      this.error = null;

      try {
        this.shows = await fetchShows();
        console.log("Shows loaded:", this.shows.length);
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

    // 🎬 Load single show details
    async loadShowDetails(id) {
      this.error = null;

      try {
        this.selectedShow = await getShowDetails(id);
      } catch (err) {
        this.error = "Failed to load show details";
      }
    },

    // ❤️ Toggle My List
    toggleMyList(id) {
      if (this.myList.has(id)) {
        this.myList.delete(id);
      } else {
        this.myList.add(id);
      }
    },

    // ➕ Load more
    loadMore() {
      this.visibleCount += 10;
    },
  },
});
