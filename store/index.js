/* eslint-disable handle-callback-err */
/* eslint-disable no-unused-vars */
import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      ip: '',
      authUser: null
    },
    getters: {
      activeUser: (state, getters) => {
        return state.user
      }
    },
    mutations: {
      SET_IP (state, payload) {
        state.ip = payload
      },
      RESET_STORE: (state) => {
        state.authUser = null
      },

      SET_AUTH_USER: (state, { authUser }) => {
        state.authUser = {
          uid: authUser.uid,
          email: authUser.email
        }
      }
    },
    actions: {
      async onAuthStateChanged ({ commit, dispatch }, { authUser }) {
        if (!authUser) {
          commit('RESET_STORE')
          dispatch('getIP')
          return
        }
        if (authUser && authUser.getIdToken) {
          try {
            const idToken = await authUser.getIdToken(true)
            console.log('hasUser')
          } catch (e) {
            // console.error(e)
          }
        }
        commit('SET_AUTH_USER', { authUser })
      },
      async registerUser ({ store }, { email, password }) {
        try {
          // console.log(this.$fire)
          await this.$fire.auth.createUserWithEmailAndPassword(
            email,
            password
          )
        } catch (e) {
          alert(e)
        }
      },
      getIP ({ state, getters, rootState, commit, dispatch }) {
        return new Promise((resolve, reject) => {
          fetch('https://api.ipify.org?format=json')
            .then(x => x.json())
            .then((ip) => {
              // commit to state
              commit('SET_IP', ip)
              const userId = ip.ip.replace(/[\W_]+/g, '-')
              const email = 'auto' + userId + '@gmail.com'
              const password = ip.ip
              const ref = this.$fire.database.ref('users').child(userId)
              ref.once('value', (snapshot) => {
                if (snapshot.exists()) {
                  console.log(snapshot)
                } else {
                  console.log('no user with this IP creating')
                  dispatch('registerUser', { email, password })
                    .then(user => console.log(user))
                }
              })
            })
        })
      },
      async signInUser ({ store }, { email, password }) {
        try {
          await this.$fire.auth.signInWithEmailAndPassword(
            email,
            password
          )
        } catch (e) {
          alert(e)
        }
      }
    }
  })
}

export default createStore
