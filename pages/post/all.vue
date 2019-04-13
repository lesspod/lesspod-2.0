<template>
  <div>
    <Navbar :menus="menus"/>

    <b-modal id="del-prompt" centered title="Move to trash"
      @ok="deletePost(selectedPost)"
      ok-title="Delete" ok-variant="danger">
      <p class="my-4">You can restore from this post from trash  <b>
        <template v-if="this.selectedPost">
        {{ this.selectedPost.title }}
        </template>
      </b> </p>
    </b-modal>

    <div class="container">
      <br><br><br>
      <h4 class="w-full text-center pt-1 pb-1">Admin Posts</h4>
      <b-card-group deck class="mb-3">
        <b-card
          v-for="post in posts"
          :key="post._id"
          :title="post.title"
          tag="article"
          style="max-width: 15rem;min-width: 12rem;"
          class="mb-2"
        >
          <p class="card-text block-ellipsis">{{html2text(post.content)}}</p>
          <!-- <b-button href="#" variant="success">Edit</b-button> -->
          <!-- <b-button :href="editUrl(post)" variant="success">Edit</b-button> -->
          <nuxt-link class="btn btn-success" :to="{ name: 'post-edit-id', params: { id: post._id }}">Edit</nuxt-link>
          <b-button type="button" class="btn btn-danger" @click="selectedPost=post" v-b-modal.del-prompt>Delete</b-button>
        </b-card>
        <!-- <div class="w-full flex flex-wrap overflow-hidden items-center">
          <br /><br />
          <div v-for="post in posts" :key="post._id" class="">
            <a :href="'/post/' + post._id" class="no-underline">
              {{ post.title }}
            </a>
          </div>
        </div>-->
      </b-card-group>
    </div>
    <div class="page-index ml-10 py-20">
      <!-- <h1>Nuxt Serverless Template {{ this.version }}</h1> -->
    </div>
    <Footer/>
  </div>
</template>
<style>
.two-line-ellipsis {
  /* padding-left:2vw; */
  text-overflow: ellipsis;
  overflow: hidden;
  width: 325px;
  line-height: 25px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  padding-top: 0px;
}
.block-ellipsis {
  display: block;
  display: -webkit-box;
  max-width: 100%;
  height: 43px;
  margin: 0 0 0.5rem 0;
  line-height: 1;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
<script type="text/javascript">
import Navbar from '~/components/NavbarBS.vue'
import Footer from '~/components/Footer.vue'
import contentProcessing from '~/mixins/contentProcessing.js'
export default {
  mixins: [contentProcessing],
  components: {
    Navbar,
    Footer
  },
  computed: {
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
    editUrl(post) {
      return process.env.baseUrl + '/post/edit/' + post._id
    },
    async deletePost(post) {
      console.log('deleting.... ' + JSON.stringify(post))
      await this.$store.dispatch('posts/DELETE_POST', post)
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
  async fetch({ store, params }) {
    await store.dispatch('posts/GET_POSTS')
  }
}
</script>
