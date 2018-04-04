import firebase from 'firebase'

export default {
  state: {
    currentUser: {
      displayName: 'Guest',
      email: null,
      guest: true,
      uid: null,
    },
  },

  mutations: {
    set (state, user) {
      state.currentUser = {
        displayName: user.displayName,
        email: user.email,
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
      const updateProfile = new Promise((res, rej) => {
        if (!payload.displayName.length) {
          res()
          return true
        }

        const user = firebase.auth().currentUser

        user.updateProfile({ displayName: payload.displayName }).then(() => {
          commit('set', user)
          res()
        }).catch(error => rej(error))
      })

      const updateEmail = new Promise((res, rej) => {
        if (!payload.email.length) {
          res()
          return true
        }

        const user = firebase.auth().currentUser

        user.updateEmail(payload.email).then(() => {
          commit('set', user)
          res()
        }).catch(error => rej(error))
      })

      const updatePassword = new Promise((res, rej) => {
        if (!payload.password.length) {
          res()
          return true
        }

        const user = firebase.auth().currentUser

        user.updatePassword(payload.password).then(() => {
          commit('set', user)
          res()
        }).catch(error => rej(error))
      })

      return Promise.all([updateProfile, updateEmail, updatePassword])
    },
  },
}