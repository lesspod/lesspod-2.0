<template>
  <div>
    <Navbar />
    <div class="container">
      <br />
      <h3>Create An Account</h3>
      <b-form v-if="show" @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="exampleInputGroup2"
          label="Full Name:"
          label-for="exampleInput2"
        >
          <b-form-input
            id="exampleInput2"
            v-model="form.name"
            type="text"
            required
            placeholder="Enter name"
          />
        </b-form-group>
        <b-form-group
          id="exampleInputGroup1"
          label="Email address:"
          label-for="exampleInput1"
        >
          <b-form-input
            id="exampleInput1"
            v-model="form.email"
            type="email"
            required
            placeholder="Enter email"
          />
        </b-form-group>
        <b-form-group
          id="exampleInputGroup3"
          label="Password:"
          label-for="exampleInput3"
        >
          <b-form-input
            id="exampleInput3"
            type="password"
            required
            placeholder="Enter password"
          />
        </b-form-group>
        <b-form-group id="exampleGroup4">
          <b-form-checkbox-group id="exampleChecks" v-model="form.checked">
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
import Navbar from '../components/Navbar.vue'
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
