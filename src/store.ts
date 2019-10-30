import Vue from 'vue';
import Vuex from 'vuex';
import { getImagesFromLHScanByUrl, getImagesFromMangaRockByUrl } from './parsers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chapters: [],
    currentChapter: -1,
    primaryImages: [''],
    secondaryImages: [''],
  },
  mutations: {
    setChapters(state, chapters) {
      state.chapters = chapters;
    },
    setCurrentChapter(state, chapterIndex) {
      state.currentChapter = chapterIndex;
    },
  },
});
