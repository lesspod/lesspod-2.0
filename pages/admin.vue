<template>
  <div style="margin-left:2rem;">
    <Navbar :menus="menus"/>
    <div class="container">
      <h4 class="w-full text-center pt-1 pb-1">Dashboard</h4>
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
          title: 'Admin Panel'
          // component: componentName
          // visibleOnCollapse: true
        },
        {
          href: '/dashboard',
          title: 'Dashboard',
          icon: 'fas fa-tachometer-alt'
          /*
                        disabled: true
                        badge: {
                            text: 'new',
                            // class:''
                        }
                        */
        },
        {
          href: '/posts',
          title: 'Posts',
          icon: 'fas fa-file'
          /*
                        disabled: true
                        badge: {
                            text: 'new',
                            // class:''
                        }
                        */
        },
        {
          href: '/pages',
          title: 'Pages',
          icon: 'fas fa-file-alt'
          /*
                        disabled: true
                        badge: {
                            text: 'new',
                            // class:''
                        }
                        */
        },
        {
          title: 'Theme Settings',
          icon: 'fas fa-pen-nib',
          child: [
            {
              href: '#',
              title: 'Global Settings'
            },
            {
              href: '#',
              title: 'Navbar Settings'
            },
            {
              href: '#',
              title: 'Footer Settings'
            }
          ]
        },
        {
          title: 'Plugins',
          icon: 'fas fa-plug',
          child: [
            {
              href: '#',
              title: 'Google Analytics'
            },
            {
              href: '#',
              title: 'Tawk.to Widget'
            },
            {
              href: '#',
              title: 'Mailchimp Settings'
            }
          ]
        },
        {
          href: '/users',
          title: 'Users',
          icon: 'fas fa-users'
          /*
                        disabled: true
                        badge: {
                            text: 'new',
                            // class:''
                        }
                        */
        },
        {
          href: '/trash',
          title: 'Trash',
          icon: 'fas fa-trash-alt'
          /*
                        disabled: true
                        badge: {
                            text: 'new',
                            // class:''
                        }
                        */
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
