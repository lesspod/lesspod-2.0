const Cookie = require('js-cookie') 
const cookieparser = require('cookieparser')

export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER: function (state, user) {
    state.authUser = user
    Cookie.set('auth', user)
  },
  RESET_USER: function (state, payLoad) {
    Cookie.remove('auth');
    state.authUser = payLoad;
    localStorage.clear();
  }
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
      commit('RESET_USER', null)
      this.$toast.success('Logout successful.', { duration: 2000 })
      this.$router.push('/')
    })
  },
  async nuxtServerInit ({ commit, dispatch }, { req }) {
    await Promise.all([
      dispatch('menus/GET_MENUS'),
      // dispatch('posts/GET_MY_POSTS'),
      dispatch('pages/GET_BLOGS'),
      dispatch('trash/GET_TRASH_POSTS'),
      dispatch('trash/GET_TRASH_PAGES'),
      dispatch('trash/GET_TRASH_MENUS')
    ])
    // if (req.session && req.session.authUser) {
    //   commit('SET_USER', req.session.authUser)
    // }

    let auth = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        auth = JSON.parse(parsed.auth)
      } catch (err) {
        // No valid cookie found
        console.log('not valid cookie')
      }
    }
    commit('SET_USER', auth)
  }
}
