import firebase from 'firebase/app'
import 'firebase/database'
export default {
  namespaced: true,

  state: {
    authId: null
  },

  getters: {
    authUser (state, getters, rootState) {
      return state.authId ? rootState.users.items[state.authId] : null
    },
    admin (state, getters) {
      if (getters.authUser) {
        return getters.authUser.role === 'Admin'
      } else {
        return false
      }
    }
  },

  actions: {
    initAuthentication ({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        // unsubscribe observer if already listening
        if (state.unsubscribeAuthObserver) {
          state.unsubscribeAuthObserver()
        }

        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
          // console.log('👣 the user has changed')
          if (user) {
            dispatch('fetchAuthUser').then(dbUser => resolve(dbUser))
          } else {
            resolve(null)
          }
        })
        commit('setUnsubscribeAuthObserver', unsubscribe)
      })
    },

    registerUserWithEmailAndPassword ({ dispatch }, { email, name }) {
      const password = email
      return firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          return dispatch(
            'users/createUser',
            { id: user.uid, email },
            { root: true }
          )
        })
        .then(() => dispatch('fetchAuthUser'))
    },

    signInWithEmailAndPassword ({ dispatch }, { email, password }) {
      return firebase.auth().signInWithEmailAndPassword(email, password)
      // .then(() => dispatch('fetchAuthUser'))
    },

    signOut ({ commit }) {
      return firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setAuthId', null)
        })
    },

    fetchAuthUser ({ dispatch, commit }) {
      const userId = firebase.auth().currentUser.uid
      return new Promise((resolve, reject) => {
        // check if user exists in the database
        firebase
          .database()
          .ref('users')
          .child(userId)
          .once('value', (snapshot) => {
            if (snapshot.exists()) {
              return dispatch(
                'users/fetchUser',
                { id: userId },
                { root: true }
              ).then((user) => {
                commit('setAuthId', userId)
                resolve(user)
              })
            } else {
              resolve(null)
            }
          })
      })
    }
  },

  mutations: {
    setAuthId (state, id) {
      state.authId = id
    },

    setUnsubscribeAuthObserver (state, unsubscribe) {
      state.unsubscribeAuthObserver = unsubscribe
    }
  }
}
