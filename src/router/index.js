import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Alumni from '../views/Alumni.vue'
import Contact from '../views/Contact.vue'
import Constitution from '../views/Constitution.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/alumni',
    name: 'Alumni',
    component: Alumni,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  {
    path: '/constitution',
    name: 'Constitution',
    component: Constitution,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    document.querySelector('#app').scrollIntoView();
    return { x: 0, y: 0 };
  },
  routes
})

export default router
