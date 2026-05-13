<script setup>
import { ref, watch } from "vue";
import { useShowsStore } from "@/stores/useShowsStore";
import debounce from "lodash/debounce";

const store = useShowsStore();
const query = ref("");

// 🔥 Debounced function
const debouncedSearch = debounce((val) => {
  store.search(val);
}, 500); // 500ms delay

watch(query, (val) => {
  debouncedSearch(val);
});
</script>

<template>
  <input
    v-model="query"
    class="form-control"
    placeholder="Search TV Shows..."
  />
</template>

//without the loadash package

<!-- <script setup>
import { ref, watch } from "vue";
import { useShowsStore } from "@/stores/useShowsStore";

const store = useShowsStore();
const query = ref("");

let timeout = null;

watch(query, (val) => {
  clearTimeout(timeout);

  timeout = setTimeout(() => {
    store.search(val);
  }, 500);
});
</script> -->