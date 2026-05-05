<template>
  <div class="loader-wrapper d-flex justify-content-center align-items-center">
    
    <!-- Bootstrap Spinner -->
    <div
      class="spinner-border text-danger"
      role="status"
      style="width: 4rem; height: 4rem;"
    >
      <span class="visually-hidden">Loading...</span>
    </div>

  </div>
</template>

<style scoped>
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  background: rgba(0, 0, 0, 0.85); /* dark overlay */
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>