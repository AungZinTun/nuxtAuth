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
        Object.assign(state, state)
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
          console.log('noUser')
          commit('RESET_STORE')
          dispatch('createUser')
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
      async createUser ({ store }, { email, password }) {
        try {
          console.log(this.$fire)
          await this.$fire.auth.createUserWithEmailAndPassword(
            email,
            password
          )
        } catch (e) {
          alert(e)
        }
      },
      getIP ({ state, getters, rootState, commit }) {
        return new Promise((resolve, reject) => {
          fetch('https://ipapi.co/json/')
            .then(x => x.json())
            .then((ip) => {
              // const email = ip.ip
              // console.log(email, 'email')
              commit('SET_IP', ip)
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
      },
      signInWithGoogle ({ commit }) {
        return new Promise((resolve, reject) => {
          this.$fire.auth.signInWithRedirect('GoogleProvider')
          resolve()
        })
      },

      signOut ({ commit }) {
        this.$fire.auth.signOut().then(() => {
          commit('setUser', null)
        }).catch(err => console.log('error'))
      }
    }
  })
}

export default createStore
