<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="container empty-state not-found">
    <h1>404</h1>
    <h2>Страница не найдена</h2>
    <p>Возможно, такой страницы не существует.</p>
    <RouterLink to="/" class="primary-btn">
      Вернуться на главную
    </RouterLink>
  </main>
</template>
