<script setup>
import { useUIStore } from "@/stores/uiStore";
import AppLoader from "./views/AppLoader.vue";

const ui = useUIStore();
</script>

<template>
  <!-- 🔥 Global Loader -->
  <AppLoader v-if="ui.isLoading" />

  <!-- App -->
  <router-view />
</template>