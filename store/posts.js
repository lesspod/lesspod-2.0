export const state = () => ({
  posts: [
    { _id: '1', title: 'Just one good day', content: '', author: '/'},
    { _id: '2', title: 'Why the world is great?', content: '', author: 'https://lesspod.com'},
    { _id: '3', title: 'Just another blog post', content: '', author: ''},
    { _id: '4', title: 'How about some fun facts?', content: '', author: '/post/all'},
    { _id: '5', title: '10 ways to attain nirvana', content: 'Features', author: 'https://lesspod.com'}
  ]
})

export const mutations = {
  add(state, post) {
    state.posts.push(post)
  },
  remove(state, post) {
    state.posts.splice(state.posts.indexOf(post), 1)
  }
}
