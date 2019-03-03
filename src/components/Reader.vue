<template>
  <div class="hello"
  >
    <div id="lightgallery">
      <a v-for='(url, index) in primaryImages'
         target="_blank" :value='url' :key='index' :href="url">
        <img src="asf" />
      </a>
    </div>
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

  nextMangaPage() {
    this.currentImage += 1;
  }

  toggleSources() {
    // alert('toggled');
    this.currentImage += 1;
  }

  mounted() {
    this.getMangaPages();
    window.onkeyup = (e) => {
      const key = e.keyCode ? e.keyCode : e.which;

      if (key === 37) {
        this.currentImage -= 1;
      } else if (key === 39) {
        this.currentImage += 1;
      }
    };
  }

  getMangaPages() {
    console.log(this.chapters);
    console.log(this.currentChapter);
    api.post('https://pgo6canyzj.execute-api.us-east-2.amazonaws.com/v1/', {
      mangarock_chapter_url: this.chapters[this.currentChapter].mangarock.url,
      lhscan_chapter_url: this.chapters[this.currentChapter].lhscan.url,
    }).then((response) => {
      this.primaryImages = response.data.images_from_mangarock_chapter;
      this.secondaryImages = response.data.images_from_lhscan_chapter;
      this.$nextTick(() => {
        lightGallery(document.getElementById('lightgallery'), {
          closable: false,
          download: false,
          escKey: false,
        });
      });
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
