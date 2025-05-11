<script setup lang="ts">
import { useStudyContentStore } from "@/stores/studyContent";
import { ref } from "vue";
import { RouterLink } from "vue-router";
import data from "../assets/questions.json";
import type { Question } from "./CardView.vue";

type DefaultInput = { [key: string]: Question[] };
const store = useStudyContentStore();
const defaultQuestions: DefaultInput = data;
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
	store.setQuestions(array);
};
</script>

<template>
  <div class="question-container">
    <h3>Select Categories</h3>
    <button id="select-all" v-if="Object.values(selected).includes(false)" @click="selectAll(true)" >Select All</button>
    <button id="select-all" v-else @click="selectAll(false)" >Deselect All</button>
    <span v-for="key in Object.keys(defaultQuestions)" :key="key">
      <input type="checkbox" v-model="selected[key]" :key="key" :value="key" :checked="selected[key]" @click="selected[key] = !selected[key]"/>
      {{ key }}
    </span>
    
  </div>
  <div class="button-container">
    <RouterLink class="button" v-if="Object.values(selected).filter(item => item === true).length > 0" @click="onSubmit"  to="/card">Start</RouterLink>
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
}
.button {
  display: inherit;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-size: 20px;
 }
</style>