import Vue from 'vue'
import Vuex from 'vuex'
import { getMusic } from 'api/api.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicInfo: null,
    isPlay: false,
    showPlayPage: false,
    listIndex: -1,
    isward: false
  },
  mutations: {
    ___getMusic(state, payload) { // 获取播放的歌曲
      state.musicInfo = payload.musicInfo
      if (!state.isPlay) {
        state.isPlay = true
      }
    },
    updateWard(state) {
      state.isward = true
    },
    togglePlay(state, payload) { // 切换播放
      state.isPlay = payload.isPlay
    },
    togglePlayPage(state, payload) { // 切换播放页面的显示
      state.showPlayPage = payload.showPlayPage
    },
    changeIndex(state, payload) { // 改变播放中歌曲
      state.listIndex = payload.listIndex
    }
  },
  actions: {
    _getMusic({ commit }, payload) { // 得到音乐
      getMusic({
        hash: payload.hash
      }).then((data) => {
        // 当data不为空 是切换到从第一首切换到最后一首或切换到第一到最后出现的问题
        //  data.data.play_url !== '' 是因为歌曲需要付费
        if (data && data.data.play_url !== '') {
          commit('___getMusic', {
            musicInfo: data.data
          })
        }
      })
    }
  }
})
