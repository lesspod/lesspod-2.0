import axios from 'axios'
export const state = () => ({
  posts: [
    { _id: '1', title: 'Just one good.', content: '', author: ''},
    { _id: '2', title: 'Why the world is great?', content: '', author: ''},
    { _id: '3', title: 'Just another blog post', content: '', author: ''},
    { _id: '4', title: 'How about some fun facts?', content: '', author: ''},
    { _id: '5', title: '10 ways to attain nirvana', content: '', author: ''}
  ]
})

export const mutations = {
  setPosts(state, data) {
    console.log('setting posts... ' + JSON.stringify(data))
    if(data) state.posts = data
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
  }
}
