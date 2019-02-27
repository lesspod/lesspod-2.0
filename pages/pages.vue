<template>
  <div>
    <Navbar :menus='menus'/>
    <!-- Modal Component -->
    <b-modal id="del-prompt" centered title="Delete Page + Menu"
      @ok="deletePage(selectedPage)"
      ok-title="Delete" ok-variant="danger">
      <p class="my-4">This will also delete <b>
        <template v-if="this.selectedPage">
        {{ this.selectedPage.title }}
        </template>
      </b> menu item.</p>
    </b-modal>
    <div class="container">
      <h4 class="w-full text-center pt-1 pb-1">Admin Pages</h4>
      <b-card-group deck class="mb-3">
        <b-card
          v-for="page in pages"
          :key="page._id"
          :title="page.title"
          tag="article"
          style="max-width: 15rem;min-width: 12rem;"
          class="mb-2"
        >
          <p class="card-text">
            {{ page.content }}
          </p>
          <b-button :href="page.title.toString().toLowerCase().replace(' ','-')" variant="success">Edit</b-button>
          <!-- <b-button :href="editUrl(post)" variant="success">Edit</b-button> -->
          <b-button type="button" class="btn btn-danger" @click="selectedPage=page" v-b-modal.del-prompt>Delete</b-button>
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
    async deletePage(page) {
      console.log('deleting.... ' + JSON.stringify(page))
      this.$store.dispatch('menus/DELETE_MENU', page.menuName)
      await this.$store.dispatch('pages/DELETE_PAGE', page)
    }
  },
  mounted() {
    window.localStorage.clear();
  },
  asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    return {
      title: '',
      content: '',
      selectedPage: {}
    }
  },
  async fetch({ store, params }) {
    await store.dispatch('pages/GET_PAGES')
  }
}
</script>
