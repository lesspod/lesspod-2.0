<template>
  <div>
    <Navbar :menus="menus"/>
    <div class="container">
      <br />
      <h3>Create An Account</h3>
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
        <span style="margin-top: 0.7rem;">If you already have an account, you can <a href="/login">Login here</a>.</span>
    </div>
    <Footer />
  </div>
</template>

<style></style>

<script>
import Navbar from '../components/NavbarBS.vue'
import Footer from '../components/Footer.vue'
import contentProcessing from '~/mixins/contentProcessing.js'
export default {
  mixins: [contentProcessing],
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      signupForm: {
        fullname: '',
        // username: '',
        email: '',
        password: '',
        checked: []
      },
      show: true
    }
  },
  methods: {
    signup() {
      // alert('Create Account. Work In Progress...')
      alert(JSON.stringify(this.signupForm))
      this.$store.dispatch('signup', {
        fullname: this.signupForm.fullname,
        username: this.signupForm.email,
        email: this.signupForm.email,
        password: this.signupForm.password
      })
    },
    onSubmit(evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      /* Reset our form values */
      this.form.email = ''
      this.form.name = ''
      this.form.food = null
      this.form.checked = []
      /* Trick to reset/clear native browser form validation state */
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
