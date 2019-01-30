<template>
  <div>
    <Navbar />
    <div class="container">
      <!-- <h1>Nuxt Serverless Template {{ this.version }}</h1> -->
      <h1>All Blog Posts</h1>
      <br />
      <!-- <p>{{ message }}</p> -->
      <li v-for="post in posts" :key="post._id">
        <a :href="'/post/' + post._id"> {{ post.title }} </a>
      </li>
      <br />
      <form class="w-full max-w-xs">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-menu-name"
            >
              Title
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              id="inline-post-title"
              v-model="title"
              class=""
              type="text"
            />
          </div>
        </div>
        <div class="">
          <div>
            <label class="" for="inline-username">
              Content
            </label>
          </div>
          <div class="md:w-2/3">
            <textarea
              id="inline-post-content"
              v-model="content"
              class=""
              type="text"
            />
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class="md:w-2/3">
            <button class="btn btn-primary" type="button" @click="addPost">
              Add Post
            </button>
          </div>
        </div>
      </form>
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
      console.log('addPost called')
      alert(
        'post added with title: ' + this.title + ' content: ' + this.content
      )
      this.$axios.post('/api/post', {
        title: this.title,
        text: this.content
      })
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
      title: 'aaa bbbb',
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
