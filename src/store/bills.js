import { firebaseAction } from 'vuexfire'
import _ from 'lodash'

import { dbBillsRef } from '@/firebaseConfig'

export default {
  state: {
    bills: [],
  },
  
  getters: {
    total (state) {
      return _.reduce(state.bills, (acc, bill) => {
        return acc += parseFloat(bill.amount)
      }, 0)
    },
    
    ref (state, getters, rootState) {
      return dbBillsRef.child(`${rootState.user.currentUser.uid}/period-${rootState.mgmtPayPeriod}`)
    },
  },

  actions: {
    set ({ dispatch, getters }) {
      dispatch('setRef', getters.ref)
    },

    add ({ getters }, bill) {
      getters.ref.push(bill)
    },

    remove ({ getters }, bill) {
      getters.ref.child(bill[".key"]).remove()
    },
    
    setRef: firebaseAction(({ bindFirebaseRef, unbindFirebaseRef }, { ref }) => {
      bindFirebaseRef('bills', ref)
    }),
  },
}