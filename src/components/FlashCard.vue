<script setup lang="ts">
import ArrowRepeat from "./icons/ArrowRepeat.vue";
</script>


<template>
  <div class="card">
    <div class="content">
      <h1><slot></slot></h1>
    </div>
    <div class="flipper">  
      <button class="flip" id="flip-button" @mousedown="$emit('flip')">
        <ArrowRepeat />
      </button>
    </div>
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
    @media (max-width: 600px) {
      width: 90vw;
    }
    @media (min-width: 600px) {
      width: 600px;
    }

    min-height: 300px;
    height: fit-content;
    border-radius: 10px;
    padding: 1rem 0 0 1rem;
    background-color: #fff;
    color: #000;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .card:has(.flip:focus) {
      animation: flip 0.75s;
      .content {
        animation: fade 0.75s;
      }
  }

  .content {
    width: 100%;
    height: 100%;
    text-align: center;
    padding-right: 1rem;
  }

  .flipper {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: flex-end;
    padding: 0 10px 10px 0;
  }

  .flip {
    background-color: transparent;
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
