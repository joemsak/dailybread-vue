import { firebaseAction } from 'vuexfire'
import _ from 'lodash'
import moment from 'moment'

import { dbExpensesRef } from '@/firebaseConfig'

export default {
  state: {
    expenses: [],
  },

  getters: {
    total: (state) => (prevPayDate, nextPayDate) => {
      const expenses = _.filter(state.expenses, e => {
        return moment(e.madeOn).isAfter(prevPayDate) &&
                 moment(e.madeOn).isBefore(nextPayDate)
      })

      return _.reduce(expenses, (acc, expense) => {
        return acc += parseFloat(expense.amount)
      }, 0)
    },

    ref (state, getters, rootState) {
      return dbExpensesRef.child(`${rootState.user.currentUser.uid}`)
    },
  },

  actions: {
    set ({ dispatch, getters }) {
      dispatch('setRef', getters.ref)
    },

    add ({ getters }, expense) {
      getters.ref.push(expense)
    },

    remove ({ getters }, expense) {
      getters.ref.child(expense[".key"]).remove()
    },

    setRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
      bindFirebaseRef('expenses', ref)
    }),
  }
}