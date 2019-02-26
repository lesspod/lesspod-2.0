<template>
  <span>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">
        <img src="/icon.png" alt="Logo" style="width: 40px;margin-right:0.25rem;">
        <img src="/type.png" alt="Logo" style="height: 40px;width: auto;">
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
          <li v-for="menu in topLevelMenus" :key="menu.menuName" :class="menuClass(menu)">
            <!-- <a
              v-if="menuClass(menu) == 'nav-item'"
              class="nav-link"
              :href="menuHref(menu)"
            >{{ menu.menuName }}</a> -->
            <nuxt-link v-if="menuClass(menu) == 'nav-item'" class="nav-link" :to="{ path: menuHref(menu), params: {}}">{{ menu.menuName }}</nuxt-link>
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
        </ul>
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
              <b-form-select v-model="underMenu" :options="underMenuOptions" style="width: 50%;" size="sm"/>
              <!-- <div>Selected:
                <strong>{{ underMenu }}</strong>
              </div> -->
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
<style></style>
<script>
export default {
  props: ['menus'],
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
        value: menu.menuName, text: menu.menuName
      }))
    }
  },
  methods: {
    showNewMenuModal() {
      this.$refs.modal1.show()
    },
    hideNewMenuModal() {
      this.$refs.modal1.hide()
    },
    addMenu() {
      // var strHTML = '<li class=\"nav-item\">\r\n<a class=\"nav-link\" href=\"#\">'+ this.menuName +'<\/a>\r\n<\/li>'
      // var node = document.createRange().createContextualFragment(strHTML)
      // document.getElementById("navUl").appendChild(node)
      // this.menus.push({
      //   menuName: this.menuName,
      //   underMenu: this.underMenu,
      //   linkedTo: this.linkedTo
      // })


      var link = ""

      console.log('linkedTo: ' + this.linkedTo)

      if(this.linkedTo == ""){

        link = '/' + this.menuName.toLowerCase().toString().replace(' ', '-')

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
      linkedTo: ''
    }
  }
}
</script>
