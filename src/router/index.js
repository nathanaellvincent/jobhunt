import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'board',
    component: () => import('@/views/BoardView.vue'),
  },
  {
    path: '/stats',
    name: 'stats',
    component: () => import('@/views/StatsView.vue'),
  },
]

export default createRouter({
  history: createWebHashHistory(),
  routes,
})
