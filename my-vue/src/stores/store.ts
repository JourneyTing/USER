import { createStore, Store } from 'vuex'

interface State {
  todos: string[]
}

const store: Store<State> = createStore<State>({
  state(): State {
    return {
      todos: []
    }
  },
  mutations: {
    addTodo(state, todo: string) {
      state.todos.push(todo)
    },
    deleteTodo(state, index: number) {
      state.todos.splice(index, 1)
    }
  }
})

export default store
