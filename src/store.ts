import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    urls: []
  },
  mutations: {
    setUrls(state, urls) {
      state.urls = urls;
    }
  },
  actions: {
    MRIsByURL ({ commit }, url: string): void {
      api.get(url).then(response => {
        if (response.status === 200) {
          const urls = response.data.data.map(value => value['url']);
          commit('setUrls', urls);
        }
      })
    }
  },
});
