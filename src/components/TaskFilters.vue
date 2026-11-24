<script setup>
const filters = defineModel('filters', {
  default: () => ({
    search: '',
    subject: '',
    priority: '',
    status: ''
  })
})
</script>

<template>
  <div class="filters">
    <input
      v-model="filters.search"
      placeholder="Поиск по названию..."
    />

    <select v-model="filters.subject">
      <option value="">Все дисциплины</option>
      <option>Vue.js</option>
      <option>JavaScript</option>
      <option>Бизнес-аналитика</option>
      <option>Базы данных</option>
      <option>Информатика</option>
    </select>

    <select v-model="filters.priority">
      <option value="">Любой приоритет</option>
      <option>Низкий</option>
      <option>Средний</option>
      <option>Высокий</option>
    </select>

    <select v-model="filters.status">
      <option value="">Все статусы</option>
      <option>Новое</option>
      <option>В работе</option>
      <option>Выполнено</option>
    </select>
  </div>
</template>
