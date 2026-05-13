<script setup>
import { useUIStore } from "@/stores/uiStore";
import AppLoader from "./views/Loader.vue";
import AppHeader from "./components/Header.vue";

const ui = useUIStore();
</script>

<template>
  <!-- 🔥 Global Loader -->
  <AppLoader v-if="ui.isLoading" />

   <!-- Header -->
  <AppHeader />

  <!-- App -->
  <router-view />
</template>