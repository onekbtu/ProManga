<template>
  <div id='ImageByUrl'>
    <img :src='computedUrl' alt=''>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ImageByUrl extends Vue {
  @Prop() private url!: string;

  get computedUrl() {
    return `https://mri-image-decoder.now.sh/?url=${this.url}`;
  }
}
</script>

<style scoped>

</style>
