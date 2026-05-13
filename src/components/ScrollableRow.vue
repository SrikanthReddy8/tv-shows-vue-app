<script setup>
import { ref, onMounted, nextTick } from "vue";

const scrollRef = ref(null);
const showLeft = ref(false);
const showRight = ref(false);

const checkArrows = () => {
  const el = scrollRef.value;
  if (!el) return;

  showLeft.value = el.scrollLeft > 0;
  showRight.value = el.scrollLeft + el.clientWidth < el.scrollWidth;
};

const scrollLeftFn = () => {
  scrollRef.value.scrollBy({ left: -300, behavior: "smooth" });
};

const scrollRightFn = () => {
  scrollRef.value.scrollBy({ left: 300, behavior: "smooth" });
};

onMounted(async () => {
  await nextTick();
  checkArrows();

  scrollRef.value.addEventListener("scroll", checkArrows);
  window.addEventListener("resize", checkArrows);
});
</script>

<template>
  <div class="scroll-wrapper">

    <!-- ⬅️ Left Arrow -->
    <button
      v-if="showLeft"
      class="scroll-btn"
      @click="scrollLeftFn"
    >
      ‹
    </button>

    <!-- 🎬 Scroll Area -->
    <div class="scroll-container" ref="scrollRef">
      <slot />
    </div>

    <!-- ➡️ Right Arrow -->
    <button
      v-if="showRight"
      class="scroll-btn"
      @click="scrollRightFn"
    >
      ›
    </button>

  </div>
</template>

<style scoped>
.scroll-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

/* Scroll area */
.scroll-container {
  display: flex;
  gap: 36px;
  overflow-x: auto;
  scroll-behavior: smooth;
  flex: 1;

  scrollbar-width: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

/* Arrows */
.scroll-btn {
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  font-size: 24px;
  width: 40px;
  height: 60px;
  cursor: pointer;

  border-radius: 6px;
  flex-shrink: 0;
  transition: 0.3s;
}

.scroll-btn:hover {
  background: rgba(229, 9, 20, 0.8);
}
</style>