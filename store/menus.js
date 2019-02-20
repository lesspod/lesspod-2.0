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
  },
  remove(state, menuName) {
    var menuItem = state.menuItems.filter(menu1 => {
      return menu1.menuName == menuName;
    })
    state.menuItems.splice(state.menuItems.indexOf(menuItem[0], 1))
  }
}

export const actions = {
  async DELETE_MENU({ commit }, menuName) {
    // const { result } = await axios.delete(process.env.baseUrl + '/api/menu/' + menu._id)
    // console.log('menu deleted...' + result)
    commit('remove', menuName)
  }
}
