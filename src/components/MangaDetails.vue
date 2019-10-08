<template>
  <div>
    <h5><b> {{ mangaName }} </b> </h5>
    <h6><b> Select Chapter:</b>
    </h6>
    <div v-if="isLoading" class="progress">
      <div class="indeterminate"></div>
    </div>
    <div v-else class="collection" style="overflow: auto; max-height: 95vh">
      <div
        v-for="(chapter, index) in chapters"
        :key="index"
        @click="selectChapter(index)">
          <router-link
            style="width: 100%; height: 100%;"
            class="collection-item"
            event=""
            to=""
          >
            {{ chapter.mangarock.name }}
          </router-link>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class'; // @ is an alias to /src
import api from '../api';

@Component
export default class MangaDetails extends Vue {
    @Mutation('setChapters') setChapters;

    @Mutation('setCurrentChapter') setCurrentChapter;

    @State('chapters') chapters: [any];

    mangaName: string = '';

    primarySource: string = '';

    secondarySource: string = '';

    isLoading: boolean = false;

    mounted() {
      this.primarySource = this.$route.query.primarySource;
      this.secondarySource = this.$route.query.secondarySource;
      this.isLoading = true;
      api.post('https://nwuo5irj2e.execute-api.us-east-2.amazonaws.com/stage1', {
        mangarock_url: this.primarySource,
        lhscan_url: this.secondarySource,
      }).then((response) => {
        this.isLoading = false;
        this.mangaName = response.data.manga_name;
        this.setChapters(response.data.chapters);
      });
    }

    selectChapter(chapterIndex) {
      this.setCurrentChapter(chapterIndex);
      this.$router.push({ name: 'reader' });
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
