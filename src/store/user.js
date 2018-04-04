import firebase from 'firebase'

export default {
  state: {
    currentUser: null,
  },

  mutations: {
    set (state, user) {
      state.currentUser = {
        displayName: user.displayName,
        uid: user.uid,
      }
    },

    setGuest (state) {
      state.currentUser = null
    },
  },

  actions: {
    updateCurrentUser ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;

        user.updateProfile(payload).then(() => {
          commit('user/set', user)
          resolve()
        }).catch(error => { reject(error) })
      })
    },
  },
}