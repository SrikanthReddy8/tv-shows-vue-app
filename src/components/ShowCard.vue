<script setup>
import { useRouter } from "vue-router";

const {show} = defineProps({
  show: {
    type: Object,
    required: true,
  },
});
const router = useRouter();

const goToDetails = () => {
  console.log("Navigating to show details for ID:",show.id);
  router.push(`/show/${show.id}`);
};
</script>

<template>
  <div class="card show-card" @click="goToDetails">
    <img
      :src="show.image?.medium || 'https://via.placeholder.com/150x220'"
      class="card-img-top"
      alt="show"
    />

    <div class="card-body p-2">
      <h6 class="card-title text-truncate mb-1">
        {{ show.name }}
      </h6>
      <small class="text-muted">
        ⭐ {{ show.rating?.average || "N/A" }}
      </small>
    </div>
  </div>
</template>

<style scoped>
.card {
  width: 150px;
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
</style>
