export default {
  created: function() {
    // console.log('Created from Mixin!')
  },
  computed: {
    menus() {
      return this.$store.state.menus.menuItems
    },
    posts() {
      // console.log('posts() in contentProcessing.js')
      return this.$store.state.posts.posts
    },
    pages() {
      return this.$store.state.pages.pages
    },
    myPosts(){
      if(this.$store.state.authUser.token)
      return this.$store.state.posts.myPosts
    },
    blogs(){
        return this.$store.state.posts.blogs
    },
    currentUser(){
      if(isLoggedIn()){
        return this.$store.state.authUser;
      } else {
        return null;
      }
    }
  },
  methods: {
    aCommonMethod: function() {
      console.log('A common method')
    },
    isLoggedIn:  function(){

      console.log('in content Processing isLoggedin() method');
        if(this.$store.state.authUser && this.$store.state.authUser.token) {
          console.log('logged in')
          return true;
        }else {
          console.log('log out')
          return false;
        }

        // if(this.$store.state.auth && this.$store.state.auth.token){
        //   return true;
        // } else{
        //   return false;
        // }
      
    },
    html2text(html) {
      if(html) {
        html = html.replace(/<\s*br\/*>/gi, '\n')
        html = html.replace(
          /<\s*a.*href="(.*?)".*>(.*?)<\/a>/gi,
          ' $2 (Link->$1) '
        )
        html = html.replace(/<\s*\/*.+?>/gi, '\n')
        html = html.replace(/ {2,}/gi, ' ')
        html = html.replace(/\n+\s*/gi, '\n\n')
      }
      return html
    }
  }
}
