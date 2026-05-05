<script setup>
import { ref, watch } from "vue";
import { useShowsStore } from "@/stores/useShowsStore";

const store = useShowsStore();
const query = ref("");

watch(query, (val) => {
  store.search(val);
});
</script>
<template>
  <input
    v-model="query"
    class="form-control"
    placeholder="🔍 Search TV Shows..."
  />
</template>

<style>
.search {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
}
</style>