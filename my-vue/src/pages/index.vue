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
    <div class="max-w-sm rounded overflow-hidden shadow-lg">
        <img class="w-full" src="../assets/춘식이.jpg" alt="Sunset in the mountains" />
        <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">My To-Do List</div>
            <p class="text-gray-700 text-base">todo ..</p>
        </div>
        <div class="px-6 pt-4 pb-2">
            <div class="flex justify-between">
                <input
                    v-model="newTodo"
                    @keyup.enter="addTodo"
                    placeholder="Enter your task"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2"
                />
                <button
                    class="px-6 py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
                    @click="addTodo"
                >
                    Add
                </button>
            </div>
            <div class="w-full max-w-sm pt-4">
                <h2 class="text-lg font-semibold mb-2">Status List</h2>
                <ul class="space-y-3">
                    <li
                        class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
                        v-for="(todo, index) in todos"
                        :key="index"
                        :style="{ textDecoration: todo.isCompleted ? 'line-throgh' : 'none' }"
                    >
                        <div class="flex items-center space-x-3">
                            <span class="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                            <div>
                                <p class="font-medium text-gray-900">{{ todo.text }}</p>
                            </div>
                        </div>
                        <span class="text-green-500 text-sm font-medium">available</span>
                    </li>
                    <!-- <li class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                        <div class="flex items-center space-x-3">
                            <span class="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                            <div>
                                <p class="font-medium text-gray-900"></p>
                            </div>
                        </div>
                        <span class="text-green-500 text-sm font-medium">available</span>
                    </li>
                    <li class="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm">
                        <div class="flex items-center space-x-3">
                            <span class="h-2.5 w-2.5 rounded-full bg-yellow-500"></span>
                            <div>
                                <p class="font-medium text-gray-900">Database</p>
                            </div>
                        </div>
                        <span class="text-yellow-500 text-sm font-medium">not available</span>
                    </li> -->
                </ul>
            </div>
        </div>
    </div>
    <!-- <div class="min-h-screen">
        <h1>My To-Do List</h1>
        <div>
            <img src="../assets/춘식이.jpg" />
        </div>
        <ul>
            <li
                v-for="(todo, index) in todos"
                :key="index"
                :style="{ textDecoration: todo.isCompleted ? 'line-throgh' : 'none' }"
            >
                <span class="mr-2"> {{ todo.text }}</span>
                <button
                    class="px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mr-1"
                    @click="checkTodo(index)"
                >
                    완료
                </button>
                <button
                    class="px-6 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    @click="deleteTodo(index)"
                >
                    삭제
                </button>
            </li>
        </ul>
    </div> -->
</template>

<style scoped>
button {
    /* color: rgb(223, 0, 37); */
}

li {
    marker: none;
}
</style>
