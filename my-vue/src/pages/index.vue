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
                        v-for="(todo, idx) in todoList"
                        :key="idx"
                        :style="{ textDecoration: todo.isCompleted ? 'line-throgh' : 'none' }"
                    >
                        <div class="flex items-center space-x-3">
                            <span
                                class="h-2.5 w-2.5 rounded-full"
                                :class="todo.isCompleted ? 'bg-green-500' : 'bg-yellow-500'"
                            ></span>
                            <div>
                                <p class="font-medium text-gray-900">{{ todo.text }}</p>
                            </div>
                        </div>
                        <div class="flex space-x-3">
                            <button class="text-green-500 text-sm font-medium" @click="todoCompleted(idx)">
                                Completed
                            </button>
                            <button class="text-red-500 text-sm font-medium" @click="todoDeleted(idx)">Delete</button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useTodoStore } from '@/stores/TodoStore'
import { storeToRefs } from 'pinia'

const todoStore = useTodoStore()

const newTodo = ref<string>('')

const { todoList } = storeToRefs(todoStore)

onMounted(() => {
    todoStore.loadTodoList()
})

const addTodo = () => {
    if (newTodo.value.length > 0) {
        const todo: TodoList = {
            text: newTodo.value,
            isCompleted: false
        }

        newTodo.value = ''

        todoStore.setTodoList(todo)
    }
}

const todoCompleted = (idx: number) => {
    todoList.value[idx].isCompleted = true
}

const todoDeleted = (idx: number) => {
    todoList.value.splice(idx, 1)
}

// const addTodo = () => {
//     if (newTodo.value.trim() !== '') {
//         todos.value.push({ text: newTodo.value, isCompleted: false })
//         newTodo.value = ''
//     }
// }

// const deleteTodo = (index: number) => {
//     todos.value.splice(index, 1)
// }

// const checkTodo = (index: number) => {
//     todos.value[index].isCompleted = !todos.value[index].isCompleted
// }
</script>

<style scoped>
button {
    /* color: rgb(223, 0, 37); */
}

li {
    marker: none;
}
</style>
