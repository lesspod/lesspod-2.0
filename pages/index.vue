<template>

  <div>
    <nav class="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white border-b border-grey sm:items-baseline w-full">
      <div class="mb-2 sm:mb-0 flex flex-row xs:flex-col">
        <div class="h-12 w-12 self-center mr-2">
          <img 
            class="h-12 w-12 self-center" 
            src="../static/icon.png" >
        </div>
        <div class="self-start xs:self-center">
          <a 
            href="./index.html" 
            class="text-3xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold">Lesspod</a><br>
          <span class="text-xs text-grey-dark text-base">Serverless CMS</span>
        </div>
      </div>

      <div class="mb-2 sm:mb-0 flex text-lg flex-row xs:flex-col">
        <a 
          href="./index.html" 
          class="text-md no-underline text-black hover:text-blue-dark ml-2 px-1">Home</a>
        <div class="dropdown text-md no-underline text-black hover:text-blue-dark ml-2 px-1">
          <a 
            href="#" 
            class="appearance-none flex items-center inline-block">New
            <svg 
              class="h-4 w-4 ml-1" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></a>
          <div class="dropdown-content bg-white shadow rounded border overflow-hidden">
            <a 
              href="/post/new" 
              class="no-underline block px-4 py-3 border-b text-grey-darkest bg-white hover:text-white hover:bg-blue">Post</a>
            <a 
              href="/menu/new" 
              class="no-underline block px-4 py-3 border-b text-grey-darkest bg-white hover:text-white hover:bg-blue">Menu</a>  
          </div>
        </div>  
        <a 
          href="#" 
          class="text-md no-underline text-grey-darker hover:text-blue-dark ml-2 px-1">Dashboard</a>
        <div class="dropdown text-md no-underline text-black hover:text-blue-dark ml-2 px-1">
          <a 
            href="#" 
            class="appearance-none flex items-center inline-block">First Last
            <svg 
              class="h-4 w-4 ml-1" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg></a>
          <div class="dropdown-content bg-white shadow rounded border overflow-hidden">
            <a 
              href="/post/new" 
              class="no-underline block px-4 py-3 border-b text-grey-darkest bg-white hover:text-white hover:bg-blue">Profile</a>
            <a 
              href="/menu/new" 
              class="no-underline block px-4 py-3 border-b text-grey-darkest bg-white hover:text-white hover:bg-blue">Settings</a>  
            <a 
              href="/menu/new" 
              class="no-underline block px-4 py-3 border-b text-grey-darkest bg-white hover:text-white hover:bg-blue">Signout</a>    
          </div>
        </div>  
      </div>
    </nav>
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
          href="/post/new">New Post</a>
      </button><br><br>
    </div>

    <footer class="w-full text-center border-t border-grey p-4">
      <p>
        Made with ❤️ by Lesspod Team
      </p>
    </footer>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
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
a:-webkit-any-link {
  text-decoration: none !important;
  color: inherit;
}
.dropdown-content {
  display: none;
  position: absolute;
  z-index: 1;
}
.dropdown:hover .dropdown-content {
  display: block;
}
</style>
