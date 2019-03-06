import Vue from 'vue';
import Vuex from 'vuex';
import { getImagesFromLHScanByUrl, getImagesFromMangaRockByUrl } from '@/parsers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chapters: [],
    currentChapter: -1,
    primaryImages: [''],
    secondaryImages: [''],
  },
  mutations: {
    setPrimaryImages(state, images: [string]) {
      state.primaryImages = images;
    },
    setSecondaryImages(state, images: [string]) {
      state.secondaryImages = images;
    },
    setChapters(state, chapters) {
      state.chapters = chapters;
    },
    setCurrentChapter(state, chapterIndex) {
      state.currentChapter = chapterIndex;
    },
  },
  actions: {
    getPrimaryImages({ commit }, url: string): void {
      getImagesFromMangaRockByUrl(url).then((images: [string]) => {
        commit('setPrimaryImages', images);
      });
    },
    getSecondaryImages({ commit }, url: string): void {
      getImagesFromLHScanByUrl(url).then((images: [string]) => {
        commit('setSecondaryImages', images);
      });
    },
  },
});
