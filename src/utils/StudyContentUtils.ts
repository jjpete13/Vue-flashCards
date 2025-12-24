type Question = {
	question: string;
	answer: string;
};
export function shuffleQuestions(questions: Question[]) {
	const questionsCopy = [...questions];
	const shuffled = [];

	while (questionsCopy.length > 0) {
		const randomIndex = Math.floor(Math.random() * questionsCopy.length);
		shuffled.push(questionsCopy.splice(randomIndex, 1)[0]);
	}
	return shuffled;
}
