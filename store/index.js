// import vuexMapFields from 'vuex-map-fields';
// export const plugins = [vuexMapFields]
export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}
