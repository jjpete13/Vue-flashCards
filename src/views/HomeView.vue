<script setup lang="ts">
import { useStudyContentStore } from "@/stores/studyContent";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import data from "../assets/questions.json";
import type { Question } from "./CardView.vue";
import { shuffleQuestions } from "@/utils/StudyContentUtils";

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
const selectAll = (select: boolean) => {
	const qArray = Object.keys(selected.value);
	if (!select) return qArray.forEach((item) => (selected.value[item] = false));
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
};
</script>

<template>
  <div class="question-container">
    <h3>Select Categories</h3>
    <button id="select-all" v-if="Object.values(selected).includes(false)" @click="selectAll(true)" >Select All</button>
    <button id="select-all" v-else @click="onClear" >Clear</button>
    <span v-for="key in Object.keys(defaultQuestions)" :key="key">
      <input type="checkbox" v-model="selected[key]" :key="key" :value="key" :checked="selected[key]" @click="selected[key] = !selected[key]"/>
      {{ splitCamelCase(key) }}
    </span>
    
  </div>
  <div class="button-container" v-show="Object.values(selected).filter(item => item === true).length > 0">
    <button type="button" @click="shouldShuffle = !shouldShuffle" id="shuffle" :style="shouldShuffle ? { backgroundColor: '#00bd7e' } : {}">
      <img class="icon" src="../assets/shuffle.svg" alt="shuffle icon" />
    </button>
    <RouterLink class="button" @click="onSubmit"  to="/card">Start</RouterLink>
  </div>
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