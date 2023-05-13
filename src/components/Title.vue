<template>
  <div>
    <div class="alert alert-light header-Style" role="alert">
            {{ title }}
    </div>
  </div>
</template>
  
  <script setup>

    defineProps({
        title: String
      })
  </script>
  
  <style>
    .header-Style{
        margin-top: 1rem;
        font-size: xx-large;
        font-style: normal;
        font-family: 'circular';
        color: #e78888;
    }
  </style>