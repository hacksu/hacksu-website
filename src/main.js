import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Navbar from '@/components/navigation/Navbar.vue'
import Navbtn from '@/components/navigation/Navbtn.vue'

const app = createApp(App)
.use(store).use(router)
.component('Navbar', Navbar)
.component('Navbtn', Navbtn)
app.mount('#app')
