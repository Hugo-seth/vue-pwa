import Vue from 'vue'
import Vuex from 'vuex'

import { getAllIssues } from '../api/issues'

Vue.use(Vuex)

export function createStore() {
  return new Vuex.Store({
    state: {
      size: 5,
      count: 0,
      items: [],
      activeItems: [],
      error: ''
    },
    actions: {
      FETCH_ITEMS: ({ commit, state }) => {
        if (state.items.length > 0) {
          return Promise.resolve()
        }
        return getAllIssues()
          .then(items => {
            commit('SET_ITEMS', { items })
            commit('SET_COUNT', { count: items.length })
          })
          .catch(error => commit('SET_ERROR', { error }))
      }
    },
    mutations: {
      SET_ITEMS: (state, { items }) => {
        state.items = items
      },
      SET_ACTIVE_ITEMS: (state, { page = 1 }) => {
        const size = state.size
        const start = (page - 1) * size
        const end = page * size

        state.activeItems = state.items.slice(start, end)
      },
      SET_COUNT: (state, { count }) => {
        state.count = count
      },
      SET_ERROR: (state, { error }) => {
        state.error = error || 'error'
      }
    }
  })
}
