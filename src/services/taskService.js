const STORAGE_KEY = 'study-task-list'

export function loadTasks() {
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch (error) {
    console.error('Ошибка загрузки заданий:', error)
    return []
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    return true
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    return false
  }
}
