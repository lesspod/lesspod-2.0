<template>
  <div>
    <Navbar />
    <div class="container">
      <br />
      <h3>Create An Account</h3>
      <b-form v-if="show" @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="fullNameGroup"
          label="Full Name:"
          label-for="fullNameInput"
        >
          <b-form-input
            id="fullNameInput"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter name"
          />
        </b-form-group>
        <b-form-group
          id="emailInputGroup"
          label="Email address:"
          label-for="emailInput"
        >
          <b-form-input
            id="emailInput"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          />
        </b-form-group>
        <b-form-group
          id="passwordInputGroup"
          label="Password:"
          label-for="passwordInput"
        >
          <b-form-input
            id="passwordInput"
            type="password"
            required
            placeholder="Enter password"
          />
        </b-form-group>
        <b-form-group id="checkboxGroup">
          <b-form-checkbox-group id="agreeChecks" v-model="form.checked">
            <b-form-checkbox value="me">
              I've read your terms of service.
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">
          Create Account
        </b-button>
        <!-- <b-button type="reset" variant="danger">
            Reset
          </b-button> -->
      </b-form>
    </div>
    <Footer />
  </div>
</template>

<style></style>

<script>
import Navbar from '../components/NavbarBS.vue'
import Footer from '../components/Footer.vue'
export default {
  components: {
    Navbar,
    Footer
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        name: '',
        food: null,
        checked: []
      },
      foods: [
        {
          text: 'Select One',
          value: null
        },
        'Carrots',
        'Beans',
        'Tomatoes',
        'Corn'
      ],
      show: true
    }
  },
  methods: {
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
