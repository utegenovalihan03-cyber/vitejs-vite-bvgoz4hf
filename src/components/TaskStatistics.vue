<script setup>
defineProps({
  total: Number,
  completed: Number,
  remaining: Number
})
</script>

<template>
  <div class="statistics">
    <div class="stat-card">
      <span>Всего заданий</span>
      <strong>{{ total }}</strong>
    </div>

    <div class="stat-card">
      <span>Выполнено</span>
      <strong class="green">{{ completed }}</strong>
    </div>

    <div class="stat-card">
      <span>Осталось</span>
      <strong class="orange">{{ remaining }}</strong>
    </div>
  </div>
</template>
