<script setup lang="ts">
import CorrectIncorrect from "@/components/CorrectIncorrect.vue";
import End from "@/components/End.vue";
import FlashCard from "@/components/FlashCard.vue";
import { useStudyContentStore } from "@/stores/studyContent";
import { storeToRefs } from "pinia";
import { ref } from "vue";

export interface Question {
	question: string;
	answer: string;
}

const store = useStudyContentStore();
const { questions } = storeToRefs(store);
let index = 0;
const passedContent = ref(questions.value[index]);
const shownContent = ref(questions.value[index].question);
const isFlipped = ref(shownContent.value === passedContent.value.answer);
const incorrect = ref<Question[]>([]);
const correctAmount = ref(0);
const percent = ref(0);
const isFinished = ref(false);
const handleFlip = () => {
	document.getElementById("flip-button")?.blur();
	setTimeout(() => {
		shownContent.value = isFlipped.value
			? passedContent.value.question
			: passedContent.value.answer;
		isFlipped.value = !isFlipped.value;
	}, 375);
};

const percentCorrect = () => {
	if (correctAmount.value === 0) return 0;
	return Math.floor((correctAmount.value / index) * 100);
};

const handleIncorrect = () => {
	incorrect.value.push(passedContent.value);
	if (index === questions.value.length - 1) isFinished.value = true;
	if (questions.value.length === 1) {
		index = 1;
	} else {
		index = index === questions.value.length - 1 ? index : index + 1;
	}
	passedContent.value = questions.value[index];
	shownContent.value = questions.value[index].question;
	isFlipped.value = false;
	percent.value = percentCorrect();
};

const handleCorrect = () => {
	correctAmount.value++;
	if (index === questions.value.length - 1) isFinished.value = true;
	if (questions.value.length === 1) {
		index = 1;
	} else {
		index = index === questions.value.length - 1 ? index : index + 1;
	}
	passedContent.value = questions.value[index];
	shownContent.value = questions.value[index].question;
	isFlipped.value = false;
	percent.value = percentCorrect();
};

const handleRestart = () => {
	index = 0;
	questions.value = store.questions;
	passedContent.value = questions.value[index];
	shownContent.value = questions.value[index].question;
	isFlipped.value = false;
	incorrect.value = [];
	correctAmount.value = 0;
	percent.value = 0;
	isFinished.value = false;
};

const handleStudyIncorrect = () => {
	index = 0;
	questions.value = incorrect.value;
	passedContent.value = questions.value[index];
	shownContent.value = questions.value[index].question;
	isFlipped.value = false;
	incorrect.value = [];
	correctAmount.value = 0;
	percent.value = 0;
	isFinished.value = false;
};
</script>

<template>
	<main v-if="isFinished" class="card-group">
		<End :correctAmount="`${correctAmount} / ${correctAmount + incorrect.length}`" :percent="percent" :incorrectAmount="incorrect.length" @restart="handleRestart" @studyIncorrect="handleStudyIncorrect" />
	</main>
  <main v-else class="card-group">
    <h2>Question: {{index + 1}} / {{questions.length}}</h2>
    <h2>{{correctAmount}} / {{correctAmount + incorrect.length}} ({{ percent }}%) Correct</h2>
      <FlashCard  @flip="handleFlip">{{shownContent}}</FlashCard>
      <CorrectIncorrect v-show="isFlipped" @incorrect="handleIncorrect" @correct="handleCorrect" />
  </main>
</template>

<style scoped>
.card-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  gap: 1rem;
}

</style>