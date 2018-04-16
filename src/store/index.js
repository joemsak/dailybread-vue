import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'

import expenses from './expenses'
import bills from './bills'
import user from './user'

import moment from 'moment'

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
    },
  },

  state: {
    mgmtPayPeriod: null,
    currentPayPeriod: 1,
  },

  getters: {
    nextPayDate: (state) => (desiredPayPeriod) => {
      desiredPayPeriod = desiredPayPeriod || state.currentPayPeriod
      let endingDate

      if (desiredPayPeriod === 1) {
        endingDate = moment().date(15)
      } else {
        endingDate = moment().endOf('month')
      }

      while ([0, 6].includes(endingDate.day())) {
        endingDate = endingDate.subtract(1, 'days')
      }

      return endingDate
    },

    previousPayDate: (state) => (desiredPayPeriod) => {
      desiredPayPeriod = desiredPayPeriod || state.currentPayPeriod
      let beginningDate

      if (desiredPayPeriod === 1) {
        beginningDate = moment().subtract(1, 'months').endOf('month')
      } else {
        beginningDate = moment().date(15)
      }

      while ([0, 6].includes(beginningDate.day())) {
        beginningDate = beginningDate.subtract(1, 'days')
      }

      return beginningDate
    },

    remaining: (state, getters) => (desiredPayPeriod) => {
      if (state.user.currentUser.guest) return 3750

      desiredPayPeriod = desiredPayPeriod || state.currentPayPeriod

      return 3750 -
        getters['bills/total'](desiredPayPeriod) -
          getters['expenses/total'](
            getters.previousPayDate(desiredPayPeriod),
            getters.nextPayDate(desiredPayPeriod)
          )
    },
  },

  mutations: {
    mgmtPayPeriod (state, period) {
      state.mgmtPayPeriod = period
    },

    currentPayPeriod (state, period) {
      state.currentPayPeriod = period
    },

    ...firebaseMutations,
  },

  actions: {
    initApp ({ commit, dispatch }, user) {
      if (!user || !!user.guest) {
        commit('user/setGuest')
      } else {
        commit('user/set', user)
        dispatch('expenses/set')
        dispatch('bills/set')
      }

      let endingDate

      if (moment().date() < 15) {
        endingDate = moment().date(15)
      } else {
        endingDate = moment().endOf('month')
      }

      while([0, 6].includes(endingDate.day())) {
        endingDate = endingDate.subtract(1, 'days')
      }

      if (endingDate.date() >= 15) {
        commit('currentPayPeriod', 2)
      } else {
        commit('currentPayPeriod', 1)
      }
    },

    updateMgmtPayPeriod ({ commit, dispatch }, period) {
      commit('mgmtPayPeriod', period)
    },
  },
})