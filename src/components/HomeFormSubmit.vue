<script setup lang="ts">
import { RouterLink } from "vue-router";
defineProps({
  hasSelected: {
    type: Boolean,
    required: true,
  },
  shouldShuffle: {
    type: Boolean,
    required: true,
  },
})

</script>

<template>
  <div class="button-container" v-show="hasSelected">
    <button type="button" @click="$emit('shuffle')" id="shuffle" :style="shouldShuffle ? { backgroundColor: '#00bd7e' } : {}">
      <img class="icon" src="../assets/shuffle.svg" alt="shuffle icon" />
    </button>
    <RouterLink class="button" @click="$emit('submit')"  :to="{name: 'card'}">Start</RouterLink>
  </div>
</template>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  height: 50px;
  align-items: center;
  flex-direction: row;
  gap: 1rem;
}
 #shuffle {
  border-radius: 20px;
  border: none;
  width: 31px;
  height: 31px;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
#shuffle:hover {
  background-color: #00bd7e;
}
.icon {
  width: 40px;
  height: 40px;
}
.button {
  display: inherit;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 20px;
 }
</style>