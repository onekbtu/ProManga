<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input type="text" placeholder="MangaRock source">
    <br>
    <input type="text" placeholder="LHScan source">
    <br>
    <input type="submit">
    <ul>
      <li v-for='(url, index) in primaryImages' :value='url' :key='index'>
        <ImageByUrl :url='url'></ImageByUrl>
      </li>
    </ul>
    <ul>
      <li v-for='(url, index) in secondaryImages' :value='url' :key='index'>
        <ImageByUrl :url='url'></ImageByUrl>
      </li>
    </ul>
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
  @Prop() private msg!: string;

  @Action('getPrimaryImages') getPrimaryImages;

  @Action('getSecondaryImages') getSecondaryImages;

  @State('primaryImages') primaryImages: [string];

  @State('secondaryImages') secondaryImages: [string];

  mangaRockSource: string = '';

  lhScanSource: string = '';

  mounted() {
    // this.getPrimaryImages(
    //   'https://api.mangarockhd.com/query/web401/pagesv2?oid=mrs-chapter-241689&country=Kazakhstan',
    // );
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
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
