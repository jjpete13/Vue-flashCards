import type { Question } from "@/views/CardView.vue";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStudyContentStore = defineStore("Questions", () => {
	const questions = ref<Question[]>([]);
	function setQuestions(input: Question[]) {
		questions.value = input;
	}

	return { questions, setQuestions };
});
