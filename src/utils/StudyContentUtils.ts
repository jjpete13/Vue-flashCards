type Question = {
  question: string;
  answer: string;
}
export function shuffleQuestions(questions: Question[]) {
let questionsCopy = [...questions];
let shuffled = [];

while (questionsCopy.length > 0) {
  let randomIndex = Math.floor(Math.random() * questionsCopy.length);
  shuffled.push(questionsCopy.splice(randomIndex, 1)[0]);
}
return shuffled;
};