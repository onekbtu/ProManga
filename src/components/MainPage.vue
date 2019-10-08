<template>
  <div class="hello">
    <div class="container">
      <div style="margin-top: 32px" class="input-field col s12">
        <input id="input_mangarock"
               type="text"
               placeholder="Ex: https://mangarock.com/manga/mrs-..."
               v-model="mangaRockSource">
        <label for="input_mangarock">Mangarock Source</label>
      </div>
      <br>
      <div class="input-field col s12">
          <input id="input_lhscan"
                 type="text"
                 placeholder="Ex: https://lhscan.net/manga-..."
                 v-model="lhScanSource">
          <label for="input_lhscan">LHScan Source</label>
      </div>
      <br>
      <input type="submit" value="Select Manga" @click="readManga">
    </div>

    <h3><b>Help</b></h3>
    <h6> Get manga from mangarock: <a target="_blank" href="https://mangarock.com/">https://mangarock.com/</a></h6>
    <h6> Get manga from lhscan: <a target="_blank" href="https://lhscan.net/">https://lhscan.net/</a></h6>
    <p>Example mangarock:</p>
    <img style="width: 100%; max-width: 400px;"
         src="../assets/main_mangarock.png"
         alt="example_mangarock.png">
    <p>Example lhscan:</p>
    <img style="width: 100%; max-width: 400px"
         src="../assets/main_lhscan.png"
         alt="example_lhscan.png">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
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
</style>
