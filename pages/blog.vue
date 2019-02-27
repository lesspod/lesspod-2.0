<template>
  <div>
    <Navbar :menus='menus'/>
    <div class="container">
      <h3 class="w-full text-center pt-1 pb-1">All Blog Posts</h3>
      <b-card-group deck class="mb-3">
        <b-card
          v-for="post in posts"
          :img-src="'https://loremflickr.com/320/240/' + post.title.substr(0,post.title.indexOf(' '))"
          img-alt="Image"
          img-top
          :key="post._id"
          tag="article"
          style="max-width: 15rem;min-width: 12rem;"
          class="mb-2"
        >
          <b-card-title style="font-weight: 600;font-size: 1.3rem;">{{ post.title }}</b-card-title>
          <p class="card-text" style="font-size: 1rem;">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <!-- <b-button :href="readURL(post)" variant="primary">Read More</b-button> -->
          <nuxt-link class="btn btn-success" :to="{ name: 'post-id', params: { id: post._id }}">Read More</nuxt-link>
        </b-card>
        <!-- <div class="w-full flex flex-wrap overflow-hidden items-center">
          <br /><br />
          <div v-for="post in posts" :key="post._id" class="">
            <a :href="'/post/' + post._id" class="no-underline">
              {{ post.title }}
            </a>
          </div>
        </div> -->
      </b-card-group>
    </div>
    <div class="page-index ml-10 py-20">
      <!-- <h1>Nuxt Serverless Template {{ this.version }}</h1> -->
    </div>
    <Footer />
  </div>
</template>
<style>
.container {
  padding: 4rem 0;
}
</style>
<script type="text/javascript">
import Navbar from '~/components/NavbarBS.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    menus() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.menus.menuItems
    },
    posts() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.posts.posts
    }
  },
  methods: {
    readURL(post) {
      return '/post/' + post._id
    }
  },
  asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    return {
      title: '',
      content: ''
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('posts/GET_POSTS')
  }
}
</script>
