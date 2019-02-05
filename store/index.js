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
    menus: {
      namespaced: true,
      state: () => ({

      }),
      mutations: {
        add(state, { text }) {
          state.menus.push({
            text
          })
        },
        remove(state, { menu }) {
          state.menus.splice(state.menus.indexOf(menu), 1)
        }
      }
    },
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
