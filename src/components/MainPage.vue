<template>
  <div class="hello">
    <input type="text" placeholder="MangaRock source" v-model="mangaRockSource">
    <br>
    <input type="text" placeholder="LHScan source" v-model="lhScanSource">
    <br>
    <input type="submit" value="Read Manga" @click="readManga">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ImageByUrl from '@/components/ImageByUrl.vue';

  @Component({
    components: {
      ImageByUrl,
    },
  })
export default class HelloWorld extends Vue {
    mangaRockSource: string = '';

    lhScanSource: string = '';

    readManga() {
      this.$router.push({
        name: 'mangaDetails',
        query: {
          primarySource: this.mangaRockSource,
          secondarySource: this.lhScanSource,
        },
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
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
