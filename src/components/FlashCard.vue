<script setup lang="ts">
import ArrowRepeat from './icons/ArrowRepeat.vue';
const emit = defineEmits(['flip'])

</script>


<template>
  <div class="card">
    <div class="content">
      <h1><slot></slot></h1>
    </div>
    <button class="flip" @click="emit('flip')">
      <ArrowRepeat />
    </button>
  </div>
</template>

<style scoped>
  @keyframes flip {
    0% {
      transform: scaleY(1);
    }
    50% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }
    90% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .card {
    width: 600px;
    min-height: 300px;
    height: fit-content;
    border-radius: 10px;
    padding: 1rem;
    background-color: #fff;
    color: #000;
    position: relative;
  }
  /* .card:has(.flip:focus) {
      animation: flip 0.75s;
      .content {
        animation: fade 0.75s;
      }
  } */

  .content {
    width: 100%;
    height: 100%;
    text-align: center;
  }

  .flip {
    position: absolute;
    bottom: 10px;
    right: 10px;
    background-color: inherit;
    border: none;
    cursor: pointer;
    display: flex;
    place-items: center;
    padding: 5px;
    

    :hover {
      transform: scale(1.2);
    }
  }
</style>
