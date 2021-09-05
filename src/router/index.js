import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Pay from '../views/Pay.vue'
import MyDetail from '../views/MyDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay
  },
  {
    path: '/about/:id',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/mydetail',
    name: 'MyDetail',
    component: MyDetail
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
