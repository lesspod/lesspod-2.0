import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields'
export const state = () => ({
  pages: [
    { _id: '1', title: 'Home', menuName: 'Home', content: '', author: '' },
    { _id: '2', title: 'Features', menuName: 'Features', content: '', author: '' },
    { _id: '3', title: 'Pricing', menuName: 'Pricing', content: 'This is a pricing page.', author: '' },
    { _id: '4', title: 'Key Features', menuName: 'Key Features', content: '', author: '' },
    { _id: '5', title: 'All Features', menuName: 'All Features', content: '', author: '' }
  ]
})

export const getters = {
  getField
}

export const mutations = {
  setPages(state, data) {
    console.log('setting pages... ' + JSON.stringify(data))
    if (data) {
      var temp = state.pages.concat(data)
      // deduplication code
      temp.sort();
      for (var i = 1; i < temp.length;) {
        if (temp[i - 1]._id == temp[i]._id) {
          temp.splice(i, 1);
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
    axios.post('/api/page', page)
  },
  remove(state, page) {
    state.pages.splice(state.pages.indexOf(page), 1)
  },
  updateField
  // update(state, page) {
  //   state.page = page
  // }
}

export const actions = {
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
  async DELETE_PAGE({ commit }, page) {
    const { result } = await axios.delete(process.env.baseUrl + '/api/page/' + page._id)
    console.log('page deleted...' + result)
    commit('remove', page)
  }
}
