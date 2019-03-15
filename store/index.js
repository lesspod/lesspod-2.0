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
      this.$toast.success('Account created successfully.', { duration: 2000 })
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
        this.$toast.success('Successfully logged in.', { duration: 2000 })
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
      this.$toast.success('Logout successful.', { duration: 2000 })
      this.$router.push('/')
    })
  },
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    await Promise.all([
      dispatch('menus/GET_MENUS'),
      dispatch('posts/GET_POSTS'),
      dispatch('pages/GET_PAGES')
    ])
    if (req.session && req.session.authUser) {
      commit('SET_USER', req.session.authUser)
    }
  }
}
