import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Navigation from '@/components/Navigation.vue'

const app = createApp(App)
  .use(store).use(router)
  .component('navigation', Navigation)
app.mount('#app')
