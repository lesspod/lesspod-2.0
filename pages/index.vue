<template>
  <div>
    <Navbar :menus="menus"/>
    <div id="mainContent" class="container container-fluid">
      <span v-html="currentPage.content" v-show="!isLoggedIn()"></span>
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
      ></div>
      <br>
      <!-- <span>{{ currentPage }}</span> -->
      <div class="md:flex md:items-center" v-show="isLoggedIn()">
        <div class>
          <button class="btn btn-primary" type="button" @click="savePage">Save Page</button>
        </div>
      </div>

      <div>
        <br>
        <hr>
        <b-form @submit.prevent>
          <b-form-group id="loginEmailGroup" label="Email address:" label-for="loginEmailInput">
            <b-form-input
              id="loginEmailInput"
              type="email"
              v-model="loginForm.email"
              required
              placeholder="Enter email"
            />
          </b-form-group>

          <b-form-group id="loginPasswordInput" label="Password:" label-for="loginPasswordInput">
            <b-form-input
              id="loginPasswordInput"
              type="password"
              v-model="loginForm.password"
              required
              placeholder="Enter password"
            />
          </b-form-group>
          <b-button type="submit" variant="primary" @click="login()">Login</b-button>
        </b-form>
        <br>
        <hr>
        <b-form @submit.prevent>
          <b-form-group
            id="signupFullnameInputGroup"
            label="Full Name:"
            label-for="signupFullnameInput"
            description="Fullname should be 4 letters or more."
          >
            <b-form-input
              id="signupFullnameInput"
              type="text"
              v-model="signupForm.fullname"
              required
              placeholder="First Last"
            />
          </b-form-group>

          <b-form-group
            id="signupEmailInputGroup"
            label="Email address:"
            label-for="signupEmailInput"
            description="We'll never share your email with anyone else. 4 letters or more."
          >
            <b-form-input
              id="signupEmailInput"
              type="email"
              v-model="signupForm.email"
              required
              placeholder="Email"
            />
          </b-form-group>

          <b-form-group
            id="signupPasswordInputGroup"
            label="Password:"
            label-for="signupPasswordInput"
            description="Your password must be 8-20 characters long, contain letters and numbers, and must not
            contain spaces, special characters, or emoji."
          >
            <b-form-input
              id="signupPasswordInput"
              type="password"
              v-model="signupForm.password"
              required
              placeholder="Password"
            />
          </b-form-group>
          <b-button type="submit" variant="primary" @click="signup()">Create Account</b-button>
        </b-form>
      </div>
    </div>
    <Footer/>
  </div>
</template>
<style lang="scss">
/* Extra small devices (portrait phones, less than 576px) */
@media (max-width: 575.98px) {
    #mainContent {
      margin-right: 0.75rem;
      margin-left: 0.75rem;
      width: 97%;
    }
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
    #mainContent {
      margin-right: 1rem;
      margin-left: 1rem;
      width: 97%;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #mainContent {
    margin-right: 3rem;
    margin-left: 3rem;
    width: 97%;
  }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  #mainContent {
    margin-right: 4.5rem;
    margin-left: 4.55rem;
    width: 80%;
  }
  .navbar-brand {
    margin-left: 4rem;
  }
}

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
    #mainContent {
      margin-right: 1rem;
      margin-left: 12rem;
      width: 70%;
    }
    .navbar-brand {
      margin-left: 8rem;
    }
}
#mainContent {
  margin: 0 auto;
  padding: 4rem 0;
  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }
}
.container-fluid {
  padding-right: 4rem;
  padding-left: 4rem;
  margin-right: auto;
  margin-left: auto;
}

p {
  font-family: 'Lustria', Serif !important;
  font-weight: medium;
  font-size: 1rem;
  margin-block-end: 0rem;
  margin-bottom: 0rem;
}
</style>
<script type="text/javascript">
import Navbar from '~/components/NavbarBS.vue'
import Footer from '~/components/Footer.vue'
import { mapFields, mapMultiRowFields } from 'vuex-map-fields'
import contentProcessing from '~/mixins/contentProcessing.js'
// import hljs from 'highlight.js'
export default {
  mixins: [contentProcessing],
  components: {
    Navbar,
    Footer
  },
  created() {
    this.currentPage =
      // make a copy of the current page to local variable
      JSON.parse(
        JSON.stringify(
          this.$store.state.pages.pages.filter(function(page) {
            //console.log(page.menuName.toLowerCase())
            return (
              page.menuName
                .toLowerCase()
                .toString()
                .replace(' ', '-')
                .valueOf() == 'home'
            )
          })[0]
        )
      )
  },
  mounted() {
    console.log('app init, my quill instance object is:', this.myQuillEditor)
    console.log(
      'JSON.stringify(this.currentPage)' + JSON.stringify(this.currentPage)
    )
    // this.content = JSON.stringify(this.currentPage.content).toString()
  },
  computed: {
    pageData() {
      return this.$store.state.pages.pages.filter(function(page) {
        console.log(page.menuName.toLowerCase())
        return (
          page &&
          page.menuName &&
          page.menuName
            .toLowerCase()
            .toString()
            .replace(' ', '-')
            .valueOf() == 'home'
        )
      })
    },
    pageContent() {
      // return this.$nuxt._route.params.slug
      return this.currentPage.content
    }
  },
  methods: {
    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },
    onEditorChange({ editor, html, text }) {
      console.log('editor change!', editor, html, text)
      this.currentHTML = html
    },
    savePage() {
      if (this.currentPage.content !== this.currentHTML) {
        this.currentPage.content = this.currentHTML
        this.$store.dispatch('pages/UPDATE_PAGE', this.currentPage)
      }
    },
    login() {
      // alert('Login. Work In Progress...')
      this.$store.dispatch('login', {
          username: this.loginForm.email,
          password: this.loginForm.password
      })
    },
    signup() {
      // alert('Create Account. Work In Progress...')
      alert(JSON.stringify(this.signupForm))
      this.$store.dispatch('signup', {
        fullname: this.signupForm.fullname,
        username: this.signupForm.email,
        email: this.signupForm.email,
        password: this.signupForm.password
      })
    }
  },
  asyncData(context) {
    // called every time before loading the component
    // as the name said, it can be async
    // Also, the returned object will be merged with your data object
    return {
      loginForm: {
        username: '',
        password: '',
        checked: []
      },
      signupForm: {
        fullname: '',
        // username: '',
        email: '',
        password: '',
        checked: []
      },
      show: true,
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
    // store.dispatch('posts/GET_POSTS')
    // await store.dispatch('pages/GET_PAGES')
  }
}
</script>
