export const state = () => ({
  menuItems: [
    { menuName: 'Admin', underMenu: '', linkedTo: '/admin'},
    { menuName: 'Home', underMenu: '', linkedTo: '/'},
    { menuName: 'Features', underMenu: '', linkedTo: 'https://lesspod.com'},
    { menuName: 'Pricing', underMenu: '', linkedTo: ''},
    { menuName: 'Blog', underMenu: '', linkedTo: '/post/all'},
    { menuName: 'New', underMenu: '', linkedTo: '/'},
    { menuName: 'Post', underMenu: 'New', linkedTo: '/post/new'},
    { menuName: 'Menu', underMenu: 'New', linkedTo: ''},
    { menuName: 'Key Features', underMenu: 'Features', linkedTo: 'https://lesspod.com'},
    { menuName: 'All Features', underMenu: 'Features', linkedTo: ''}
  ]
})

export const mutations = {
  add(state, menuItem) {
    state.menuItems.push(menuItem)
  },
  remove(state, menuItem) {
    state.menuItems.splice(state.menuItems.indexOf(menuItem), 1)
  }
}
