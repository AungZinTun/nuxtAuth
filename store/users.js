// import { countObjectProperties, removeEmptyProperties } from '@/utils'
import firebase from 'firebase/app'
import 'firebase/database'
import Vue from 'vue'
import { makeAppendChildToParentMutation } from '@/utils/assetHelpers'

export default {
  namespaced: true,

  state: {
    items: {},
    user: {}
  },
  actions: {
    updateUser ({ state, commit, dispatch, rootState }, resource) {
      return new Promise((resolve, reject) => {
        const edited = Math.floor(Date.now() / 1000)
        resource.lastVisit = edited
        resource.isOnline = true

        const updates = {}
        updates[`users/${resource.id}`] = resource
        firebase
          .database()
          .ref()
          .update(updates)
          .then(() => {
            commit('setUser', { user: resource, id: resource.id })
            resolve(resource)
          })
      })
    },

    fetchUser: ({ dispatch }, id) =>
      dispatch(
        'fetchItem',
        { resource: 'users', id, emoji: '🙋' },
        { root: true }
      )
  },

  mutations: {
    setUser (state, { user, userId }) {
      Vue.set(state.items, userId, user)
    },

    appendVisitToUser: makeAppendChildToParentMutation({
      parent: 'users',
      child: 'visits'
    })
  }
}
