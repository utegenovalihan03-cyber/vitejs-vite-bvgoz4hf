<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <RouterLink to="/" class="logo">
        <span class="logo-icon">S</span>
        StudyTask
      </RouterLink>

      <nav>
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/tasks">Мои задания</RouterLink>
      </nav>
    </div>
  </header>
</template>
