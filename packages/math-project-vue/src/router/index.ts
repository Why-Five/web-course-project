// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

// 定义路由组件
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../components/HelloWorld.vue')
  },
  {
    path: '/zhihu',
    name: 'Zhihu',
    component: () => import('../components/Zhihu.vue')
  },
  {
    path: '/music',
    name: 'Music',
    component: () => import('../components/Music.vue')
  },
  {
    path:'/translation',
    name:'Translation',
    component: () => import('../components/Translation.vue')
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router