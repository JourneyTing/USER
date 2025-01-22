declare global {
    interface TodoList {
        text: string
        isCompleted: boolean
    }

    interface Monthly {
        date: Date
        month: number
        day: number
        todo?: TodoList
    }

    interface CurrentMonthly {
        year: number
        month: number
        day: number
    }
}

export {}
