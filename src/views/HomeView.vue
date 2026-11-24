<script setup>
import { computed } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskStatistics from '../components/TaskStatistics.vue'
import TaskCard from '../components/TaskCard.vue'
import { RouterLink } from 'vue-router'

const store = useTasksStore()

const recentTasks = computed(() =>
  [...store.tasks].slice(-3).reverse()
)

function changeStatus(id, status) {
  store.changeStatus(id, status)
}
</script>

<template>
  <main class="container">
    <section class="welcome">
      <div>
        <span class="subtitle">ТВОЙ УЧЕБНЫЙ ПОМОЩНИК</span>
        <h1>Добро пожаловать в StudyTask!</h1>
        <p>Следи за учебными заданиями и успевай всё вовремя.</p>
        <RouterLink to="/tasks" class="primary-btn">
          Перейти к заданиям
        </RouterLink>
      </div>
    </section>

    <h2>Общая статистика</h2>

    <TaskStatistics
      :total="store.totalTasks"
      :completed="store.completedTasks"
      :remaining="store.remainingTasks"
    />

    <div class="section-heading">
      <h2>Последние задания</h2>
      <RouterLink to="/tasks">Все задания →</RouterLink>
    </div>

    <div v-if="recentTasks.length" class="task-list">
      <TaskCard
        v-for="task in recentTasks"
        :key="task.id"
        :task="task"
        @status="changeStatus"
      />
    </div>

    <div v-else class="empty-state">
      <h3>Пока нет заданий</h3>
      <p>Создай своё первое учебное задание!</p>
      <RouterLink to="/tasks" class="primary-btn">
        Создать задание
      </RouterLink>
    </div>
  </main>
</template>
