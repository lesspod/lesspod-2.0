<template>
  <div>
    <Navbar :menus='menus'/>
    <div class="container">
      <!-- <h1>Nuxt Serverless Template {{ this.version }}</h1> -->
      <h1>All Blog Posts</h1>
      <br>
      <!-- <p>{{ message }}</p> -->
      <li v-for="post in posts" :key="post._id">
        <a :href="'/post/' + post._id">{{ post.title }}</a>
      </li>
      <br>
      <form class="w-full max-w-xs">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-menu-name"
            >Title</label>
          </div>
          <div class>
            <input id="inline-post-title" v-model="title" class type="text">
          </div>
        </div>
        <div class>
          <div>
            <label class for="inline-username">Content</label>
          </div>
          <div class>
            <div
              class="quill-editor"
              :content="content"
              @change="onEditorChange($event)"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              v-quill:myQuillEditor="editorOption"
            ></div><br>
            <!-- <textarea
              id="inline-post-content"
              v-model="content"
              class=""
              type="text"
            />-->
          </div>
        </div>
        <div class="md:flex md:items-center">
          <div class>
            <button class="btn btn-primary" type="button" @click="addPost">Add Post</button>
          </div>
        </div>
      </form>
    </div>
    <Footer/>
  </div>
</template>
<style lang="scss" scoped>
  .container {
    width: 60%;
    margin: 0 auto;
    padding: 50px 0;
    .quill-editor {
      min-height: 200px;
      max-height: 400px;
      overflow-y: auto;
    }
  }
</style>
<script type="text/javascript">
import Navbar from '~/components/NavbarBS.vue'
import Footer from '~/components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  },
  mounted() {
    console.log('app init, my quill insrance object is:', this.myQuillEditor)
    setTimeout(() => {
      this.content = 'i am changed'
    }, 3000)
  },
  computed: {
    menus() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.menus.menuItems
    }
  },
  methods: {
    addPost: function() {
      console.log('addPost called')
      // alert(
      //   'post added with title: ' + this.title + ' content: ' + this.content
      // )
      this.$axios.post('/api/post', {
        title: this.title,
        text: this.content
      })
      var id = Math.floor(Math.random() * 100 + 4)
      this.posts.push({ _id: id, title: this.title })
      this.title = ''
    },
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.content = html
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
      ],
      content: '<p>I am Example</p>',
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block']
          ]
        }
      }
    }
  }
}
</script>
