<script setup>
import { useShowsStore } from "@/stores/useShowsStore";
import ShowCard from "@/components/ShowCard.vue";

const store = useShowsStore();
</script>

<template>
  <div class="mx-5 py-4">
    <h2 class="mb-4">❤️ My List</h2>

    <!-- Empty State -->
    <div v-if="!store.myListShows.length" class="text-center mt-5">
      <p class="text-muted">No shows added yet.</p>
      <p class="text-secondary small">Start adding your favorite shows 🎬</p>
    </div>

    <!-- List -->
    <div v-else class="row g-3">
      <div
        v-for="show in store.myListShows"
        :key="show.id"
        class="col-6 col-sm-4 col-md-3 col-lg-2"
      >
        <ShowCard :show="show" />
      </div>
    </div>
  </div>
</template>
