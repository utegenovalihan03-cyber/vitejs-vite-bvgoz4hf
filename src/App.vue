<script setup>
import { useTasksStore } from './stores/tasks'
import AppHeader from './components/AppHeader.vue'
import { RouterView } from 'vue-router'

const store = useTasksStore()
</script>

<template>
  <AppHeader />

  <div
    v-if="store.notification"
    class="notification"
    :class="store.notificationType"
    role="status"
  >
    <span>{{ store.notification }}</span>
    <button
      @click="store.notification = ''"
      aria-label="Закрыть уведомление"
    >
      ×
    </button>
  </div>

  <RouterView />

  <footer class="footer">
    <p>© 2026 StudyTask. Система управления учебными заданиями.</p>
  </footer>
</template>
