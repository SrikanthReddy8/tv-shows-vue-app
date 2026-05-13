<script setup>
import { onMounted } from "vue";
import { useShowsStore } from "@/stores/useShowsStore";

import ScrollableRow from "@/components/ScrollableRow.vue";
import ShowCard from "@/components/ShowCard.vue";
import SearchBar from "@/components/SearchBar.vue";
import AppLoader from "./Loader.vue";

const store = useShowsStore();

onMounted(() => {
  store.loadShows();
});
</script>

<template>
  <div class="mx-5">
    <!-- 🔍 Search -->
    <div class="my-4">
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
        <h4 class="mb-3 fw-bold fs-2">⭐ Popular Shows</h4>
        <ScrollableRow>
          <ShowCard
            v-for="show in store.popularShows"
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
        <h4 class="mb-3 fw-bold fs-2">{{ genre }}</h4>
        <ScrollableRow>
          <ShowCard
            v-for="show in shows"
            :key="show.id"
            :show="show"
          />
        </ScrollableRow>
      </div>
    </div>
  </div>
</template>
