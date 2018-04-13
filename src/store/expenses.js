import { firebaseAction } from 'vuexfire'
import moment from 'moment'

import { dbExpensesRef } from '@/db/firebaseConfig'

export default {
  state: {
    expenses: [],
    expense: {},
    editing: false,
  },

  getters: {
    expenses (state, getters, rootState, rootGetters) {
      return state.expenses.filter(e => {
        return moment(e.madeOn).isSameOrAfter(rootGetters.previousPayDate) &&
                 moment(e.madeOn).isBefore(rootGetters.nextPayDate)
      })
    },

    total: (state) => (prevPayDate, nextPayDate) => {
      const expenses = state.expenses.filter(e => {
        return moment(e.madeOn).isSameOrAfter(prevPayDate) &&
                 moment(e.madeOn).isBefore(nextPayDate)
      })

      return expenses.reduce((acc, expense) => {
        return acc += parseFloat(expense.amount)
      }, 0)
    },

    ref (state, getters, rootState) {
      return dbExpensesRef.child(`${rootState.user.currentUser.uid}`)
    },
  },

  mutations: {
    editing (state, bool) {
      state.editing = bool
    },

    expense (state, payload) {
      let updatedExpense = Object.assign({}, state.expense)
      Object.keys(payload).forEach(k => updatedExpense[k] = payload[k])
      state.expense = updatedExpense
    },

    resetExpense (state) {
      state.expense = {}
      state.editing = false
    },
  },

  actions: {
    modifyExpense ({ commit }, payload) {
      commit('expense', payload)
    },

    set ({ dispatch, getters }) {
      dispatch('setRef', getters.ref)
    },

    add ({ getters, commit, state }) {
      state.expense.madeOn = moment().format()
      getters.ref.push(state.expense).then(() => commit('resetExpense'))
    },

    edit ({ commit }, expense) {
      commit('editing', true)
      commit('expense', expense)
    },

    update ({ getters, state, commit, rootState }) {
      getters.ref.child(state.expense[".key"])
        .set({
          name: state.expense.name,
          category: state.expense.category,
          amount: parseInt(state.expense.amount),
        })
        .then(() => commit('resetExpense'))
    },

    remove ({ getters }, expense) {
      getters.ref.child(expense[".key"]).remove()
    },

    setRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
      bindFirebaseRef('expenses', ref)
    }),
  }
}