<template>
  <div class="page-index">
    <!-- <h1>Nuxt Serverless Template {{ this.version }}</h1> -->
    <h1>All Blog Posts </h1>
    <!-- <p>{{ message }}</p> -->
    <li v-for="post in posts">
      <a v-bind:href="'/post/'+ post._id">{{ post.title }}</a>
    </li><br><br><br>
    <a href="/post/new">New Post</a>
<!--     <nuxt-link to="/typescript">typescript</nuxt-link>
    <nuxt-link to="/nuxt">nuxt</nuxt-link> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { State } from 'vuex-class'
@Component
export default class PageIndex extends Vue {
  /**
   * You can fetch data from remote server with 'asyncData()' method
   */
  private async asyncData() {
    return {
      message: 'Say Hello to Node.js 8.10 in AWS Lambda and Nuxt 2.0',
      posts: [
        {_id: '1', title: 'post one'}, 
        {_id: '2', title: 'post two'}, 
        {_id: '3', title: 'post three'}
      ]
    }
  }
  /**
   * overide tags in <head> with 'head()' method
   */
  private head() {
    return {
      title: 'Hello, Nuxt Serverless Template',
    }
  }
  @State((state) => state.version) private version: string
}
</script>

<style lang="scss">
.page-index {
  h1 {
    color: #087f5b;
  }
}
</style>