export const state = () => ({
  menuItems: [
    { menuName: 'Admin', underMenu: '', linkedTo: '/admin'},
    { menuName: 'Home', underMenu: '', linkedTo: '/'},
    { menuName: 'Features', underMenu: '', linkedTo: 'https://lesspod.com'},
    { menuName: 'Pricing', underMenu: '', linkedTo: '/pricing'},
    { menuName: 'Blog', underMenu: '', linkedTo: '/blog'},
    { menuName: 'New', underMenu: '', linkedTo: '/'},
    { menuName: 'Post', underMenu: 'New', linkedTo: '/post/new'},
    { menuName: 'Menu', underMenu: 'New', linkedTo: ''},
    { menuName: 'Key Features', underMenu: 'Features', linkedTo: '/key-features'},
    { menuName: 'All Features', underMenu: 'Features', linkedTo: '/all-features'}
  ]
})

export const mutations = {
  add(state, menuItem) {
    state.menuItems.push(menuItem)
    axios.post('/api/menu', menuItem)
  },
  remove(state, menuName) {
    var menuItem = state.menuItems.filter(menu1 => {
      return menu1.menuName == menuName;
    })
    state.menuItems.splice(state.menuItems.indexOf(menuItem[0], 1))
  }
}

export const actions = {
  async GET_MENUS ({ commit }) {
    // process.env.baseUrl
    const { data } = await axios.get(process.env.baseUrl + '/api/menu/')
    commit('setPosts', data)
    console.log('data in GET_MENUS... ' + JSON.stringify(data))
  },
  async GET_MENU ({ commit }, menu_id) {
    // process.env.baseUrl
    const { data } = await axios.get(process.env.baseUrl + '/api/menu/' + menu_id)
    commit('setPost', data)
    console.log('data in GET_MENU... ' + JSON.stringify(data))
  },
  async DELETE_MENU({ commit }, menuName) {
    // const { result } = await axios.delete(process.env.baseUrl + '/api/menu/' + menu._id)
    // console.log('menu deleted...' + result)
    commit('remove', menuName)
  }
}
