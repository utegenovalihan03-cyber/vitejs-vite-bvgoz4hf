import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { loadTasks, saveTasks } from '../services/taskService'

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref(loadTasks())
  const notification = ref('')
  const notificationType = ref('success')

  const totalTasks = computed(() => tasks.value.length)

  const completedTasks = computed(() =>
    tasks.value.filter(task => task.status === 'Выполнено').length
  )

  const remainingTasks = computed(() =>
    totalTasks.value - completedTasks.value
  )

  watch(
    tasks,
    (newTasks) => {
      const saved = saveTasks(newTasks)

      if (!saved) {
        notification.value = 'Не удалось сохранить данные'
        notificationType.value = 'error'
      }
    },
    { deep: true }
  )

  function showNotification(message, type = 'success') {
    notification.value = message
    notificationType.value = type
  }

  function addTask(task) {
  tasks.value.push({
    ...task,
    id: Date.now(),
    status: 'Новое'
  })

  showNotification('Задание успешно добавлено')
  }


  function updateTask(updatedTask) {
    const index = tasks.value.findIndex(
      task => task.id === updatedTask.id
    )

    if (index !== -1) {
      tasks.value[index] = { ...updatedTask }
      showNotification('Задание изменено')
    }
  }

  function deleteTask(id) {
    tasks.value = tasks.value.filter(task => task.id !== id)
    showNotification('Задание удалено')
  }

  function changeStatus(id, status) {
    const task = tasks.value.find(task => task.id === id)

    if (task) {
      task.status = status
      showNotification('Статус задания обновлён')
    }
  }

  function filteredTasks(filters = {}) {
    return tasks.value
      .filter(task =>
        task.title.toLowerCase().includes(
          (filters.search || '').toLowerCase()
        )
      )
      .filter(task =>
        !filters.subject || task.subject === filters.subject
      )
      .filter(task =>
        !filters.priority || task.priority === filters.priority
      )
      .filter(task =>
        !filters.status || task.status === filters.status
      )
      .sort((a, b) =>
        a.dueDate.localeCompare(b.dueDate)
      )
  }

  return {
    tasks,
    notification,
    notificationType,
    totalTasks,
    completedTasks,
    remainingTasks,
    addTask,
    updateTask,
    deleteTask,
    changeStatus,
    filteredTasks,
    showNotification
  }
})
