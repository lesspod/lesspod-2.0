<template>
  <div>
    <Navbar :menus='menus'/>
    <div class="container">
      <h1>You're viewing {{ pageName }} page.</h1>
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
    console.log(this.$nuxt._route.params.slug)
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
    pageName() {
      return this.$nuxt._route.params.slug
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
      this.content = html
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
  }
}
</script>
