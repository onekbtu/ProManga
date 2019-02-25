import Vue from 'vue';
import Router from 'vue-router';
import MainPage from './components/MainPage.vue';
import MangaDetails from './components/MangaDetails.vue';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainPage,
    },
    {
      path: '/manga/read',
      name: 'home',
      component: Home,
    },
    {
      path: '/manga',
      name: 'mangaDetails',
      component: MangaDetails,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    },
  ],
});
