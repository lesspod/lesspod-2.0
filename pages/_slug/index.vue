<template>
  <div>
    <Navbar :menus="menus"/>
    <div class="container container-fluid">
      <div
        id="content"
        class="quill-editor"
        :content="currentPage.content"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        v-quill:myQuillEditor="editorOption"
      ></div><br>
      <!-- <span>{{ currentPage }}</span> -->
      <div class="md:flex md:items-center">
          <div class>
            <button class="btn btn-primary" type="button" @click="savePage">Save Page</button>
          </div>
      </div>
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
.container-fluid {
  padding-right: 0;
  padding-left: 0;
  margin-right: auto;
  margin-left: auto;
}
</style>
<script type="text/javascript">
import Navbar from '~/components/NavbarBS.vue'
import Footer from '~/components/Footer.vue'
import { mapMultiRowFields } from 'vuex-map-fields'
// import hljs from 'highlight.js'
export default {
  components: {
    Navbar,
    Footer
  },
  created() {
    console.log(this.$nuxt._route.params.slug)
    let slug = this.$nuxt._route.params.slug
    this.currentPage =
    // make a copy of the current page to local variable
    JSON.parse(JSON.stringify(
    this.$store.state.pages.pages.filter(function(page) {
      //console.log(page.menuName.toLowerCase())
      return (
        page.menuName
          .toLowerCase()
          .toString()
          .replace(' ', '-')
          .valueOf() == slug
      )
    })[0]
    ))
  },
  mounted() {
    console.log('app init, my quill instance object is:', this.myQuillEditor)
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
    pageData() {
      // return this.$nuxt._route.params.slug
      let slug = this.$nuxt._route.params.slug
      return this.$store.state.pages.pages.filter(function(page) {
        console.log(page.menuName.toLowerCase())
        return (
          page &&
          page.menuName &&
          page.menuName
            .toLowerCase()
            .toString()
            .replace(' ', '-')
            .valueOf() == slug.valueOf()
        )
      })
    },
    pageContent() {
      // return this.$nuxt._route.params.slug
      return this.content
    }
  },
  methods: {
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
      this.currentHTML = html
    },
    savePage() {
      if(this.currentPage.content != this.currentHTML) {
          this.currentPage.content = this.currentHTML
          this.$store.dispatch('pages/UPDATE_PAGE', this.currentPage)
      }
    }
  },
  asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    return {
      currentPage: {},
      currentHTML: '',
      loggedIn: false,
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
  },
  async fetch({ store, params }) {
    await store.dispatch('pages/GET_PAGES')
  }
}
</script>
