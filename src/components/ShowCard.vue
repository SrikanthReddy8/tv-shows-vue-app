<script setup>
defineProps({
  show: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <div class="image-wrapper">
      <img
        :src="show.image?.medium || 'https://via.placeholder.com/150x220'"
        alt="show"
      />
    </div>

    <!-- <div class="info">
      <h3>{{ show.name }}</h3>
      <p>⭐ {{ show.rating?.average || "N/A" }}</p>
    </div> -->
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
