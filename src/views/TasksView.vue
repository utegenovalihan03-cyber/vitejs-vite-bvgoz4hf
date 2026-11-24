<script setup>
import { ref, reactive, computed } from 'vue'
import { useTasksStore } from '../stores/tasks'
import TaskCard from '../components/TaskCard.vue'
import TaskForm from '../components/TaskForm.vue'
import TaskFilters from '../components/TaskFilters.vue'

const store = useTasksStore()

const showForm = ref(false)
const editingTask = ref(null)

const filters = reactive({
  search: '',
  subject: '',
  priority: '',
  status: ''
})

const visibleTasks = computed(() =>
  store.filteredTasks(filters)
)

function openCreateForm() {
  editingTask.value = null
  showForm.value = true
}

function openEditForm(task) {
  editingTask.value = { ...task }
  showForm.value = true
}

function saveTask(task) {
  if (task.id) {
    store.updateTask(task)
  } else {
    store.addTask(task)
  }

  showForm.value = false
  editingTask.value = null
}

function deleteTask(id) {
  if (confirm('Вы действительно хотите удалить задание?')) {
    store.deleteTask(id)
  }
}

function changeStatus(id, status) {
  store.changeStatus(id, status)
}
</script>

<template>
  <main class="container">
    <div class="section-heading">
      <div>
        <span class="subtitle">УПРАВЛЕНИЕ УЧЁБОЙ</span>
        <h1>Мои задания</h1>
        <p>Создавай и контролируй выполнение учебных задач.</p>
      </div>

      <button class="primary-btn" @click="openCreateForm">
        + Добавить задание
      </button>
    </div>

    <TaskForm
      v-if="showForm"
      :task="editingTask"
      @save="saveTask"
      @cancel="showForm = false"
    />

    <TaskFilters v-model:filters="filters" />

    <div class="result-count">
      Найдено заданий: {{ visibleTasks.length }}
    </div>

    <div v-if="visibleTasks.length" class="task-list">
      <TaskCard
        v-for="task in visibleTasks"
        :key="task.id"
        :task="task"
        @edit="openEditForm"
        @delete="deleteTask"
        @status="changeStatus"
      />
    </div>

    <div v-else class="empty-state">
      <h3>Задания не найдены</h3>
      <p>Попробуй изменить фильтры или создать новое задание.</p>
      <button class="primary-btn" @click="openCreateForm">
        Создать задание
      </button>
    </div>
  </main>
</template>
