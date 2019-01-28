<template>
  <div class="border-b border-indigo-darkest bg-blue py-4 px-2">
    <div class="container mx-auto">
      <nav class="flex items-center justify-between flex-wrap">
        <div class="flex items-center flex-no-shrink text-white mr-6">
          <svg
            class="fill-current h-8 w-8 mr-2"
            width="54"
            height="54"
            viewBox="0 0 54 54"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
            />
          </svg>
          <span class="font-bold text-2xl tracking-tight"
            ><a href="/" class="no-underline text-white">Lesspod</a></span
          >
        </div>
        <div class="block sm:hidden">
          <button
            class="navbar-burger flex items-center px-3 py-2 border rounded text-white border-white hover:text-white hover:border-white"
          >
            <svg
              class="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          id="main-nav"
          class="w-full flex-grow sm:flex self-center items-center sm:w-auto hidden"
        >
          <div class="text-sm sm:flex-grow">
            <a
              href="#"
              class="no-underline font-bold block mt-4 sm:inline-block sm:mt-0 text-grey-lighter hover:text-grey-light mr-4"
              @click="navClicked('Link One')"
            >
              Link One
            </a>
            <a
              href="/post/all"
              class="no-underline font-bold block mt-4 sm:inline-block sm:mt-0 text-grey-lighter hover:text-grey-light mr-4"
            >
              Blog
            </a>
            <a
              href="#"
              class="no-underline font-bold block mt-4 sm:inline-block sm:mt-0 text-grey-lighter hover:text-grey-light mr-4"
              @click="navClicked('Link Three')"
            >
              Link Three
              <!--               <svg 
                class="self-center"
                height="20px" 
                version="1.1" 
                viewBox="0 0 20 20" 
                width="20px" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlns:xlink="http://www.w3.org/1999/xlink"><title/><desc/><g 
                  id="icon/chevron-bottom" 
                  fill="none" 
                  fill-rule="evenodd" 
                  stroke="none" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="1"><polyline 
                    id="lineart" 
                    points="20.5 7.5 11.5 16.5 2.5 7.5" 
                    stroke="#000000"/></g></svg>
 -->
            </a>
          </div>
          <div>
            <a
              href="https://github.com/lesspod/lesspod-2.0"
              target="_blank"
              class="no-underline inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal hover:bg-white lg:mt-0"
              >Github
            </a>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>
<style scoped></style>
<script>
export default {
  mounted() {
    // Get all "navbar-burger" elements
    var $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    )

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(function($el) {
        $el.addEventListener('click', function() {
          // Get the "main-nav" element
          var $target = document.getElementById('main-nav')

          // Toggle the class on "main-nav"
          $target.classList.toggle('hidden')
        })
      })
    }
  },
  methods: {
    navClicked: function(msg) {
      alert(msg)
    }
  }
}
</script>
