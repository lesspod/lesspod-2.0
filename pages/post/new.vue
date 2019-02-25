<template>
  <div>
    <Navbar :menus="menus"/>
    <div class="container">
      <form class="w-full max-w-xs">
        <div class="md:flex md:items-center mb-6">
          <div class="md:w-1/3">
            <label
              class="block text-grey font-bold mb-0 md:text-right md:mb-0 pr-4"
              for="inline-post-title"
            >Title</label>
          </div>
          <div class>
            <input id="inline-post-title" v-model="title" class type="text">
          </div>
        </div>
        <div class>
          <div>
            <label class="mb-0 mt-1" for="content">Content</label>
          </div>
          <div class>
            <div
              id="content"
              class="quill-editor"
              :content="content"
              @change="onEditorChange($event)"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @ready="onEditorReady($event)"
              v-quill:myQuillEditor="editorOption"
            ></div>
            <br>
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
    console.log('app init, my quill instance object is:', this.myQuillEditor)
    // setTimeout(() => {
    //   this.content = 'i am changed'
    // }, 3000)
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
    async addPost() {
      console.log('addPost called. Title: ' + this.title)
      // alert(
      //   'post added with title: ' + this.title + ' content: ' + this.content
      // )
      if (this.title && this.title.length > 0) {
        // var id = Math.floor(Math.random() * 100 + 4)
        // this.posts.push({ _id: id, title: this.title })
        var post = {
          // _id: id,
          title: this.title,
          content: this.content,
          author: 'Rajan Chandi'
        }
        await this.$store.dispatch('posts/ADD_POST', post)
        this.title = ''
        this.content = ''
      }
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
      // console.log('editor change!', editor, html, text)
      this.content = html
    }
  },
  asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    return {
      title: '',
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
