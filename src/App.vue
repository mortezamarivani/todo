<script setup>
import { RouterLink, RouterView } from 'vue-router'
import  Header from './components/Header.vue'

</script>

<template>
  <Header />  
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
</style>
