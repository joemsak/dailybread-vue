import { firebaseAction } from 'vuexfire'
import _ from 'lodash'

import { dbBillsRef } from '@/db/firebaseConfig'

export default {
  state: {
    bills: [],
    bill: {},
    editing: false,
  },
  
  getters: {
    total: (state, getters) => (desiredPayPeriod) => {
      const bills = getters[`payPeriod${desiredPayPeriod}`]
      return _.reduce(bills, (acc, bill) => {
        return acc += parseFloat(bill.amount)
      }, 0)
    },
    
    ref (state, getters, rootState) {
      return dbBillsRef.child(`${rootState.user.currentUser.uid}`)
    },

    payPeriod1 (state) {
      const periodObj = state.bills[0]
      if (!periodObj) return []
      
      return Object.keys(periodObj).map(k => (
        { ...periodObj[k], '.key': k }
      )).filter(b => !!b.name)
    },

    payPeriod2 (state) {
      let periodObj = state.bills[1]
      if (!periodObj) return []
      
      return Object.keys(periodObj).map(k => (
        { ...periodObj[k], '.key': k }
      )).filter(b => !!b.name)
    },
  },

  mutations: {
    editing (state, bool) {
      state.editing = bool
    },

    bill (state, payload) {
      let updatedBill = Object.assign({}, state.bill)
      Object.keys(payload).forEach(k => updatedBill[k] = payload[k])
      state.bill = updatedBill
    },

    resetBill (state) {
      state.bill = {}
      state.editing = false
    },
  },

  actions: {
    modifyBill ({ commit }, payload) {
      commit('bill', payload)
    },

    set ({ dispatch, getters }) {
      dispatch('setRef', getters.ref)
    },

    add ({ getters, state, commit, rootState }) {
      getters.ref.child(`period-${rootState.mgmtPayPeriod}`).push(state.bill)
        .then(() => commit('resetBill'))
    },

    edit ({ commit }, bill) {
      commit('editing', true)
      commit('bill', bill)
    },

    update ({ getters, state, commit, rootState }) {
      getters.ref.child(`period-${rootState.mgmtPayPeriod}`).child(state.bill[".key"])
        .set({
          name: state.bill.name,
          amount: parseInt(state.bill.amount),
        })
        .then(() => commit('resetBill'))
    },

    remove ({ getters, rootState }, bill) {
      getters.ref.child(`period-${rootState.mgmtPayPeriod}`).child(bill[".key"]).remove()
    },
    
    setRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
      bindFirebaseRef('bills', ref)
    }),
  },
}