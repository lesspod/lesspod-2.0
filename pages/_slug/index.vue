<template>
  <div>
    <Navbar :menus="menus"/>
    <div class="container container-fluid">
      <span style="font-family: Lustria, serif;font-weight: medium;font-size: 1rem;" v-html="currentPage.content" v-show="!isLoggedIn()"></span>
      <div
        id="content"
        class="quill-editor"
        :content="currentPage.content"
        @change="onEditorChange($event)"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        v-quill:myQuillEditor="editorOption"
        v-if="isLoggedIn()"
      ></div><br>
      <!-- <span>{{ currentPage }}</span> -->
      <div class="md:flex md:items-center" v-show="isLoggedIn()">
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
p {
  font-family: Lustria, Georgia, Serif !important;
  font-weight: medium;
  font-size: 0.9rem;
}
</style>
<script type="text/javascript">
import Navbar from '~/components/NavbarBS.vue'
import Footer from '~/components/Footer.vue'
import contentProcessing from '~/mixins/contentProcessing.js'
import { mapMultiRowFields } from 'vuex-map-fields'
// import hljs from 'highlight.js'
export default {
  mixins: [contentProcessing],
  components: {
    Navbar,
    Footer
  },
  created() {
    console.log(this.$nuxt._route.params.slug)
    let slug = this.$nuxt._route.params.slug
    var temp = JSON.stringify(
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
    )
    if(temp && temp.content) this.currentPage = JSON.parse(temp)
    // make a copy of the current page to local variable

  },
  mounted() {
    console.log('app init, my quill instance object is:', this.myQuillEditor)
    this.currentPage = this.pageData[0]
  },
  computed: {
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
      currentPage: { content: null},
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
