import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/Home.vue')
    },
    {
      path: '/todolist',
      name: 'todolist',
      component: () => import('../pages/Todolist.vue')
    } ,
    {
      path: '/todolist/:title',
      name: 'todolistWithParams',
      component: () => import('../pages/Todolist.vue')
    }
    
  ]
})

export default router
