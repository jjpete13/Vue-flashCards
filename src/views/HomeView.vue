<script setup lang="ts">
import { useStudyContentStore } from "@/stores/studyContent";
import { ref } from "vue";
import data from "../assets/questions.json";
import type { Question } from "./CardView.vue";
import { shuffleQuestions } from "@/utils/StudyContentUtils";
import HomeFormSubmit from "@/components/HomeFormSubmit.vue";

type DefaultInput = { [key: string]: Question[] };
const store = useStudyContentStore();
const defaultQuestions: DefaultInput = data;
const shouldShuffle = ref<boolean>(false);

function splitCamelCase(text: string) {
	return text
		.replace(/([a-z])([A-Z])/g, "$1 $2")
		.replace(/\b\w/g, (char) => char.toUpperCase());
}

const options = () => {
	const defaults: { [key: string]: boolean } = {};
	const qArray = Object.keys(defaultQuestions);
	qArray.forEach((item) => (defaults[item] = false));
	return defaults;
};
const selected = ref<{ [key: string]: boolean }>(options());
const showSelectAll = ref(true);
const selectAll = (select: boolean) => {
	const qArray = Object.keys(selected.value);
	if (!select) return qArray.forEach((item) => (selected.value[item] = false));
  showSelectAll.value = false;
	return qArray.forEach((item) => (selected.value[item] = true));
};

const onSubmit = () => {
	const array: Question[] = [];
	for (const [key, value] of Object.entries(selected.value)) {
		const category: Question[] = defaultQuestions[key];
		if (value) array.push(...category);
	}
	if (shouldShuffle.value) {
		store.setQuestions(shuffleQuestions(array));
		return;
	}
	store.setQuestions(array);
};

const onClear = () => {
	selectAll(false);
	shouldShuffle.value = false;
  showSelectAll.value = true;
};
</script>

<template>
  <div class="question-container">
    <h3 id="title">Select Categories</h3>
    <button id="select-all" v-show="showSelectAll" @click="selectAll(true)" >Select All</button>
    <button id="select-all" v-show="!showSelectAll" @click="onClear" >Clear</button>
    <span v-for="key in Object.keys(defaultQuestions)" :key="key">
      <input type="checkbox" v-model="selected[key]" :key="key" :value="key" :checked="selected[key]" @click="selected[key] = !selected[key]"/>
      {{ splitCamelCase(key) }}
    </span>
    
  </div>
  <HomeFormSubmit :hasSelected="Object.values(selected).filter(item => item === true).length > 0" :shouldShuffle="shouldShuffle" @shuffle="shouldShuffle = !shouldShuffle" @submit="onSubmit" />
</template>

<style scoped>
.question-container {
  background-color: #fff;
  color: #000;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  #title {
    text-align: center;
  }
}
#select-all {
  border-radius: 5px;
  border: none;
  cursor: pointer;
  height: 30px;
  background-color: #dad8d8;
  transition: background-color 0.3s ease;
}
#select-all:hover {
  background-color: #b3b1b1;
}
</style>