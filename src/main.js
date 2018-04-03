// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router'
import store from './store'

import firebase from 'firebase'

import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters)
Vue.config.productionTip = false

import CurrentUser from '@/mixins/CurrentUser'

Vue.mixin(CurrentUser)

firebase.auth().onAuthStateChanged(user => {
  new Vue({
    el: '#app',
    store,
    router,
    components: { App },
    template: '<App/>',

    created () {
      this.$store.dispatch('initApp', user)
    },
  })
})