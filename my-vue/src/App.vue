<script setup lang="ts">
import { ref } from 'vue'

const newTodo = ref('')
const todos = ref<{ text: string; isCompleted: boolean }[]>([])

const addTodo = () => {
  if (newTodo.value.trim() !== '') {
    todos.value.push({ text: newTodo.value, isCompleted: false })
    newTodo.value = ''
  }
}

const deleteTodo = (index: number) => {
  todos.value.splice(index, 1)
}

const checkTodo = (index: number) => {
  todos.value[index].isCompleted = !todos.value[index].isCompleted
}
</script>

<template>
  <div>
    <h1>My To-Do List</h1>
    <div>
      <img src="./assets/춘식이.jpg" />
      <div>
        <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Enter your task" />
        <button @click="addTodo">Add</button>
      </div>
    </div>
    <ul>
      <li
        v-for="(todo, index) in todos"
        :key="index"
        :style="{ textDecoration: todo.isCompleted ? 'line-throgh' : 'none' }"
      >
        {{ todo.text }}
        <button @click="checkTodo(index)">완료</button>
        <button @click="deleteTodo(index)">삭제</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
button {
  color: rgb(223, 0, 37);
}

li {
  marker: none;
}
</style>
