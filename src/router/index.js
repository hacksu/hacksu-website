import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Alumni from '../views/Alumni.vue'
import Contact from '../views/Contact.vue'
import Constitution from '../views/Constitution.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: 'HacKSU: Helping Kent State University Learn To Code',
      scrollNav: true,
    },
    component: Home
  },
  {
    path: '/alumni',
    name: 'Alumni',
    meta: {
      title: 'HacKSU Alumni & Former Staff',
    },
    component: Alumni,
  },
  {
    path: '/contact',
    name: 'Contact',
    meta: {
      title: 'Contact HacKSU Leadership',
    },
    component: Contact,
  },
  {
    path: '/constitution',
    name: 'Constitution',
    meta: {
      title: 'HacKSU Constitution & Bylaws',
    },
    component: Constitution,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  scrollBehavior() {
    document.querySelector('#app').scrollIntoView();
    return { x: 0, y: 0 };
  },
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title || to.name || 'Hacksu';
})

export default router
