import { defineStore } from 'pinia'
import { ref } from 'vue'

export const todoStore = defineStore('todoStore', () => {
    const todoList = ref<TodoList[]>([])

    function loadTodoList() {
        const todo = localStorage.getItem('Todos')

        if (todo) {
            const tdList = JSON.parse(todo)

            todoList.value = tdList
        }
    }

    function setTodoList(todo: TodoList) {
        todoList.value.push(todo)

        localStorage.setItem('Todos', JSON.stringify(todoList.value))
    }

    return {
        todoList,
        loadTodoList,
        setTodoList
    }
})
