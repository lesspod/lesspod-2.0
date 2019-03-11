// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// Polyfill for `window.fetch()`
// require('whatwg-fetch')

// const store = () => new Vuex.Store({

//   state: () => ({
//     authUser: null
//   }),

//   mutations: {
//     SET_USER: function (state, user) {
//       state.authUser = user
//     }
//   },

//   actions: {
//     login ({ commit }, { username, password }) {
//       return fetch('/api/login', {
//         // Send the client cookies to the server
//         credentials: 'same-origin',
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           username,
//           password
//         })
//       })
//       .then((res) => {
//         if (res.status === 401) {
//           throw new Error('Bad credentials')
//         } else {
//           return res.json()
//         }
//       })
//       .then((authUser) => {
//         commit('SET_USER', authUser)
//       })
//     },
//     logout ({ commit }) {
//       return fetch('/api/logout', {
//         // Send the client cookies to the server
//         credentials: 'same-origin',
//         method: 'POST'
//       })
//       .then(() => {
//         commit('SET_USER', null)
//       })
//     },
//     async nuxtServerInit ({ commit, dispatch }, { req }) {
//       await dispatch('menus/GET_MENUS')
//       if (req.session && req.session.authUser) {
//         commit('SET_USER', req.session.authUser)
//       }
//     }
//   }
// })

// export default store

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
  },
}

export const actions = {
  signup ({}, { fullname, username, email, password }) {
    return fetch('/api/auth/signup', {
      // Send the client cookies to the server
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        fullname,
        username,
        email,
        password
      })
    })
    .then((res) => {
      if (res.status === 401) {
        throw new Error("Couldn't create account")
      } else {
        console.log(res)
        return res
      }
    })
    .then(() => {
      this.$router.push('/')
    })
  },
  login ({ commit }, { username, password }) {
    return fetch('/api/auth/login', {
      // Send the client cookies to the server
      credentials: 'same-origin',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })
    .then((res) => {
      if (res.status === 401) {
        throw new Error('Bad credentials')
      } else {
        return res.json()
      }
    })
    .then((authUser) => {
      commit('SET_USER', authUser)
      this.$router.push('/admin')
    })
  },
  logout ({ commit }) {
    return fetch('/api/logout', {
      // Send the client cookies to the server
      credentials: 'same-origin',
      method: 'POST'
    })
    .then(() => {
      commit('SET_USER', null)
      this.$router.push('/')
    })
  },
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    await dispatch('menus/GET_MENUS')
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  }
  // async nuxtServerInit ({ dispatch }) {
  //   await dispatch('menus/GET_MENUS')
  // }
}
