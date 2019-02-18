<template>
  <div>
    <Navbar :menus='menus'/>
    <div class="container">
      <h2 class="w-full text-center pt-1 pb-1">Admin Posts</h2>
      <b-card-group deck class="mb-3">
        <b-card
          v-for="post in posts"
          :key="post._id"
          :title="post.title"
          tag="article"
          style="max-width: 15rem;min-width: 10rem;"
          class="mb-2"
        >
          <p class="card-text">
            <!-- {{post.content}} -->
          </p>
          <!-- <b-button href="#" variant="success">Edit</b-button> -->
          <b-button :href="editUrl(post)" variant="success">Edit</b-button>
          <button type="button" class="btn btn-danger" @click="deletePost(post)">Delete</button>
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
<style></style>
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
    addPost: function() {
      alert(
        'post added with title: ' + this.title + ' content: ' + this.content
      )
      var id = Math.floor(Math.random() * 100 + 4)
      this.posts.push({ _id: id, title: this.title })
      this.title = ''
    },
    editUrl(post){
      return process.env.baseUrl + '/post/edit/' + post._id
    },
    deletePost: function(post) {
      console.log('deleting.... ' + JSON.stringify(post))
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
  async fetch ({ store, params }) {
    await store.dispatch('posts/GET_POSTS');
  }
}
</script>
