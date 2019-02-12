<template>
  <div>
    <Navbar :menus="menus"/>
    <div class="container">
      <h4 class="w-full text-center pt-1 pb-1">Admin Panel</h4>
      <no-ssr>
        <sidebar-menu :menu="sidebarMenu"/>
      </no-ssr>
    </div>

    <Footer/>
  </div>
</template>

<style></style>

<script>
import Navbar from '../components/NavbarBS.vue'
import Footer from '../components/Footer.vue'
// import { SidebarMenu } from 'vue-sidebar-menu'
export default {
  components: {
    Navbar,
    Footer
  },
  computed: {
    menus() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.menus.menuItems
    },
    posts() {
      // return this.$store.state.menus.menuItems
      return this.$store.state.posts.posts
    }
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
      show: true,
      sidebarMenu: [
        {
          header: true,
          title: 'Main Navigation'
          // component: componentName
          // visibleOnCollapse: true
        },
        {
          href: '/',
          title: 'Dashboard',
          icon: 'fas fa-user'
          /*
                        disabled: true
                        badge: {
                            text: 'new',
                            // class:''
                        }
                        */
        },
        {
          title: 'Charts',
          icon: 'fas fa-chart-area',
          child: [
            {
              href: '/charts/sublink',
              title: 'Sub Link'
            }
          ]
        }
      ]
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
