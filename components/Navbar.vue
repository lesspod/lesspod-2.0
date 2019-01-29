<template>
  <div>
    <b-navbar type="light" variant="light" toggleable>
      <b-navbar-brand href="/">
        Lesspod
      </b-navbar-brand>
      <b-navbar-toggle target="nav_dropdown_collapse" />
      <b-collapse id="nav_dropdown_collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/">
            Home
          </b-nav-item>
          <b-nav-item href="/post/all">
            Blog
          </b-nav-item>
          <b-nav-item href="/post/new">
            Add Post
          </b-nav-item>
          <b-nav-item href="#">
            Link
          </b-nav-item>
          <!-- Navbar dropdowns -->
          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">
              EN
            </b-dropdown-item>
            <b-dropdown-item href="#">
              ES
            </b-dropdown-item>
            <b-dropdown-item href="#">
              RU
            </b-dropdown-item>
            <b-dropdown-item href="#">
              FA
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="User" right>
            <b-dropdown-item href="#">
              Account
            </b-dropdown-item>
            <b-dropdown-item href="#">
              Settings
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<style></style>
<script></script>
