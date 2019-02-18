<template>
  <div>
    <Navbar :menus='menus'/>
    <div class="container">
      <h4 class="w-full text-center pt-1 pb-1">All The Pages</h4>
      <b-card-group deck class="mb-3">
        <b-card
          v-for="page in pages"
          :key="page._id"
          :title="page.title"
          tag="article"
          style="max-width: 15rem;min-width: 10rem;"
          class="mb-2"
        >
          <p class="card-text">
            {{ page.content }}
          </p>
          <b-button :href="page.title.toString().toLowerCase().replace(' ','-')" variant="success">Edit</b-button>
          <!-- <b-button :href="editUrl(post)" variant="success">Edit</b-button> -->
          <button type="button" class="btn btn-danger" @click="deletePage(page)">Delete</button>
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
    },
    pages() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.pages.pages
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
    deletePage: function(page) {
      console.log('deleting.... ' + JSON.stringify(page))
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
  }
}
</script>
