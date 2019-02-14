<template>
  <div>
    <Navbar :menus='menus'/>
    <div class="container">
      <p>Page Content: {{ pageContent }}</p>
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
    let slug = this.$nuxt._route.params.slug
      var page1 = this.$store.state.pages.pages.filter(function(page){
        //console.log(page.menuName.toLowerCase())
        return (page.menuName.toLowerCase().toString().replace(' ','-').valueOf() == slug.valueOf())
      })
      console.log('JSON.stringify(page1[0])' + JSON.stringify(page1[0]))
      this.content = JSON.stringify(page1[0].content)
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
      return this.$store.state.pages.pages.filter(function(page){
        console.log(page.menuName.toLowerCase())
        return page && page.menuName && (page.menuName.toLowerCase().toString().replace(' ','-').valueOf() == slug.valueOf())
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
