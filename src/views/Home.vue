<script setup>
import { onMounted } from "vue";
import { useShowsStore } from "@/stores/useShowsStore";

import ScrollableRow from "@/components/ScrollableRow.vue";
import ShowCard from "@/components/ShowCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import AppLoader from "./AppLoader.vue";

const store = useShowsStore();

onMounted(() => {
  store.loadShows();
});
</script>

<template>
  <div class="container py-4">
    <!-- 🔍 Search -->
    <div class="mb-4">
      <SearchBar />
    </div>

    <!-- 🔍 Search Results -->
    <div v-if="store.searchResults.length" class="mb-5">
      <h4 class="mb-3">🔍 Search Results</h4>

      <ScrollableRow>
        <ShowCard
          v-for="show in store.searchResults"
          :key="show.id"
          :show="show"
        />
      </ScrollableRow>
    </div>

    <!-- 🎬 Default Dashboard (only when no search) -->
    <div v-else>
      <!-- ⭐ Popular -->
      <div class="mb-5">
        <h4 class="mb-3">⭐ Popular Shows</h4>
        <ScrollableRow>
          <ShowCard
            v-for="show in store.popularShows.slice(0, 10)"
            :key="show.id"
            :show="show"
          />
        </ScrollableRow>
      </div>

      <!-- 🎭 Genres -->
      <div
        v-for="(shows, genre) in store.showsByGenre"
        :key="genre"
        class="mb-5"
      >
        <h4 class="mb-3">{{ genre }}</h4>
        <ScrollableRow>
          <ShowCard
            v-for="show in shows.slice(0, 10)"
            :key="show.id"
            :show="show"
          />
        </ScrollableRow>
      </div>
    </div>
  </div>
</template>
