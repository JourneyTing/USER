import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../pages/index.vue')
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: () => import('../pages/calendar.vue')
        }
    ]
})

export default router
