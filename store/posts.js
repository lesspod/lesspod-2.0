import axios from 'axios'
export const state = () => ({
  posts: [
    { _id: '1', title: 'Just one good.', content: '', author: ''},
    { _id: '2', title: 'Why the world is great?', content: '', author: ''},
    { _id: '3', title: 'Just another blog post', content: '', author: ''},
    { _id: '4', title: 'How about some fun facts?', content: '', author: ''},
    { _id: '5', title: '10 ways to attain nirvana', content: '', author: ''}
  ],
  currentPost: []
})

export const mutations = {
  setPosts(state, data) {
    console.log('setting posts... ' + JSON.stringify(data))
    if(data) state.posts = data
  },
  setPost(state, data) {
    console.log('setting current post... ' + JSON.stringify(data))
    if(data) state.currentPost = data
  },
  add(state, post) {
    state.posts.push(post)
  },
  remove(state, post) {
    state.posts.splice(state.posts.indexOf(post), 1)
  }
}

export const actions = {
  async GET_POSTS ({ commit }) {
    // process.env.baseUrl
    const { data } = await axios.get(process.env.baseUrl + '/api/post/')
    commit('setPosts', data)
    console.log('data in GET_POSTS... ' + JSON.stringify(data))
  },
  async GET_POST ({ commit }, post_id) {
    // process.env.baseUrl
    const { data } = await axios.get(process.env.baseUrl + '/api/post/' + post_id)
    commit('setPost', data)
    console.log('data in GET_POST... ' + JSON.stringify(data))
  },
  async DELETE_POST({ commit }, post) {
    const { result } = await axios.delete(process.env.baseUrl + '/api/post/' + post._id)
    console.log('post deleted...' + result)
    commit('remove', post)
  }
}
