<template>
  <div class="hello"
  >
    <div id="lightgalleryPrimary" :hidden="!showPrimary">
      <a v-for='(url, index) in primaryImages'
         target="_blank" :value='url' :key='index' :href="url">
        <img src="asf" />
      </a>
    </div>
    <div id="lightgallerySecondary" :hidden="showPrimary">
      <a v-for='(url, index) in secondaryImages'
         target="_blank" :value='url' :key='index' :href="url">
        <img src="asf" />
      </a>
    </div>
    <iframe :src="chapters[this.currentChapter].lhscan.url" hidden="true" frameborder="0"></iframe>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import ImageByUrl from '@/components/ImageByUrl.vue';
import 'lightgallery.js';
import 'lightgallery.js/dist/css/lightgallery.css';
import api from '../api';


@Component({
  components: {
    ImageByUrl,
  },
})
export default class HelloWorld extends Vue {
  @State('chapters') chapters;

  @State('currentChapter') currentChapter;

  currentImage: number = 0;

  primaryImages: [string] = [];

  secondaryImages: [string] = [];

  showPrimary:boolean = true;

  nextMangaPage() {
    this.currentImage += 1;
  }

  toggleSources() {
    // alert('toggled');
    this.currentImage += 1;
  }

  mounted() {
    this.getMangaPages();
  }

  getMangaPages() {
    api.post('https://pgo6canyzj.execute-api.us-east-2.amazonaws.com/v1/', {
      mangarock_chapter_url: this.chapters[this.currentChapter].mangarock.url,
      lhscan_chapter_url: this.chapters[this.currentChapter].lhscan.url,
    }).then((response) => {
      this.secondaryImages = response.data.images_from_mangarock_chapter;
      this.primaryImages = response.data.images_from_lhscan_chapter;
      this.$nextTick(() => {
        const lgPrimary = document.getElementById('lightgalleryPrimary');
        const lgSecondary = document.getElementById('lightgallerySecondary');
        lgPrimary.addEventListener('onSlideClick', this.swapSources);
        lgSecondary.addEventListener('onSlideClick', this.swapSources);
        lightGallery(lgPrimary, {
          closable: false,
          download: false,
          escKey: false,
        });
        lightGallery(lgSecondary, {
          closable: false,
          download: false,
          escKey: false,
        });
      });
    });
  }

  swapSources(event) {
    const x = this.primaryImages;
    this.primaryImages = this.secondaryImages;
    this.secondaryImages = x;
    const images = document.body.getElementsByClassName('lg-item');
    Array.from(images).forEach((divImg, index) => {
      const img = divImg.firstChild;
      if (img) {
        img.firstChild.src = this.primaryImages[index];
      }
    });
    // this.showPrimary = !this.showPrimary;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  width: 100%;
  display: inline-block;
  margin: 24px 16px 24px 16px;
}
a {
  color: #42b983;
}

</style>
