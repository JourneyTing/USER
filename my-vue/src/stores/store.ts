import { defineStore } from 'pinia'

export const store = defineStore('todoStore', {
  state: () => ({
    todos: [] as string[]
  }),
  actions: {
    addTodo(todo: string) {
      this.todos.push(todo)
    },
    deleteTodo(index: number) {
      this.todos.splice(index, 1)
    }
  }
})

export default store
