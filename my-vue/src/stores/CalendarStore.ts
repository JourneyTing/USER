import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useCalendarStore = defineStore('useCalendarStore', () => {
    const isLoading = ref<boolean>(true)
    const todoMonth = ref<Monthly[]>([])
    const current = ref<CurrentMonthly>({
        year: 0,
        month: 0,
        day: 0
    })

    const dalryuk = ref<CurrentMonthly>({
        year: 0,
        month: 0,
        day: 0
    })

    const setCurrentMonth = () => {
        let date = new Date()

        current.value.year = date.getFullYear()
        current.value.month = date.getMonth() + 1
        current.value.day = date.getDate()
    }

    const setCalendarDate = (rate: number = 0) => {
        isLoading.value = true

        let date = new Date()

        const currYear = date.getFullYear()
        const currMon = date.getMonth()

        console.log(currMon - rate)

        const prev = new Date(currYear, currMon + rate, 0)

        const curr = new Date(currYear, currMon + (rate + 1), 0)

        const next = new Date(currYear, currMon + (rate + 2), 0)

        const prevDate = prev.getDate()
        const prevDay = prev.getDay()
        const prevYear = prev.getFullYear()

        console.log(prev)
        console.log(curr)
        console.log(next)

        const currentDate = curr.getDate()
        const currentDay = curr.getDay()

        dalryuk.value.year = curr.getFullYear()
        dalryuk.value.month = curr.getMonth() + 1
        dalryuk.value.day = curr.getDate()

        const prevs = []
        const currents = []
        const nexts = []

        if (prevDay !== 6) {
            for (let i = 0; i < prevDay + 1; i++) {
                const month: Monthly = {
                    date: prev,
                    year: prev.getFullYear(),
                    month: prev.getMonth() + 1,
                    day: prevDate - i
                }

                prevs.unshift(month)
            }
        }

        for (let i = 1; i <= currentDate; i++) {
            const month: Monthly = {
                date: curr,
                year: curr.getFullYear(),
                month: curr.getMonth() + 1,
                day: i
            }

            currents.push(month)
        }

        for (let i = 1; i < 7 - currentDay; i++) {
            const month: Monthly = {
                date: next,
                year: next.getFullYear(),
                month: next.getMonth() + 1,
                day: i
            }

            nexts.push(month)
        }

        const dates = prevs.concat(currents, nexts)

        todoMonth.value = dates
        isLoading.value = false
    }

    return {
        todoMonth,
        current,
        dalryuk,
        isLoading,
        setCurrentMonth,
        setCalendarDate
    }
})
