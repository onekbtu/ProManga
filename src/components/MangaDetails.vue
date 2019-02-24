<template>
  <div>
    Select Chapter
    <h1> {{ primarySource }} </h1>
    <h1> {{ secondarySource }} </h1>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ImageByUrl from '@/components/ImageByUrl.vue'; // @ is an alias to /src

  @Component({
    components: {
      ImageByUrl,
    },
  })
export default class MangaDetails extends Vue {
    primarySource!: string='';

    secondarySource!: string='';

    mounted() {
      this.primarySource = this.$route.query.primarySource;
      this.secondarySource = this.$route.query.secondarySource;
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
