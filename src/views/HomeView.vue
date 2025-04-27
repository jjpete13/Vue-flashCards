<script setup lang="ts">
import ArrowButton from '@/components/ArrowButton.vue';
import FlashCard from '@/components/FlashCard.vue';
import questions from '../assets/questions.json';
import { useTransformContent } from '@/hooks/useTransformContent';
import { ref } from 'vue';

interface Question {
  question: string;
  answer: string;
}


let index = 0;
const content: Question[] = useTransformContent(questions);
const passedContent = ref(content[index])
const isQuestion = ref(true)
const handleArrowClick = (up: boolean) => {
if (up) {
  index = index === content.length - 1 ? 0 : index + 1;
} else {
  index = index === 0 ? content.length - 1 : index - 1;
}
 passedContent.value = content[index]
}
const handleFlip = () => {
  isQuestion.value = !isQuestion.value

  console.log(isQuestion.value)
}


</script>

<template>
  <main class="card-group">
    <ArrowButton direction="prev" @click="handleArrowClick(false)" />
    <FlashCard v-if="isQuestion" @flip="handleFlip">{{ passedContent.question }}</FlashCard>
    <FlashCard v-if="!isQuestion" @flip="handleFlip">{{ passedContent.answer }}</FlashCard>
    <ArrowButton direction="next" @click="handleArrowClick(true)" />
  </main>
</template>

<style scoped>
.card-group {
  display: inline-flex;
  place-items: center;
  gap: 1rem;
}

</style>