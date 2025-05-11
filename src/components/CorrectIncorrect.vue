<script setup lang="ts">
const props = defineProps({});
const emit = defineEmits(["correct", "incorrect"]);
</script>

<template >
  <div class="correct-incorrect-container">
   <button class="red" type="button" @click="emit('incorrect')">Incorrect</button>
  <button class="green" type="button" @click="emit('correct')">Correct</button> 
  </div>
  
</template>

<style scoped>
.correct-incorrect-container {
  margin-top: 20px;
  display: inline-flex;
  place-items: center;
  justify-content: center;
  gap: 3rem;
}
button {
  width: 200px;
  height: 50px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
</style>