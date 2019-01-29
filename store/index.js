import Vuex from 'vuex'
new Vuex.Store({
  state: () => ({
    counter: 0
  }),
  mutations: {
    increment(state) {
      state.counter++
    }
  },
  modules: {
    posts: {
      namespaced: true,
      state: () => ({
        posts: []
      }),
      mutations: {
        add(state, { text }) {
          state.posts.push({
            text,
            done: false
          })
        },
        remove(state, { post }) {
          state.posts.splice(state.posts.indexOf(post), 1)
        },
        toggle(state, { post }) {
          post.done = !post.done
        }
      }
    }
  }
})
