import firebase from 'firebase'

export default {
  state: {
    currentUser: {
      displayName: 'Guest',
      guest: true,
      uid: null,
    },
  },

  mutations: {
    set (state, user) {
      state.currentUser = {
        displayName: user.displayName,
        guest: false,
        uid: user.uid,
      }
    },

    setGuest (state) {
      state.currentUser = {
        displayName: 'Guest',
        guest: true,
      }
    },
  },

  actions: {
    updateCurrentUser ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        const user = firebase.auth().currentUser;

        user.updateProfile(payload).then(() => {
          commit('setUser', user)
          resolve()
        }).catch(error => { reject(error) })
      })
    },
  },
}