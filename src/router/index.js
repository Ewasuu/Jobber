import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '@/views/About.vue'
import myJobs from '@/views/Myjobs.vue'
import Search from '../views/SearchJobs.vue'
import Login from '@/views/login.vue'
import Signin from '@/views/signin.vue'
import Confirmation from '@/views/confirmation.vue'
import errorHandler from '@/views/Error.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/search/:search/:page?',
      name: 'Searcher',
      component: Search
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/myjobs',
      name: 'myJobs',
      component: myJobs
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/confirm/:token',
      name: 'Confirmation',
      component: Confirmation
    },
    {
      path: '/:pathMatch(.*)',
      name: 'errorHandler',
      component: errorHandler
    }
  ]
})

export default router
