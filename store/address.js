import firebase from 'firebase/app'
import 'firebase/database'
export default {
  namespaced: true,

  state: {
    ip: ''
  },

  mutations: {
    SET_IP (state, payload) {
      state.ip = payload
    }
  },
  actions: {
    getIp ({ state, getters, rootState, commit }) {
      return new Promise((resolve, reject) => {
        fetch('https://ipapi.co/json/')
          .then(x => x.json())
          .then((ip) => {
            commit('SET_IP', ip)
            const visitId = rootState.visits.currentVisitId
            const updates = {}
            updates[`visits/${visitId}/address`] = ip
            firebase
              .database()
              .ref()
              .update(updates)
              .then(() => {
                resolve(visitId)
              })
          })
      })
    }
  }
}
