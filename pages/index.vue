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
      <button class="btn btn-primary">
        <a class="no-underline text-white" href="/post/new">
          New Post
        </a></button
      ><br /><br /><br /><br />
      <form class="w-full max-w-xs">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-menu-name"
            >
              Menu Name
            </label>
          </div>
          <div class="md:w-2/3">
            <input id="inline-full-name" class="" type="text" value="Menu5" />
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-username"
            >
              Under Menu
            </label>
          </div>
          <div class="md:w-2/3">
            <input id="inline-under-menu" class="" type="text" value="Menu1" />
          </div>
        </div>
        If the "Under Menu" is blank, the menu will be added on the top
        level.<br /><br />
        <div>
          <div>
            <button class="btn btn-primary" type="button">
              Add Menu
            </button>
          </div>
        </div>
      </form>
    </div>
    <Footer />
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import Navbar from '~/components/Navbar.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    // Logo,
    Navbar,
    Footer
  },
  asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    return {
      posts: [
        { _id: '1', title: 'post one' },
        { _id: '2', title: 'post two' },
        { _id: '3', title: 'post three' }
      ]
    }
  }
}
</script>
<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
