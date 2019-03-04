<template>
  <div>
    <Navbar :menus="menus"/>
    <div class="container container-fluid">
      <div class="row">
        <div class="col-sm-1 px-1 share-sidebar">
          <div class="py-1 sticky-top flex-grow-1" style="top:6rem;">
            <div class="nav flex-sm-column">
              <span href class="nav-link d-none d-sm-inline" style="color:grey;"></span>
              <a  target="_blank" href="https://twitter.com/home?status=http%3A//www.lesspod.com" class="nav-link" style="color:darkgrey;"><i class="fab fa-twitter"></i></a>
              <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A//www.lesspod.com" class="nav-link" style="color:darkgrey;"><i class="fab fa-facebook"></i></a>
              <a href class="nav-link" style="color:darkgrey;"><i class="fa fa-link"></i></a>
                <!-- <a href class="nav-link">Link</a>
                <a href class="nav-link">Link</a> -->
            </div>
          </div>
        </div>
        <div class="col" id="main">
          <div
            class="postTitle"
            style="font-family: 'Noto Serif SC', serif !important;font-weight: 600;font-size: 2rem;"
          >{{ currentPost.title }}</div>
          <span style="font-family: sans-serif; font-weight:300; font-size: 0.9rem;">March 1, 2019 . 5 min read . Written By: <a href="#" style="color:black;">Rajan Chandi</a></span>
          <span id="postContent" style v-html="currentPost.content"></span>
          <div class="card" style="margin-top: -3rem;margin-bottom: -1rem;">
            <div class="card-body">
              <div class="row">
                <div class="col-md-3">
                  <img
                    src="https://image.ibb.co/jw55Ex/def_face.jpg"
                    class="img img-rounded img-fluid"
                  >
                </div>
                <div class="col-md-9">
                  <p style="margin:0; padding:0;">
                    <a
                      class="float-left"
                      href="#"
                      style="font-family: sans-serif; font-weight:200; font-size: 1rem;"
                    >
                      <strong>Rajan Chandi</strong>
                    </a>
                    <a class="float-right btn btn-sm text-white btn-success">
                      Subscribe
                    </a>
                  </p>
                  <div class="clearfix"></div>
                  <span style="font-family: sans-serif; font-weight:400; font-size: 0.9rem;">Product developer & marketer with skills in programming, technology, design, digital marketing and tech leadership. Built 3 revenue generating products from scratch. Funded, hired a team, launched products and monetized them.</span>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="content" id="disqus_thread"></div>
          <!-- <form class="w-full max-w-xs">
            <div class="md:flex md:items-center mb-6"></div>
            <div class>
              <div class>
              </div>
            </div>
          </form>-->
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<style lang="css">

/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
    #main {
      margin-right: 0.75rem;
      margin-left: 0.75rem;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
    #main {
      margin-right: 1rem;
      margin-left: 1rem;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #main {
    margin-right: 3rem;
    margin-left: 3rem;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  #main {
    margin-right: 4.5rem;
    margin-left: 4.55rem;
  }
}

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    #main {
      margin-right: 6rem;
      margin-left: 6rem;
    }
    .share-sidebar {
      margin-left: 4rem;
    }
}
p {
  font-family: 'Noto Serif SC', serif;
  font-weight: medium;
  font-size: 1.05rem;
}

#postContent {
  padding: 1rem;
}
.postTitle {
  font-family: 'Noto Serif SC', serif !important;
  font-weight: 600;
  font-size: 3rem;
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
    // this.myQuillEditor.disable()
    this.post_id = this.$nuxt._route.params.id
    this.$store.dispatch('posts/GET_POST', this.post_id)

    // load disqus comments below
    /**
     *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
     *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/

    var disqus_config = function() {
      this.page.url = window.location // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = this.href.substr(this.href.lastIndexOf('/') + 1) // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    }
    ;(function() {
      // DON'T EDIT BELOW THIS LINE
      var d = document,
        s = d.createElement('script')
      s.src = 'https://lesspod.disqus.com/embed.js'
      s.setAttribute('data-timestamp', +new Date())
      ;(d.head || d.body).appendChild(s)
    })()
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
    currentPost() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.posts.currentPost
    }
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
          author: 'Rajan Chandi'
        }

        this.$axios.put('/api/post/' + this.post_id, post)
        // this.$store.commit('posts/update', post)
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
          author: this.author
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
          toolbar: false
        }
      }
    }
  }
}
</script>
