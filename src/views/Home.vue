<template>
  <div class="home">
    <!--<img alt="Vue logo" src="../assets/logo.png" style="height: 20%; width: 20%;">-->
    <Reader msg="Welcome, master"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Reader from '@/components/Reader.vue'; // @ is an alias to /src

@Component({
  components: {
    Reader,
  },
})
export default class Home extends Vue {}
</script>
