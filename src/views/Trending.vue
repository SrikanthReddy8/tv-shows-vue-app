<script setup>
import { onMounted } from "vue";
import { useShowsStore } from "@/stores/useShowsStore";
import ShowCard from "@/components/ShowCard.vue";

const store = useShowsStore();

onMounted(() => {
  if (!store.shows.length) {
    store.loadShows();
  }
});
</script>

<template>
  <div class="mx-5">
    <h2 class="mb-4">🔥 New & Trending</h2>

    <!-- Loading -->
    <p v-if="!store.shows.length" class="text-muted">Loading shows...</p>

    <!-- Empty -->
    <p v-else-if="!store.latestShows.length" class="text-muted">
      No latest shows available.
    </p>

    <!-- Grid -->
    <div v-else class="row g-3">
      <div
        v-for="show in store.latestShows"
        :key="show.id"
        class="col-6 col-sm-4 col-md-3 col-lg-2"
      >
        <ShowCard :show="show" />
      </div>
    </div>
  </div>
</template>
