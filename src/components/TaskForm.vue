<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['save', 'cancel'])

const form = reactive({
  title: '',
  description: '',
  subject: 'Vue.js',
  priority: 'Средний',
  dueDate: '',
  status: 'Новое'
})

const errors = reactive({
  title: '',
  dueDate: ''
})

watch(
  () => props.task,
  (task) => {
    Object.assign(form, {
      title: task?.title || '',
      description: task?.description || '',
      subject: task?.subject || 'Vue.js',
      priority: task?.priority || 'Средний',
      dueDate: task?.dueDate || '',
      status: task?.status || 'Новое'
    })

    errors.title = ''
    errors.dueDate = ''
  },
  { immediate: true }
)

function submitForm() {
  errors.title = ''
  errors.dueDate = ''

  if (!form.title.trim()) {
    errors.title = 'Введите название задания'
  }

  if (!form.dueDate) {
    errors.dueDate = 'Укажите срок выполнения'
  }

  if (errors.title || errors.dueDate) return

  emit('save', {
    ...form,
    title: form.title.trim(),
    id: props.task?.id
  })
}
</script>

<template>
  <form class="task-form" @submit.prevent="submitForm">
    <h2>{{ task ? 'Редактирование задания' : 'Новое задание' }}</h2>

    <label>Название задания *</label>
    <input v-model="form.title" placeholder="Например, практическая работа №4" />
    <small v-if="errors.title" class="error">{{ errors.title }}</small>

    <label>Описание</label>
    <textarea v-model="form.description" placeholder="Описание задания"></textarea>

    <label>Дисциплина</label>
    <select v-model="form.subject">
      <option>Vue.js</option>
      <option>JavaScript</option>
      <option>Бизнес-аналитика</option>
      <option>Базы данных</option>
      <option>Информатика</option>
    </select>

    <label>Приоритет</label>
    <select v-model="form.priority">
      <option>Низкий</option>
      <option>Средний</option>
      <option>Высокий</option>
    </select>

    <label>Срок выполнения *</label>
    <input type="date" v-model="form.dueDate" />
    <small v-if="errors.dueDate" class="error">{{ errors.dueDate }}</small>

    <template v-if="task">
      <label>Статус</label>
      <select v-model="form.status">
        <option>Новое</option>
        <option>В работе</option>
        <option>Выполнено</option>
      </select>
    </template>

    <div class="form-actions">
      <button type="submit" class="primary-btn">Сохранить</button>
      <button type="button" class="cancel-btn" @click="emit('cancel')">
        Отмена
      </button>
    </div>
  </form>
</template>
