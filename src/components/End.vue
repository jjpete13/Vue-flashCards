<script setup lang="ts">
import { ref, watch } from "vue";
const props = defineProps({
	percent: {
		type: Number,
		required: true,
	},
	incorrectAmount: {
		type: Number,
		required: true,
	},
	correctAmount: {
		type: String,
		required: true,
	},
});
const emits = defineEmits(["restart", "studyIncorrect"]);
const correctAmount = ref(props.correctAmount);
watch(
	() => props.correctAmount,
	() => {
		correctAmount.value = props.correctAmount;
	},
);
</script>

<template>
		<h2>{{correctAmount}}({{ percent }}%) Correct</h2>
		<div class="end-buttons">
			<button class="green" v-if="incorrectAmount > 0" @click="emits('studyIncorrect')">Study Incorrect</button>
			<button class="green" @click="emits('restart')">Restart</button>
			<RouterLink class="button" to="/">Select Categories</RouterLink>
		</div>
</template>


<style scoped>
.end-buttons {
	margin-top: 20px;
	display: flex;
	@media (max-width: 600px) {
		flex-direction: column;
	}
	place-items: center;
	justify-content: center;
	gap: 2rem;
  button, .button {
  display: flex;
  justify-content: center;
  align-items: center;
	width: 200px;
	height: 50px;
	border-radius: 10px;
	border: none;
	cursor: pointer;
}}
</style>