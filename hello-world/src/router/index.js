import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/index'),
    hidden: true,
  },
  {
    path: '/detail',
    component: () => import('@/views/detail'),
    hidden: true,
  },
]

export default new Router({
  routes: constantRouterMap,
})
