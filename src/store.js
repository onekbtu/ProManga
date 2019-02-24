import Vue from 'vue';
import Vuex from 'vuex';
import { getImagesFromLHScanByUrl, getImagesFromMangaRockByUrl } from '@/parsers';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    primaryImages: [''],
    secondaryImages: [''],
  },
  mutations: {
    setPrimaryImages(state, images) {
      state.primaryImages = images;
    },
    setSecondaryImages(state, images) {
      state.secondaryImages = images;
    },
  },
  actions: {
    getPrimaryImages({ commit }, url) {
      getImagesFromMangaRockByUrl(url).then((images) => {
        commit('setPrimaryImages', images);
      });
    },
    getSecondaryImages({ commit }, url) {
      getImagesFromLHScanByUrl(url).then((images) => {
        commit('setSecondaryImages', images);
      });
    },
  },
});
// # sourceMappingURL=store.js.map
