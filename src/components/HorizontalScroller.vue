<script setup></script>

<template>
  <div class="scroll-wrapper">
    <div class="scroll-container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.scroll-wrapper {
  overflow-x: auto;
  overflow-y: visible; /* 🔥 IMPORTANT */
  white-space: nowrap; /* 🔥 important */
  scroll-behavior: smooth;
  /* Firefox */
  scrollbar-width: none;
}

/* Chrome, Safari, Edge */
.scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.scroll-container {
  display: inline-flex; /* 🔥 important */
  gap: 36px;
  padding: 18px 0;
  margin: 0px 24px;
}
</style>
