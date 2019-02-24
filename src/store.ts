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
      api.get(api.defaults.baseURL + url).then(response => {
        if (response.status === 200) {
          const urls: [string] = response.data.data.map((value: any) => value['url']);
          console.log(urls);
          commit('setUrls', urls);
        }
      })
    }
  },
});
