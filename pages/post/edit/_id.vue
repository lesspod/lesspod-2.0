<template>
  <div>
    <Navbar :menus="menus"/>
    <br>
    <div class="container">
      <form class="w-full max-w-xs">
        <div class="md:flex md:items-center mb-6">
          <div>
            <label
              class="block text-grey font-bold mb-0 md:text-right md:mb-0 pr-4"
              for="inline-post-title"
            >Title</label>
          </div>
          <div class>
            <input id="inline-post-title" :value="currentPost.title" type="text" class="w-100">
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
              :content="currentPost.content"
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
          <toggle-button :state="false" :width="100" :speed = "500" :height="40" v-model="isPublished" :sync="true" @change="toggled(isPublished)"
               :labels="{checked: 'Publish', unchecked: 'later'}"/>
          <div class>
            <button class="btn btn-primary" type="button" @click="savePost">Save Post</button>
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
  padding: 4rem 0;
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
import contentProcessing from '~/mixins/contentProcessing.js'
export default {
  mixins: [contentProcessing],
  components: {
    Navbar,
    Footer
  },
  mounted() {
    console.log('app init, my quill instance object is:', this.myQuillEditor)
    this.post_id = this.$nuxt._route.params.id
    this.$store.dispatch('posts/GET_POST', this.post_id)
    // setTimeout(() => {
    //   this.content = 'i am changed'
    // }, 3000)
  },
  computed: {
    currentPost() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.posts.currentPost
    }
  },
  data(){
    return ({
      isPublished : false
    })
  },
  methods: {
    savePost: function() {
      var titl = document.getElementById('inline-post-title')
      var cont = document.getElementsByClassName('ql-editor')
      cont = cont[0].innerHTML
      titl = titl.value
      console.log('saving content: ' + cont + '... title: ' + titl)

      if (titl && titl.length > 0) {

        // this.posts.push({ _id: id, title: this.title })
        var post = {
          _id: this.post_id,
          title: titl,
          content: cont,
          isPublished : this.isPublished
        }

        // this.$axios.put('/api/post/' + this.post_id, post)
        this.$store.dispatch('posts/UPDATE_POST', post)
      }
    },
    addPost: function() {
      console.log('addPost called')
      // alert(
      //   'post added with title: ' + this.title + ' content: ' + this.content
      // )
      if (this.title && this.title.length > 0) {
        this.$axios.post('/api/post', {
          title: this.title,
          content: this.content,
          author: this.author,
          isPublished : this.isPublished
        })
        var id = Math.floor(Math.random() * 100 + 4)
        // this.posts.push({ _id: id, title: this.title })
        var post = {
          _id: id,
          title: this.title,
          content: this.content,
          author: 'Jason Bourne'
        }
        this.$store.commit('posts/add', post)
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
      console.log('editor change!', editor, html, text)
      this.content = html
    },
    toggled(isPublished){
      console.log(isPublished, 'ISPUBLISED');
    }
  },
  async asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object

    return {
      title: '',
      content: '<p>I am Example</p>',
      post_id: '',
      editorOption: {
        // some quill options
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ]
          // syntax: {
          //   highlight: text => hljs.highlightAuto(text).value
          // }
        }
      }
    }
  }
}
</script>
