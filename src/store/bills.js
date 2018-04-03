import { firebaseAction } from 'vuexfire'
import _ from 'lodash'

import { dbBillsRef } from '@/firebaseConfig'

export default {
  state: {
    bills: [],
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

  actions: {
    set ({ dispatch, getters }) {
      dispatch('setRef', getters.ref)
    },

    add ({ getters, rootState }, bill) {
      getters.ref.child(`period-${rootState.mgmtPayPeriod}`).push(bill)
    },

    remove ({ getters, rootState }, bill) {
      getters.ref.child(`period-${rootState.mgmtPayPeriod}`).child(bill[".key"]).remove()
    },
    
    setRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
      bindFirebaseRef('bills', ref)
    }),
  },
}