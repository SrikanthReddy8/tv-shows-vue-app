<script setup>
import { onMounted } from "vue";
import { useShowsStore } from "@/stores/useShowsStore";

import HorizontalScroller from "@/components/HorizontalScroller.vue";
import ShowCard from "@/components/ShowCard.vue";

const store = useShowsStore();

onMounted(() => {
  store.loadShows();
});
</script>

<template>
  <div class="container">
    <h2>TV Shows by Genre</h2>

    <div v-if="store.loading">Loading...</div>

    <div v-else>
      <div
        v-for="(shows, genre) in store.showsByGenre"
        :key="genre"
        class="genre-section"
      >
        <h3>{{ genre }}</h3>

        <HorizontalScroller>
          <ShowCard
            v-for="show in shows.slice(0, 10)"
            :key="show.id"
            :show="show"
          />
        </HorizontalScroller>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 10px;
}

button {
  margin-top: 15px;
  padding: 8px 16px;
  cursor: pointer;
}

.genre-section {
  margin-bottom: 25px;
}

h3 {
  margin-bottom: 10px;
}
</style>
