export const state = () => ({
  api: false,
  introPopup: false,
  menuState: false,
  enewsState: false,
})

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('getData')
  },
  async getData({ commit }) {
    const { data } = await this.$axios.get(`${process.env.CMS_URL}`)
    commit('setData', data.options)
    commit('setIntroPopup', data.options.intro_popup.use_popup)
  }
}

export const mutations = {
  setData(state, theData) {
    state.api = theData
  },
  setIntroPopup(state) {
    state.introPopup = !state.introPopup
  },
  setMenu(state) {
    state.menuState = !state.menuState
  },
  setEnews(state) {
    state.enewsState = !state.enewsState
  },
}