import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'
export const state = () => ({
  pages: [
    { _id: '5c73755d8d37b1457000bf01', title: 'Home', menuName: 'Home', content: 'just a home', author: '' },
    { _id: '5c73755d8d37b1457000bf02', title: 'Features', menuName: 'Features', content: '', author: '' },
    { _id: '5c73755d8d37b1457000bf03', title: 'Pricing', menuName: 'Pricing', content: 'This is a pricing page.', author: '' },
    { _id: '5c73755d8d37b1457000bf04', title: 'Key Features', menuName: 'Key Features', content: '', author: '' },
    { _id: '5c73755d8d37b1457000bf05', title: 'All Features', menuName: 'All Features', content: '', author: '' }
  ]
})

export const getters = {
  getField
}

export const mutations = {
  setPages(state, data) {
    console.log('setting pages... ' + JSON.stringify(data))
    if (data) {
      var temp = state.pages.concat(data).sort((a, b) => a._id.localeCompare(b._id))
      // deduplication code
      // temp.sort();
      for (var i = 1; i < temp.length;) {
        if (temp[i - 1]._id == temp[i]._id) {
          temp.splice(i-1, 1);
        } else {
          i++;
        }
      }
      state.pages = temp
    }
  },
  setPage(state, data) {
    console.log('setting current page... ' + JSON.stringify(data))
    if (data) state.currentPage = data
  },
  add(state, page) {
    state.pages.push(page)
    // axios.post('/api/page', page)
  },
  update(state, page) {
    console.log('updating page... ' + JSON.stringify(page))
    for(var i in state.pages) {
      if(state.pages[i]._id == page._id) {
        state.pages[i] = page
      }
    }
  },
  remove(state, page) {
    state.pages.splice(state.pages.indexOf(page), 1)
  },
  updateField
}

export const actions = {
  async ADD_PAGE ({ commit }, page) {
    console.log('ADD_PAGE...')
    var result = await axios.post('/api/page', page)
    console.log('ADD_PAGE result: ' + JSON.stringify(result))
    commit('add', page)
  },
  async GET_PAGES({ commit }) {
    // process.env.baseUrl
    const { data } = await axios.get(process.env.baseUrl + '/api/page/')
    commit('setPages', data)
    console.log('data in GET_PAGES... ' + JSON.stringify(data))
  },
  async GET_PAGE({ commit }, page_id) {
    // process.env.baseUrl
    const { data } = await axios.get(process.env.baseUrl + '/api/page/' + post_id)
    commit('setPage', data)
    console.log('data in GET_PAGE... ' + JSON.stringify(data))
  },
  async UPDATE_PAGE ({ commit }, page) {
    console.log('UPDATE_PAGE...')
    var result = await axios.put('/api/page/' + page._id, page)
    console.log('UPDATE_PAGE result: ' + JSON.stringify(result))
    commit('update', page)
  },
  async DELETE_PAGE({ commit }, page) {
    const { result } = await axios.delete(process.env.baseUrl + '/api/page/' + page._id)
    console.log('page deleted...' + result)
    commit('remove', page)
  }
}
