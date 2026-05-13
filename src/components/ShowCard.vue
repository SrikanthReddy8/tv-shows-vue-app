<script setup>
import { useRouter } from "vue-router";
import { useShowsStore } from "@/stores/useShowsStore";

const { show } = defineProps({
  show: {
    type: Object,
    required: true,
  },
});

const router = useRouter();
const store = useShowsStore();

const goToDetails = () => {
  router.push(`/show/${show.id}`);
};

// ❤️ Toggle My List
const toggleList = (e) => {
  e.stopPropagation(); // 🔥 prevent card click
  store.toggleMyList(show.id);
};
</script>

<template>
  <div class="card show-card" @click="goToDetails">
    <!-- Image -->
    <div class="position-relative">
      <img
        :src="show.image?.medium || 'https://via.placeholder.com/150x220'"
        class="card-img-top"
        alt="show"
      />

      <!-- ❤️ My List Button -->
      <button class="btn btn-sm btn-danger add-btn" @click="toggleList">
        {{ store.myList.has(show.id) ? "✓" : "+" }}
      </button>
    </div>

    <!-- Info -->
    <div class="card-body p-2">
      <h6 class="card-title text-truncate mb-1 fw-bold fs-6">
        {{ show.name }}
      </h6>
      <small class="fs-6"> ⭐ {{ show.rating?.average || "N/A" }} </small>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 200px;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  transition: all 0.25s ease;
}

/* Image */
.image-wrapper {
  width: 100%;
  height: 220px;
  overflow: hidden;
  border-radius: 8px;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ✅ Clean Highlight Effect */
.card:hover {
  transform: scale(1.05) translateY(-4px);
  /* box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6); */
  border-radius: 8px;
}

.show-card {
  cursor: pointer;
  position: relative;
  transition: transform 0.25s ease;
}

.show-card:hover {
  transform: scale(1.05);
}

/* ❤️ Button styling */
.add-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  padding: 0;
  font-size: 16px;
  line-height: 1;
}
</style>
