
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      videoUrl: ''
    }),
    mutations: {
      setVideoUrl(state, videoUrl) {
        state.videoUrl = videoUrl
      }
    },
    plugins: [
      createPersistedState()
    ]
  })
}

export default createStore
