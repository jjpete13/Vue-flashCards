<script setup lang="ts">
import CorrectIncorrect from "@/components/CorrectIncorrect.vue";
import End from "@/components/End.vue";
import FlashCard from "@/components/FlashCard.vue";
import { useStudyContentStore } from "@/stores/studyContent";
import { ref, watch } from "vue";

export interface Question {
	question: string;
	answer: string;
}

const store = useStudyContentStore();
const content = ref<Question[]>(store.questions || []);
watch(
	() => store.questions,
	(newQuestions) => {
		content.value = newQuestions;
	},
);
let index = 0;
const passedContent = ref(content.value[index]);
const shownContent = ref(content.value[index].question);
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
	if (index === content.value.length - 1) isFinished.value = true;
	if (content.value.length === 1) {
		index = 1;
	} else {
		index = index === content.value.length - 1 ? index : index + 1;
	}
	passedContent.value = content.value[index];
	shownContent.value = content.value[index].question;
	isFlipped.value = false;
	percent.value = percentCorrect();
};

const handleCorrect = () => {
	correctAmount.value++;
	if (index === content.value.length - 1) isFinished.value = true;
	if (content.value.length === 1) {
		index = 1;
	} else {
		index = index === content.value.length - 1 ? index : index + 1;
	}
	passedContent.value = content.value[index];
	shownContent.value = content.value[index].question;
	isFlipped.value = false;
	percent.value = percentCorrect();
};

const handleRestart = () => {
	index = 0;
	content.value = store.questions;
	passedContent.value = content.value[index];
	shownContent.value = content.value[index].question;
	isFlipped.value = false;
	incorrect.value = [];
	correctAmount.value = 0;
	percent.value = 0;
	isFinished.value = false;
};

const handleStudyIncorrect = () => {
	index = 0;
	content.value = incorrect.value;
	passedContent.value = content.value[index];
	shownContent.value = content.value[index].question;
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
    <h2>Question: {{index + 1}} / {{content.length}}</h2>
    <h2>{{correctAmount}} / {{correctAmount + incorrect.length}} ({{ percent }}%) Correct</h2>
      <FlashCard  @flip="handleFlip">{{shownContent}}</FlashCard>
      <CorrectIncorrect v-if="isFlipped" @incorrect="handleIncorrect" @correct="handleCorrect" />
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