import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'

import expenses from './expenses'
import bills from './bills'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    expenses: {
      namespaced: true,
      ...expenses,
    },

    bills: {
      namespaced: true,
      ...bills,
    },

    user: {
      namespaced: true,
      ...user,
    }
  },

  state: {
    payPeriod: 1,
  },

  getters: { 
    remaining (state, getters) {
      return 3750 - getters['bills/total'] - getters['expenses/total']
    },
  },

  mutations: {
    payPeriod (state, period) {
      state.payPeriod = period
    },

    ...firebaseMutations,
  },

  actions: {
    initApp ({ commit, dispatch }, user) {
      if (!!user.guest) {
        commit('user/setGuest')
      } else {
        commit('user/set', user)
        dispatch('expenses/set')
        dispatch('bills/set')
      }
    },

    updatePayPeriod ({ commit, dispatch }, period) {
      commit('payPeriod', period)
      dispatch('bills/set')
    },
  },
})