import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'header',
    component : () => import('../views/header.vue')
  },
  {
    path: '/',
    name: 'list',
    component: () => import('../views/productList.vue')
  },
  {
    path: '/:index',
    name: 'detail',
    component: () => import(/* webpackChunkName: "about" */ '../views/productDetail.vue'),
    props : true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
