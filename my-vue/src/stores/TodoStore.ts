import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTodoStore = defineStore('useTodoStore', () => {
    const todoList = ref<YearsTodo[]>([])
    const currentYear = ref<number>(0)
    const currentMonth = ref<number>(0)
    const currentDay = ref<number>(0)

    function loadTodoList() {
        const todo = localStorage.getItem('Todos')

        if (todo) {
            const tdList = JSON.parse(todo)

            todoList.value = tdList
        }

        let date = new Date()

        currentYear.value = date.getFullYear()
        currentMonth.value = date.getMonth() + 1
        currentDay.value = date.getDate()
    }

    function setTodoList(todo: TodoList) {
        const yearIdx = todoList.value.findIndex((el) => el.year === currentYear.value)
        console.log(yearIdx)
        if (yearIdx > -1) {
            const monthIdx = todoList.value[yearIdx].yearTodos.findIndex((el) => el.month === currentMonth.value)
            if (monthIdx > -1) {
                const dayIdx = todoList.value[yearIdx].yearTodos[monthIdx].monthTodos.findIndex(
                    (el) => el.days === currentDay.value
                )
                if (dayIdx > -1) {
                    console.log('1111')
                    todoList.value[yearIdx].yearTodos[monthIdx].monthTodos[dayIdx].Todos.push(todo)
                } else {
                    console.log('111112312')
                    const reqTodo: DaysTodo = setDaysTodo(todo)
                    todoList.value[yearIdx].yearTodos[monthIdx].monthTodos.push(reqTodo)
                }
            } else {
                const reqDaysTodo: DaysTodo = setDaysTodo(todo)
                const reqMonthTodo: MonthsTodo = setMonthTodo(reqDaysTodo)
                todoList.value[yearIdx].yearTodos.push(reqMonthTodo)
            }
        } else {
            const reqDaysTodo: DaysTodo = setDaysTodo(todo)
            const reqMonthTodo: MonthsTodo = setMonthTodo(reqDaysTodo)
            const reqYearTodo: YearsTodo = setYearTodo(reqMonthTodo)

            todoList.value.push(reqYearTodo)
        }

        localStorage.setItem('Todos', JSON.stringify(todoList.value))
    }

    const setDaysTodo = (todo: TodoList) => {
        const reqTodo: DaysTodo = {
            days: currentDay.value,
            Todos: [todo]
        }

        return reqTodo
    }

    const setMonthTodo = (todo: DaysTodo) => {
        const reqMonthTodo: MonthsTodo = {
            month: currentMonth.value,
            monthTodos: [todo]
        }

        return reqMonthTodo
    }

    const setYearTodo = (todo: MonthsTodo) => {
        const reqYearTodo: YearsTodo = {
            year: currentYear.value,
            yearTodos: [todo]
        }

        return reqYearTodo
    }

    const getMonthlyTodos = (month: Monthly[]) => {
        console.log(todoList.value)
        month.forEach((x) => {
            const yearIdx = todoList.value.findIndex((el) => el.year === x.year)
            if (yearIdx > -1) {
                const monthIdx = todoList.value[yearIdx].yearTodos.findIndex((el) => el.month === x.month)
                if (monthIdx > -1) {
                    const dayIdx = todoList.value[yearIdx].yearTodos[monthIdx].monthTodos.findIndex(
                        (el) => el.days === x.day
                    )
                    if (dayIdx > -1) {
                        console.log(todoList.value[yearIdx].yearTodos[monthIdx].monthTodos[dayIdx])
                        x.todo = todoList.value[yearIdx].yearTodos[monthIdx].monthTodos[dayIdx].Todos
                    }
                    return month
                }
                return month
            }
        })

        return month
    }

    return {
        todoList,
        loadTodoList,
        setTodoList,
        getMonthlyTodos
    }
})
