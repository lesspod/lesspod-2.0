<template>
  <div>
    <Navbar />
    <div class="container">
      <h1 class="w-full text-center pt-1 pb-1">All Blog Posts</h1>
      <div class="w-full flex flex-wrap overflow-hidden items-center">
        <br /><br />
        <div v-for="post in posts" :key="post._id" class="">
          <a :href="'/post/' + post._id" class="no-underline">
            {{ post.title }}
          </a>
        </div>
      </div>
    </div>
    <div class="page-index ml-10 py-20">
      <!-- <h1>Nuxt Serverless Template {{ this.version }}</h1> -->
    </div>
    <Footer />
  </div>
</template>
<style></style>
<script type="text/javascript">
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  },
  methods: {
    addPost: function() {
      alert(
        'post added with title: ' + this.title + ' content: ' + this.content
      )
      var id = Math.floor(Math.random() * 100 + 4)
      this.posts.push({ _id: id, title: this.title })
      this.title = ''
    }
  },
  asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    return {
      title: '',
      content: '',
      posts: [
        { _id: '1', title: 'post one' },
        { _id: '2', title: 'post two' },
        { _id: '3', title: 'post three' }
      ]
    }
  }
}
</script>
