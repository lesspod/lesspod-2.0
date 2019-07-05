import axios from 'axios'
export const state = () => ({
  posts: [
    // { _id: '5c73755d8d37x1457000bf01', title: 'Just one good.', content: '', author: ''},
    // { _id: '5c73755d8d37x1457000bf02', title: 'Why the world is great?', content: '', author: ''},
    // { _id: '5c73755d8d37x1457000bf03', title: 'Just another blog post', content: '', author: ''},
    // { _id: '5c73755d8d37x1457000bf04', title: 'How about some fun facts?', content: '', author: ''},
    // { _id: '5c73755d8d37x1457000bf05', title: '10 ways to attain nirvana', content: '', author: ''}
  ],
  currentPost: []
})

export const mutations = {
  setMyPosts(state, data) {
    if(data) state.myPosts = data
  },
  setBlogs(state, data) {
    if(data) state.blogs = data
  },
  setPost(state, data) {
    console.log('setting current post... ' + JSON.stringify(data))
    if(data) state.currentPost = data
  },
  update(state, post) {
    console.log('updating post... ' + JSON.stringify(post))
    for(var i in state.posts) {
      if(state.posts[i]._id == post._id) {
        state.posts[i] = post
      }
    }
    this.$toast.success('Post updated successfully.', { duration: 2000 })
  },
  add(state, post) {
    state.posts.push(post)
    this.$toast.success('Post added successfully.', { duration: 2000 })
  },
  // add(state, post) {
  //   state.posts.push(post)
  //   axios.post('/api/post', post)
  // },
  remove(state, post) {
    state.posts.splice(state.posts.indexOf(post), 1)
    this.$toast.success('Post removed successfully.', { duration: 2000 })
  },
  removeBlog(state, post){
    state.blogs.splice(state.posts.indexOf(post), 1)
    this.$toast.success('Blog removed successfully.', { duration: 2000 })
  },
  addBlog(state, post){
    if(state.blogs.indexOf(post) != -1){
        state.blogs.push(post);
        this.$toast.success('Blog posted successfully.', { duration: 2000 })
    }
    if(post.isPublished == false){
      state.blogs.splice(state.posts.indexOf(post), 1)
      this.$toast.success('Blog removed successfully.', { duration: 2000 })
    }
  },
  pleaseLogIn(state, result){
    this.$toast.success('Please login', { duration: 2000 })
    this.$router.push('/login')
  }
}

export const actions = {
  async ADD_POST ({ commit }, post) {
    console.log('ADD_POST...')
    var result = await axios.post('/api/post', post)
    console.log('ADD_POST result: ' + JSON.stringify(result))
    if(result.data == "sucessfully created")
      commit('add', post)
    else
      commit('pleaseLogIn', result);
  },
  async GET_MY_POSTS ({ commit }, authUser) {
    // process.env.baseUrl
    authUser ={userId : 'hjhjhjhjj'}
    console.log('getting posts from: ' + process.env.baseUrl + '/api/post/myPosts/' + authUser.userId)
    const  {data}  = await axios.get(process.env.baseUrl + '/api/post/myPosts/' + authUser.userId)
    commit('setMyPosts', data)
    console.log('data in GET_MY_POSTS... ' + JSON.stringify(data))
  },

  async GET_BLOGS({ commit }) {
    console.log('getting posts from: ' + process.env.baseUrl + '/api/post/published')
    const  {data}  = await axios.get(process.env.baseUrl + '/api/post/published')
    commit('setBlogs', data)
    console.log('data in GET_BLOGS... ' + JSON.stringify(data))
  },

  async GET_POST ({ commit }, post_id) {
    // process.env.baseUrl
    console.log('POST_URL: ' + process.env.baseUrl + '/api/post/' + post_id)
    const { data } = await axios.get(process.env.baseUrl + '/api/post/' + post_id)
    commit('setPost', data)
    console.log('data in GET_POST... ' + JSON.stringify(data))
  },
  async UPDATE_POST ({ commit }, post) {
    console.log('UPDATE_POST...')
    var result = await axios.put(process.env.baseUrl +'/api/post/' + post._id, post)
    console.log('UPDATE_POST result: ' + JSON.stringify(result))
    if(post.isPublished == true){
      commit('addBlog', post);
    } else{
      commit('removeBlog', post);
    }
    commit('update', post);
  },
  async DELETE_POST({ commit }, post) {
    const { result } = await axios.delete('/api/post/' + post._id)
    console.log('post deleted...' + result)
    commit('remove', post)
    commit('removeBlog', post)
  }
}
