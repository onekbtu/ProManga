<template>
  <div class="hello"
  >
    <div id="lightgalleryPrimary" :hidden="!showPrimary">
      <a v-for='(url, index) in primaryImages'
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

  offsetPrimary: number = 0;

  offsetSecondary: number = 0;

  showPrimary:boolean = true;

  mounted() {
    this.getMangaPages();
  }

  getMangaPages() {
    api.post('https://pgo6canyzj.execute-api.us-east-2.amazonaws.com/v1/', {
      mangarock_chapter_url: this.chapters[this.currentChapter].mangarock.url,
      lhscan_chapter_url: this.chapters[this.currentChapter].lhscan.url,
    }).then((response) => {
      this.primaryImages = response.data.images_from_mangarock_chapter;
      this.secondaryImages = response.data.images_from_lhscan_chapter;
      this.$nextTick(() => {
        const lgPrimary = document.getElementById('lightgalleryPrimary');
        lgPrimary.addEventListener('onSlideClick', this.swapSources);
        lgPrimary.addEventListener('onAfterOpen', () => {
          const spanLeft = document.createElement('span');
          spanLeft.innerHTML = '<i class="material-icons">chevron_left</i>';
          const spanRight = document.createElement('span');
          spanRight.innerHTML = '<i class="material-icons">chevron_right</i>';
          const backButton = document.createElement('span');
          backButton.innerText = 'Back to chapters';
          spanLeft.classList.add('lg-icon');
          spanRight.classList.add('lg-icon');
          backButton.classList.add('lg-icon');
          document.body.getElementsByClassName('lg-close')[0].hidden = true;
          spanLeft.style = 'width: 50px;';
          spanRight.style = 'width: 50px;';
          backButton.style = 'width: 150px;font-size: 18px;';
          spanLeft.addEventListener('click', () => {
            this.offsetPrimary -= 1;
            this.reloadSources();
          });
          spanRight.addEventListener('click', () => {
            this.offsetPrimary += 1;
            this.reloadSources();
          });
          backButton.addEventListener('click', () => {
            window.lgData[lgPrimary.getAttribute('lg-uid')].destroy(true);
            this.$router.back();
          });
          document.body.getElementsByClassName('lg-toolbar')[0].appendChild(spanRight);
          document.body.getElementsByClassName('lg-toolbar')[0].appendChild(spanLeft);
          document.body.getElementsByClassName('lg-toolbar')[0].appendChild(backButton);
        });
        lightGallery(lgPrimary, {
          closable: false,
          download: false,
          escKey: false,
          controls: false,
        });
        document.body.getElementsByTagName('img')[0].click();
      });
    });
  }

  swapSources() {
    [this.primaryImages, this.secondaryImages] = [this.secondaryImages, this.primaryImages];
    [this.offsetPrimary, this.offsetSecondary] = [this.offsetSecondary, this.offsetPrimary];
    const images = document.body.getElementsByClassName('lg-item');
    Array.from(images).forEach((divImg, index) => {
      const img = divImg.firstChild;
      if (img) {
        const pos = Math.max(0, Math.min(
          this.offsetPrimary + index,
          this.primaryImages.length - 1,
        ));
        img.firstChild.src = this.primaryImages[pos];
      }
    });
  }

  reloadSources() {
    const images = document.body.getElementsByClassName('lg-item');
    Array.from(images).forEach((divImg, index) => {
      const img = divImg.firstChild;
      if (img) {
        const pos = Math.max(0, Math.min(
          this.offsetPrimary + index,
          this.primaryImages.length - 1,
        ));
        img.firstChild.src = this.primaryImages[pos];
      }
    });
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
