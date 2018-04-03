import Vue from 'vue'
import Router from 'vue-router'

import firebase from 'firebase'

import SignUp from '@/components/SignUp'
import UserProfile from '@/components/UserProfile'
import Bills from '@/components/bills'
import Expenses from '@/components/expenses'

Vue.use(Router)

const router = new Router({
  mode: 'history',

  routes: [
    {
      path: '/',
      name: 'Expenses',
      component: Expenses,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/bills',
      name: 'Bills',
      component: Bills,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/expenses',
      name: 'Expenses',
      component: Expenses,
      meta: {
        requiresAuth: true,
      },
    },
  ],
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if(requiresAuth && !currentUser) {
    next({ name: 'SignUp' })
  } else {
    next()
  }
})

export default router