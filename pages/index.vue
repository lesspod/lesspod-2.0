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
      </button><br><br><br><br>
      <form class="w-full max-w-xs">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label 
              class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" 
              for="inline-menu-name">
              Menu Name
            </label>
          </div>
          <div class="md:w-2/3">
            <input 
              id="inline-full-name" 
              class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" 
              type="text" 
              value="Menu5">
          </div>
        </div>
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label 
              class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4" 
              for="inline-username">
              Under Menu
            </label>
          </div>
          <div class="md:w-2/3">
            <input 
              id="inline-under-menu" 
              class="bg-grey-lighter appearance-none border-2 border-grey-lighter rounded w-full py-2 px-4 text-grey-darker leading-tight focus:outline-none focus:bg-white focus:border-green" 
              type="text" 
              value="Menu1">
          </div>
        </div>
        If the "Under Menu" is blank, the menu will be added on the top level.<br><br>
        <div class="md:flex md:items-center">
          <div class="md:w-1/3"/>
          <div class="md:w-2/3">
            <button 
              class="shadow bg-green hover:bg-green-light focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded" 
              type="button">
              Add Menu
            </button>
          </div>
        </div>
      </form>
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
