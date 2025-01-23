declare global {
    interface YearsTodo {
        year: number
        yearTodos: MonthsTodo[]
    }

    interface MonthsTodo {
        month: number
        monthTodos: DaysTodo[]
    }

    interface DaysTodo {
        days: number
        Todos: TodoList[]
    }

    interface TodoList {
        text: string
        isCompleted: boolean
    }

    interface Monthly {
        date: Date
        year: number
        month: number
        day: number
        todo?: TodoList[]
    }

    interface CurrentMonthly {
        year: number
        month: number
        day: number
    }
}

export {}
