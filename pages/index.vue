<template>
  <div>
    <Navbar :menus="menus"/>
    <div class="container">
      <!-- <h1>Nuxt Serverless Template {{ this.version }}</h1> -->
      <h1>All Blog Posts</h1>
      <br>
      <!-- <p>{{ message }}</p> -->
      <li v-for="post in posts" :key="post._id">
        <a :href="'/post/' + post._id">{{ post.title }}</a>
      </li>
      <br>
      <button class="btn btn-primary">
        <a class="no-underline text-white" href="/post/new">New Post</a>
      </button>
      <br>
      <br>
      <form class="w-full max-w-xs">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-menu-name"
            >Menu Name</label>
          </div>
          <div class="md:w-2/3">
            <input id="inline-menu-name" class type="text" value="Menu5" v-model="menuName">
          </div>
        </div>
        <div class>
          <div class>
            <label
              class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="under-menu"
            >Under Menu</label>
          </div>
          <div class>
            <input v-model="underMenu" id="under-menu" class type="text" value>
          </div>
        </div>
        <div class>
          <div class>
            <label
              class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="linked-to"
            >Linked To URL</label>
          </div>
          <div class="md:w-2/3">
            <input v-model="linkedTo" id="linked-to" class type="text" value>
          </div>
        </div>If the "Under Menu" is blank, the menu will be added on the top level.
        <br>
        <div>
          <div>
            <button class="btn btn-primary" type="button" @click="addMenu">Add Menu</button>
          </div>
        </div>
      </form>
    </div>
    <Footer/>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import Navbar from '~/components/NavbarBS.vue'
import Footer from '~/components/Footer.vue'
import { mapMutations } from 'vuex'
export default {
  components: {
    // Logo,
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
    addMenu() {
      // var strHTML = '<li class=\"nav-item\">\r\n<a class=\"nav-link\" href=\"#\">'+ this.menuName +'<\/a>\r\n<\/li>'
      // var node = document.createRange().createContextualFragment(strHTML)
      // document.getElementById("navUl").appendChild(node)
      // this.menus.push({
      //   menuName: this.menuName,
      //   underMenu: this.underMenu,
      //   linkedTo: this.linkedTo
      // })

      var menuItem = {
        menuName: this.menuName,
        underMenu: this.underMenu,
        linkedTo: this.linkedTo
      }

      this.$store.commit('menus/add', menuItem)
      console.log(JSON.stringify(this.menus))
    }
  },
  asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    return {
      // posts: [
      //   { _id: '1', title: 'post one' },
      //   { _id: '2', title: 'post two' },
      //   { _id: '3', title: 'post three' }
      // ],
      menuName: '',
      underMenu: '',
      linkedTo: 'https://www.lesspod.com'
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
