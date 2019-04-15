import axios from 'axios'
export const state = () => ({
  posts: [
    // { _id: '5c73755d8d37x1457000bf01', title: 'Just one good.', content: '', author: ''},
    // { _id: '5c73755d8d37x1457000bf02', title: 'Why the world is great?', content: '', author: ''},
    // { _id: '5c73755d8d37x1457000bf03', title: 'Just another blog post', content: '', author: ''},
    // { _id: '5c73755d8d37x1457000bf04', title: 'How about some fun facts?', content: '', author: ''},
    // { _id: '5c73755d8d37x1457000bf05', title: '10 ways to attain nirvana', content: '', author: ''}
  ],
  pages : [],
  currentPost: []
})

export const mutations = {
  setTrashPosts(state, data) {
    console.log('setting posts... ' + JSON.stringify(data))
    if(data) state.trashPosts = data
  },
  
  setTrashPages(state, data) {
    console.log('setting pages ' + JSON.stringify(data))
    
    if(data) state.trashPages = data
  },

  setTrashMenus(state, data) {
    console.log('setting trashed menus ' + JSON.stringify(data))
    
    if(data) state.trashMenus = data
  },

  remove(state, post) {
    state.trashPages.splice(state.trashPages.indexOf(post), 1)
    this.$toast.success('Post removed successfully.', { duration: 2000 })
  },
  removeTrashedMenu(state, menu){
    state.trashMenus.splice(state.trashMenus.indexOf(menu), 1)
    this.$toast.success('Menu removed successfully.', { duration: 2000 })
  },
  removeTrashedPost(state, post) {
    state.trashPosts.splice(state.trashPosts.indexOf(post), 1)
    this.$toast.success('Post removed successfully.', { duration: 2000 })
  },
  restoreTrashedPost(state, post) {
    state.trashPosts.splice(state.trashPosts.indexOf(post), 1)
    this.$toast.success('Post restored successfully.', { duration: 2000 })
  },
  restoreTrashedPage(state, page) {
    state.trashPages.splice(state.trashPages.indexOf(page), 1)
    this.$toast.success('Page restored successfully.', { duration: 2000 })
  },
  restoreTrashedMenu(state, menu) {
    state.trashMenus.splice(state.trashMenus.indexOf(menu), 1)
    this.$toast.success('Menu restored successfully.', { duration: 2000 })
  }
}

export const actions = {

  async GET_TRASH_POSTS ({ commit }) {
    // process.env.baseUrl
    console.log('getting posts from: ' + process.env.baseUrl)
    const { data } = await axios.get(process.env.baseUrl + '/api/trash')
    console.log('data from gettarsh posts action', data)
    commit('setTrashPosts', data)            //line 15
    console.log('data in GET_TRASH_POSTS... ' + JSON.stringify(data))
  },

  async GET_TRASH_MENUS ({ commit }) {
    // process.env.baseUrl
    console.log('getting trashmenus from: ' + process.env.baseUrl)
    const { data } = await axios.get(process.env.baseUrl + '/api/trashMenu');  //
    commit('setTrashMenus', data)            //line 15
    console.log('data in GET_TRASH_MENUS... ' + JSON.stringify(data))
  },

  async GET_TRASH_PAGES ({ commit }) {
    // process.env.baseUrl
    console.log('getting pages from: ' + process.env.baseUrl)
    const { data } = await axios.get(process.env.baseUrl + '/api/trashPage');  //
    commit('setTrashPages', data)            //line 15
    console.log('data in GET_TRASH_PAGES... ' + JSON.stringify(data))
  },
  
  async DELETE_TRASHED_POST({ commit }, trashedPost) {
    const { result } = await axios.delete(process.env.baseUrl + '/api/trash/' + trashedPost._id)
    console.log('post deleted...' + result)
    commit('removeTrashedPost', trashedPost)
  },
  
  async DELETE_TRASHED_PAGE({ commit }, trashedPage) {
    console.log('ssaksaksaksaksaksakskasnaskansaskasnkasnksnka',trashedPage._id)
    const {result} = await axios.delete(process.env.baseUrl + '/api/trashPage/' + trashedPage._id)
    console.log('page deleted...' + result)
    console.log('dekho is bhai')
    commit('remove', trashedPage)
  },
  
  async DELETE_TRASHED_MENU({ commit }, menuName) {
    console.log('ssaksaksaksaksaksakskasnaskansaskasnkasnksnka',menuName)
    const {result} = await axios.delete(process.env.baseUrl + '/api/trashMenu/' + menuName)
    console.log('Menu deleted...' + result)
    console.log('dekho is bhai')
    commit('removeTrashedMenu', result)
  },
  
  async RESTORE_TRASHED_POST({ commit }, trashedPost) {
    const { result } = await axios.post(process.env.baseUrl + '/api/restore/post/' + trashedPost._id)
    console.log('post deleted...' + result)
    commit('restoreTrashedPost', trashedPost)
  },

  async RESTORE_TRASHED_PAGE({ commit }, trashedPage) {
    const { result } = await axios.post(process.env.baseUrl + '/api/restore/page/' + trashedPage._id)
    console.log('page deleted...' + result)
    commit('restoreTrashedPage', trashedPage)
  },
  
  async RESTORE_TRASHED_MENU({ commit }, menuName) {
    const { result } = await axios.post(process.env.baseUrl + '/api/restore/menu/' + menuName)
    console.log('menu Restored...' + result)
    commit('restoreTrashedMenu', result)
  }
}
