<template>
  <div>
    <Navbar :menus="menus"/>
    <div class="container container-fluid">
      <h4 class="w-full text-center pt-1 pb-1">All Blog Posts</h4>
      <b-card-group deck class="mb-3">
        <b-card
          v-for="post in posts"
          :img-src="'https://loremflickr.com/320/240/' + post.title.substr(0,post.title.indexOf(' '))"
          img-alt="Image"
          img-top
          :key="post._id"
          tag="article"
          style="max-width: 20rem;min-width: 15rem;"
          class="mb-2"
        >
          <!-- <b-card-title style="font-weight: 600;font-size: 1.3rem;">{{ post.title }}</b-card-title> -->
          <h6 class="card-title">{{ post.title }}</h6>
          <p
            class="card-text"
            style="font-size: 1rem;"
          >{{html2text(post.content).substring(0,80) + '...'}}</p>
          <!-- <b-button :href="readURL(post)" variant="primary">Read More</b-button> -->
          <nuxt-link
            class="btn btn-success mt-2"
            :to="{ name: 'post-id', params: { id: post._id }}"
          >Read More</nuxt-link>
        </b-card>
      </b-card-group>
    </div>
    <div class="page-index ml-10 py-20">
      <!-- <h1>Nuxt Serverless Template {{ this.version }}</h1> -->
    </div>
    <Footer/>
  </div>
</template>
<style scoped>
#mainContent {
  margin: 0 auto;
  padding: 4rem 0;
}
.container-fluid {
  padding-right: 4rem;
  padding-left: 4rem;
  margin-right: auto;
  margin-left: auto;
}
</style>
<script type="text/javascript">
import Navbar from '~/components/NavbarBS.vue'
import Footer from '~/components/Footer.vue'
import contentProcessing from '~/mixins/contentProcessing.js'
export default {
  mixins: [contentProcessing],
  components: {
    Navbar,
    Footer
  },
  methods: {
    readURL(post) {
      return '/post/' + post._id
    },
    asyncData(context) {
      // called every time before loading the component
      // as the name said, it can be async
      // Also, the returned object will be merged with your data object
      return {
        title: '',
        content: ''
      }
    }
  },
  async fetch({ store, params }) {
    console.log('fetch called in blog.vue')
    await store.dispatch('posts/GET_POSTS')
  }
}
</script>
