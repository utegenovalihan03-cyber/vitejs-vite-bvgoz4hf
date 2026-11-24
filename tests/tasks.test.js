import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useTasksStore } from '../src/stores/tasks'

describe('Тестирование системы StudyTask', () => {
  let store

  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
    store = useTasksStore()
  })

  it('Создание нового задания', () => {
    store.addTask({
      title: 'Практическая работа',
      description: 'Создание Vue приложения',
      subject: 'Vue.js',
      priority: 'Высокий',
      dueDate: '2026-12-01'
    })

    expect(store.tasks.length).toBe(1)
    expect(store.tasks[0].title).toBe('Практическая работа')
  })

  it('Изменение существующего задания', () => {
    store.addTask({
      title: 'Старое название',
      subject: 'Vue.js',
      priority: 'Средний',
      dueDate: '2026-12-01'
    })

    const task = {
      ...store.tasks[0],
      title: 'Новое название'
    }

    store.updateTask(task)

    expect(store.tasks[0].title).toBe('Новое название')
  })

  it('Удаление задания', () => {
    store.addTask({
      title: 'Тестовое задание',
      subject: 'Vue.js',
      priority: 'Низкий',
      dueDate: '2026-12-01'
    })

    const id = store.tasks[0].id

    store.deleteTask(id)

    expect(store.tasks.length).toBe(0)
  })

  it('Изменение статуса задания', () => {
    store.addTask({
      title: 'Тест',
      subject: 'Vue.js',
      priority: 'Средний',
      dueDate: '2026-12-01'
    })

    const id = store.tasks[0].id

    store.changeStatus(id, 'Выполнено')

    expect(store.tasks[0].status).toBe('Выполнено')
  })

  it('Правильный расчёт статистики', () => {
    store.addTask({
      title: 'Задание 1',
      subject: 'Vue.js',
      priority: 'Средний',
      dueDate: '2026-12-01'
    })

    store.addTask({
      title: 'Задание 2',
      subject: 'JavaScript',
      priority: 'Высокий',
      dueDate: '2026-12-02'
    })

    store.changeStatus(store.tasks[0].id, 'Выполнено')

    expect(store.totalTasks).toBe(2)
    expect(store.completedTasks).toBe(1)
    expect(store.remainingTasks).toBe(1)
  })

  it('Фильтрация заданий по статусу', () => {
    store.addTask({
      title: 'Задание Vue',
      subject: 'Vue.js',
      priority: 'Средний',
      dueDate: '2026-12-01'
    })

    store.addTask({
      title: 'Задание JS',
      subject: 'JavaScript',
      priority: 'Высокий',
      dueDate: '2026-12-02'
    })

    store.changeStatus(store.tasks[0].id, 'Выполнено')

    const result = store.filteredTasks({
      status: 'Выполнено'
    })

    expect(result.length).toBe(1)
    expect(result[0].title).toBe('Задание Vue')
  })
})
