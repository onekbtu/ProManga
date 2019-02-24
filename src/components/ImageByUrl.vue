<template>
  <div id='ImageByUrl'>
    <img :src='url' alt=''>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ImageByUrl extends Vue {
  @Prop() private url!: string;
}
</script>

<style scoped>

</style>
