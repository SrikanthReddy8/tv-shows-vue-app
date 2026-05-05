<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getShowDetails } from "@/api/showsService";

const route = useRoute();
const show = ref(null);

onMounted(async () => {
  show.value = await getShowDetails(route.params.id);
});
</script>

<template>
  <div class="container py-4" v-if="show">
    <div class="row">
      <div class="col-md-4">
        <img :src="show.image?.medium" class="img-fluid rounded" />
      </div>

      <div class="col-md-8">
        <h2>{{ show.name }}</h2>

        <p class="text-muted">
          ⭐ {{ show.rating?.average }}
        </p>

        <p v-html="show.summary"></p>

        <p>
          <strong>Genres:</strong>
          {{ show.genres.join(", ") }}
        </p>
      </div>
    </div>
  </div>
</template>