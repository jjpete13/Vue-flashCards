<script setup lang="ts">
import ArrowLeft from "./icons/ArrowLeft.vue";
import ArrowRight from "./icons/ArrowRight.vue";

const props = defineProps({
	direction: {
		type: String,
		validator: (value: string) => ["next", "prev"].includes(value),
		default: "next",
	},
});
const emit = defineEmits(["click"]);
const Icon = props.direction === "next" ? ArrowRight : ArrowLeft;
</script>

<template>
    <button type="button" @click="emit('click')">
      <Icon class="icon"/>
    </button>
</template>


<style scoped>
button {
  width: 50px;
  height: 50px;
  background-color: inherit;
  border: none;
  cursor: pointer;
  :hover {
    transform: scale(1.2);
  };
}
.icon {
  color: #fff;
}
</style>
