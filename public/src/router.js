import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Dashboard from './components/Dashboard.vue'
import Admin from './components/Admin.vue'
import NewOrder from './components/NewOrder.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/dashboard', component: Dashboard },
  { path: '/admin', component: Admin },
  { path: '/new-order', component: NewOrder }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router