import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = ()=>import("../views/Home.vue");

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
    component: Home
  },
]

const router = new VueRouter({
  routes
})

export default router
