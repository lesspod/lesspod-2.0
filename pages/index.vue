<template>
  <div>
    <Navbar/>
    <div class="page-index ml-10 py-20">
      <!-- <h1>Nuxt Serverless Template {{ this.version }}</h1> -->
      <h1>All Blog Posts </h1><br>
      <!-- <p>{{ message }}</p> -->
      <li 
        v-for="post in posts" 
        :key="post._id">
        <a :href="'/post/'+ post._id">{{ post.title }}</a>
      </li><br>
      <button class="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded">
        <a 
          class="no-underline text-white" 
          href="/post/new">New Post</a>
      </button><br><br>
    </div>
    <Footer/>
    
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import Navbar from '~/components/NavbarResponsive.vue'
import Footer from '~/components/Footer.vue'

export default {
  components: {
    Logo,
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
