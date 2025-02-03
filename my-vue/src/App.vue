<link rel="stylesheet" href="styles.css?v=1.0"></link>
<script setup lang="ts">

import { ref, onMounted, watch } from 'vue'

const newTodo = ref('')
const todos = ref<{ text: string; isCompleted: boolean; date: string }[]>([])
const currentDate = new Date().getDate.toString()
const saveDate = ref('')
const list = ref<{ text: string; isCompleted: boolean; date: string }[]>([])

const addTodo = () => {
    if (newTodo.value.trim() !== '') {
        saveDate.value = currentDate
        todos.value.push({ text: newTodo.value, isCompleted: false, date: saveDate.value })
        console.log('current : ', currentDate)
        updateLocalStorage()
        newTodo.value = ''
    }
}

const deleteTodo = (index: number) => {
    todos.value.splice(index, 1)
    updateLocalStorage()
}

const checkTodo = (index: number) => {
    todos.value[index].isCompleted = !todos.value[index].isCompleted
}

const countList = () => todos.value.filter((todo) => todo.isCompleted).length

const updateLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
}

const clickToggle = (aa: string) => {
    if (aa == 'all') {
        console.log('allllllllll')
        list.value = todos.value
    } else if (aa == 'today') {
        console.log('todayyyyyyyy')
        for (let i = 0; i <= todos.value.length; i++) {
            const todoDate = todos.value.filter((todo) => todo.date)
            console.log(todoDate)
        }
    }

    return list
}

onMounted(() => {
    const savedInfo = localStorage.getItem('todos')
    if (savedInfo) {
        todos.value = JSON.parse(savedInfo)
    }
})

watch(
    todos,
    (newValue) => {
        updateLocalStorage()
    },
    { deep: true }
)
</script>

<template translate="no">
    <body>
        <div class="title">My To-Do List</div>
        <div class="info-area">
            <img src="./assets/춘식이.jpg" class="my-image" />

            <div class="input-section">
                <button class="all-button" @click="clickToggle('all')">전체</button>
                <button class="today-button" @click="clickToggle('today')">오늘</button>
                <input v-model="newTodo" @keyup.enter="addTodo" placeholder="Enter your task" />
                <button @click="addTodo" class="add-button">추가</button>
            </div>
        </div>
        <ul class="list-section">
            <li v-for="(todo, index) in todos" :key="index" class="list-item">
                <div
                    :style="{
                        textDecoration: todo.isCompleted ? 'line-through' : 'none',
                        textDecorationColor: todo.isCompleted ? 'red' : 'inherit'
                    }"
                    @click="checkTodo(index)"
                    class="list-text"
                >
                    {{ todo.text }}
                </div>
                <button @click="deleteTodo(index)" class="delete-button">삭제</button>
            </li>
        </ul>
        <div class="list-count">완료 : {{ countList() }} / {{ todos.length }}</div>
    </body>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Nanum+Pen+Script&family=Orbit&display=swap');

body {
    background-image: url('./assets/choonsik_background.png'),
        linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.7));
    background-blend-mode: difference;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

.title {
    font-family: 'Caveat', serif;
    font-size: 35px;
    font-weight: bold;
    color: rgba(245, 255, 159, 0.856);
    text-align: center;
    text-shadow:
        0 0 5px #ff91e7,
        0 0 10px #ff8ee6,
        0 0 15px #ff55e3;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%,
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

.list-section {
    width: 100%;
    word-wrap: break-word;
    padding: 5px;
}

button {
    font-family: 'Orbit', serif;
    width: 65px;
    height: 35px;
    background-color: rgb(255, 220, 63);
    color: rgb(189, 129, 0);
    border: none;
    border-radius: 20px;
    padding: 6px 15px;
    font-size: 16px;
    font-weight: bold;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}

button:active {
    box-shadow: 0 2px #515152;
    transform: translateY(2px);
}

.info-area {
    display: flex;
    justify-content: center;
    align-items: center;
}

.my-image {
    height: auto;
    margin-right: 10px;
}

.all-button {
    margin: 5px 5px 8px;
}

.add-button {
    margin: 5px 5px 0 130px;
}

.delete-button {
    margin-left: auto;
}

input {
    display: block;
    padding: 10px 15px;
    border: 2px solid rgb(255, 187, 0);
    border-radius: 20px;
    color: rgb(199, 162, 0);
    background-color: rgb(255, 226, 98);
    font-family: 'Orbit', serif;
    outline: none;
    transition:
        border-color 0.3s,
        box-shadow 0.3s;
}

input::placeholder {
    color: rgb(189, 129, 0);
}

.input-section {
    position: relative;
}

.list-item {
    display: flex;
    border: 2px solid rgb(255, 221, 69);
    color: rgba(255, 250, 184, 0.979);
    list-style-type: none;
    margin: 5px;
    padding: 10px;
    border-radius: 20px;
    font-size: 15px;
    align-items: center;
}

.list-text {
    display: flex;
    align-items: center;
    width: 280px;
    font-family: 'Orbit', serif;
}

.list-count {
    position: relative;
    bottom: 7px;
    left: 20px;
    font-family: 'Orbit', serif;
    color: rgb(255, 255, 98);
}
</style>
