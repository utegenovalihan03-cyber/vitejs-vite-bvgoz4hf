<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits([
  'edit',
  'delete',
  'status'
])
</script>

<template>
  <article class="task-card">
    <div class="task-top">
      <span class="subject">{{ task.subject }}</span>

      <span class="priority" :class="task.priority">
        {{ task.priority }}
      </span>
    </div>

    <h3>{{ task.title }}</h3>
    <p>{{ task.description || 'Описание отсутствует' }}</p>

    <div class="task-info">
      <span>Срок: {{ task.dueDate }}</span>
      <span class="status">{{ task.status }}</span>
    </div>

    <div class="task-actions">
      <select
        :value="task.status"
        @change="emit('status', task.id, $event.target.value)"
        aria-label="Изменить статус"
      >
        <option>Новое</option>
        <option>В работе</option>
        <option>Выполнено</option>
      </select>

      <button class="edit-btn" @click="emit('edit', task)">
        Изменить
      </button>

      <button class="delete-btn" @click="emit('delete', task.id)">
        Удалить
      </button>
    </div>
  </article>
</template>
