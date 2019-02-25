<template>
  <div class="hello"
  >
    <ul>
      <li v-for='(url, index) in primaryImages' :value='url' :key='index'
          v-bind:style="{'display': index===currentImage ? 'block': 'none'}"
      >
        <ImageByUrl
          :url='url'
        >
        </ImageByUrl>
      </li>
    </ul>
    <ul>
      <li v-for='(url, index) in secondaryImages' :value='url' :key='index'
          v-bind:style="{'display': index===currentImage ? 'block': 'none'}"
      >
        <ImageByUrl
          :url='url'
        >
        </ImageByUrl>
      </li>
    </ul>
    <div @click="toggleSources" class="fixed-action-btn">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">chrome_reader_mode</i>
      </a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import ImageByUrl from '@/components/ImageByUrl.vue';

@Component({
  components: {
    ImageByUrl,
  },
})
export default class HelloWorld extends Vue {
  @Action('getPrimaryImages') getPrimaryImages;

  @Action('getSecondaryImages') getSecondaryImages;

  @State('primaryImages') primaryImages: [string];

  @State('secondaryImages') secondaryImages: [string];

  mangaRockSource: string = '';

  lhScanSource: string = '';

  currentImage: number = 0;

  nextMangaPage() {
    this.currentImage += 1;
  }

  toggleSources() {
    alert('toggled');
  }

  mounted() {
    this.getPrimaryImages(
      'https://api.mangarockhd.com/query/web401/pagesv2?oid=mrs-chapter-241689&country=Kazakhstan',
    );
    window.onkeyup = (e) => {
      const key = e.keyCode ? e.keyCode : e.which;

      if (key === 37) {
        this.currentImage -= 1;
      } else if (key === 39) {
        this.currentImage += 1;
      }
    };
    this.getSecondaryImages(
      'https://lhscan.net/read-tate-no-yuusha-no-nariagari-raw-chapter-52.html',
    );
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

.float{
  position:fixed;
  width:60px;
  height:60px;
  bottom:40px;
  right:40px;
  background-color:#0C9;
  color:#FFF;
  border-radius:50px;
  text-align:center;
  box-shadow: 2px 2px 3px #999;
}

.my-float{
  margin-top:22px;
}
</style>
