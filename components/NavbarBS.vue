<template>
  <span>
    <nav class="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <!-- <img src="/icon.png" alt="Logo" style="width: 40px;margin-right:0.25rem;"> -->
        <img src="/type.png" alt="Logo" style="height: 40px;width: auto;">
        <!-- <img src="/soi.png" alt="Logo" style="height: 40px;width: auto;"> -->
      </a>
      <!-- <a class="navbar-brand" href="/">Lesspod</a> -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav" id="navUl">
          <li v-for="menu in topLevelMenus"
            :key="menu.menuName"
            :class="menuClass(menu)"
            v-show="showTopMenu(menu)">
            <a
              v-if="menuClass(menu) == 'nav-item'"
              class="nav-link"
              :href="menuHref(menu)"
            >{{ menu.menuName }}</a>
            <!-- <nuxt-link
              v-if="menuClass(menu) == 'nav-item'"
              class="nav-link"
              :to="{ path: menuHref(menu), params: {}}"
            >{{ menu.menuName }}</nuxt-link> -->
            <template v-else>
              <a
                class="nav-link b-nav-dropdown dropdown-toggle"
                href="#"
                target="_self"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>{{ menu.menuName }}</span>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <template v-for="menu1 in subMenusOf(menu)">
                  <a
                    role="menuitem"
                    class="dropdown-item"
                    :key="menu1.menuName"
                    :href="menuHref(menu1)"
                    target="_self"
                    @click="showNewMenuModal"
                    v-if="menu1.menuName == 'Menu' && menu1.underMenu == 'New'"
                  >{{ menu1.menuName }}</a>
                  <a
                    role="menuitem"
                    class="dropdown-item"
                    :key="menu1.menuName"
                    :href="menuHref(menu1)"
                    target="_self"
                    v-else
                  >{{ menu1.menuName }}</a>
                </template>
              </div>
            </template>
          </li>
          <li class="nav-item">

            <a href="#" id="appointment" class="btn btn-outline-success btn-sm "><span class="far fa-calendar-plus fa-lg"></span>&nbsp;&nbsp;Appointment</a>
          </li>

        </ul>
        <form class="form-inline my-2 my-md-0 my-sm-0 form-group has-search form-group-sm pl-2" style="width:10rem;">
          <!-- <span class="fa fa-search form-control-feedback" style="z-index:1050;"></span> -->
          <!-- <input
            class="form-control  form-control-sm mr-sm-2 col-sm-10"
            type="search"
            placeholder="Search"
            aria-label="Search"
          > -->
          <no-ssr>
            <autocomplete
              :source="posts"
              resultsDisplay="title"
              @selected="searched">
            </autocomplete>
          </no-ssr>

          <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
        </form>
        &nbsp;&nbsp;
        <span class="fab fa-facebook fa-lg"></span>
        &nbsp;<span class="fab fa-twitter-square fa-lg"></span>
        &nbsp;<span class="fab fa-linkedin fa-lg"></span>
        &nbsp;<span class="fas fa-map-marker-alt fa-lg"></span>
      </div>
    </nav>
    <b-modal id="modal1" ref="modal1" title="Add New Menu">
      <b-container fluid>
        <form class="w-full max-w-xs">
          <div class="md:flex md:items-center mb-6">
            <div class="md:w-1/3">
              <label
                class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="inline-menu-name"
              >Menu Name</label>
            </div>
            <div class="md:w-2/3">
              <input id="inline-menu-name" class type="text" value="Menu5" v-model="menuName">
            </div>
          </div>
          <div class>
            <div class>
              <label
                class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="under-menu"
              >Under Menu</label>
            </div>
            <div class>
              <!-- <input v-model="underMenu" id="under-menu" class type="text" value> -->
              <b-form-select
                v-model="underMenu"
                :options="underMenuOptions"
                style="width: 50%;"
                size="sm"
              />
              <!-- <div>Selected:
                <strong>{{ underMenu }}</strong>
              </div>-->
            </div>
          </div>
          <div class>
            <div class>
              <label
                class="block text-grey font-bold md:text-right mb-1 md:mb-0 pr-4"
                for="linked-to"
              >Linked To URL</label>
            </div>
            <div class="md:w-2/3">
              <input v-model="linkedTo" id="linked-to" class type="text" value>
            </div>
          </div>
        </form>
      </b-container>
      <div slot="modal-footer" class="w-100">
        <span
          class="float-left"
        >If the "Under Menu" is blank, the menu will be added on the top level.</span>
        <b-btn size="md" class="float-right" variant="info" @click="hideNewMenuModal">Close</b-btn>
        <b-btn
          size="md"
          class="float-right"
          style="margin-right: 0.5rem;"
          variant="success"
          @click="addMenu"
        >Add Menu</b-btn>
      </div>
    </b-modal>
  </span>
</template>
<style>
/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) and (max-width: 767.98px) {
    #mainContent {
      margin-right: 1rem;
      margin-left: 1rem;
      width: 97%;
    }
    .appointmentFooter {
      position: fixed;
      bottom: 0;
      background: #1BB886;
      color: white;
      margin: 0 auto !important;
      text-align: center !important;
      width: 100% !important;
      height: 40px;
      line-height: 40px;
    }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) and (max-width: 991.98px) {
  #mainContent {
    margin-right: 3rem;
    margin-left: 3rem;
    width: 97%;
  }
  .appointmentFooter {
      position: fixed;
      bottom: 0;
      background: #1BB886;
      color: white;
      margin: 0 auto !important;
      text-align: center !important;
      width: 100% !important;
      height: 40px;
      line-height: 40px;
    }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) and (max-width: 1199.98px) {
  .navbar-brand {
    margin-left: 4rem;
  }
}

/* // Extra large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {

    .navbar-brand {
      margin-left: 8rem;
    }
    .appointmentFooter {
      display: none;
    }
}
.has-search .form-control {
  padding-left: 2rem;
}

.has-search .form-control-feedback {
  position: absolute;
  z-index: 2;
  display: block;
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  pointer-events: none;
  color: #aaa;
}

#appointment {
  margin-top: 0.2rem;
  font-size: 0.9rem;
}

.navbar {
  margin-bottom: 10rem;
}

.autocomplete--clear {
  margin-top: -0.6rem;
}
</style>
<script>
import contentProcessing from '~/mixins/contentProcessing.js'
import Autocomplete from 'vuejs-auto-complete'
export default {
  mixins: [contentProcessing],
  components: {
    Autocomplete
  },
  computed: {
    topLevelMenus: function() {
      return this.menus.filter(function(menu) {
        if (menu.menuName !== null && menu.menuName !== undefined) {
          return !(menu.underMenu !== '')
        }
      })
    },
    underMenuOptions: function() {
      return this.menus.map(menu => ({
        value: menu.menuName,
        text: menu.menuName
      }))
    }
  },
  methods: {
    searched(selectedItem) {
      console.log(selectedItem.selectedObject._id)
      this.$router.push({ name: 'post-id', params: { id: selectedItem.selectedObject._id} })
    },
    showNewMenuModal() {
      this.$refs.modal1.show()
    },
    hideNewMenuModal() {
      this.$refs.modal1.hide()
    },
    showTopMenu(menu) {
      if(((menu.menuName == 'New') && this.isLoggedIn()) || ((menu.menuName == 'Admin') && this.isLoggedIn()))
      {
        return true
      } else if(menu.menuName != 'New' && menu.menuName != 'Admin' ) {
        return true
      } else return false
    },
    addMenu() {
      var link = ''

      console.log('linkedTo: ' + this.linkedTo)

      if (this.linkedTo == '') {
        link =
          '/' +
          this.menuName
            .toLowerCase()
            .toString()
            .replace(' ', '-')
      } else {
        link = this.linkedTo
      }
      console.log('link: ' + link)
      // var id = Math.floor(Math.random() * 100 + 10)
      // this.posts.push({ _id: id, title: this.title })
      var page = {
        // _id : Math.floor(Math.random() * 100 + 10).toString(),
        title: this.menuName,
        menuName: this.menuName,
        content: 'content for ' + this.menuName,
        author: 'Rajan Chandi'
      }
      this.$store.dispatch('pages/ADD_PAGE', page)
      console.log(JSON.stringify(page))

      var menuItem = {
        menuName: this.menuName,
        underMenu: this.underMenu,
        linkedTo: link
      }
      this.$store.dispatch('menus/ADD_MENU', menuItem)
      console.log(JSON.stringify(this.menus))
    },
    menuClass: function(menu) {
      if (this.subMenusOf(menu).length > 0) return 'nav-item dropdown '
      else return 'nav-item'
    },
    subMenusOf: function(menu1) {
      // console.log('subMenusOf 1: ' + menuName);
      return this.menus.filter(function(menu) {
        // console.log('subMenusOf 2: ' + menuName);
        if (menu.menuName !== null && menu.menuName !== undefined) {
          return menu.underMenu == menu1.menuName
        }
      })
    },
    menuHref: function(menu1) {
      if (menu1 && menu1.linkedTo && menu1.linkedTo.length > 0) {
        return menu1.linkedTo.toString()
      } else {
        return '#'
      }
    }
  },
  data: function() {
    return {
      menuName: '',
      underMenu: '',
      linkedTo: '',
      items: ["Anton", "Andrey", "Sasha", "Vladimir", "Dima"],
      selected: null
    }
  }
}
</script>
