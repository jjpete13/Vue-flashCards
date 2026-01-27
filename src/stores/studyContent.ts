import type { Question } from "@/views/CardView.vue";
import { defineStore } from "pinia";

export const useStudyContentStore = defineStore("Questions", {
		state: () => ({
		questions: [] as Question[],
	}),
	actions: {
		setQuestions(input: Question[]) {
			this.questions = [...input];
		}
	}
})