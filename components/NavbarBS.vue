<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
    <ul class="navbar-nav" id="navUl">
      <li v-for="menu in topLevelMenus" :key="menu.menuName" :class="menuClass(menu)">
        <a v-if="menuClass(menu) == 'nav-item'" class="nav-link" href="#">{{ menu.menuName }}</a>
        <template v-else>
          <a class="nav-link b-nav-dropdown dropdown-toggle" href="#" target="_self" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span>{{ menu.menuName }}</span>
          </a>
          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <a role="menuitem" v-for="menu1 in subMenusOf(menu)" :key="menu1.menuName" class="dropdown-item" href="#" target="_self">{{ menu1.menuName }}</a>
          </div>
        </template>
      </li>
      <!-- <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Pricing</a>
      </li> -->
      <li class="nav-item dropdown">
        <a class="nav-link b-nav-dropdown dropdown-toggle" href="#" target="_self" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <span>Dropdown link</span>
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a role="menuitem" class="dropdown-item" href="#" target="_self">Action</a>
          <a role="menuitem" class="dropdown-item" href="#" target="_self">Another action</a>
          <a role="menuitem" class="dropdown-item" href="#" target="_self">Something else here</a>
        </div>
      </li>
    </ul>
  </div>
</nav>
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
    }
  },
  methods: {
    addMenu: function(){
      document.getElementById("navbarNavDropdown").appendChild('<li class=\"nav-item\">\r\n        <a class=\"nav-link\" href=\"#\">NEW MENU<\/a>\r\n      <\/li>')
    },
    menuClass: function(menu) {
      if(this.subMenusOf(menu).length > 0)
      return 'nav-item dropdown '
      else return 'nav-item'
    },
    subMenusOf: function(menu1) {
      // console.log('subMenusOf 1: ' + menuName);
      return this.menus.filter(function(menu) {
        // console.log('subMenusOf 2: ' + menuName);
        if (menu.menuName !== null && menu.menuName !== undefined) {
          return (menu.underMenu == menu1.menuName)
        }
      });
    }
  },
  data: function(){
    return {
    }
  }
}
</script>
