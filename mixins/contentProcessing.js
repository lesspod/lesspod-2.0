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
      return this.$store.state.posts.myPosts
    },
    blogs(){
      
        return this.$store.state.posts.blogs
      
    }
  },
  methods: {
    aCommonMethod: function() {
      console.log('A common method')
    },
    isLoggedIn:  function(){
      
        // if(this.$store.state.authUser && this.$store.state.authUser.username) {
        //   // console.log("dispatching get my posts")
        //   // await dispatch('posts/GET_MY_POSTS');
        //   return true;
        // }else {
        //   return false;
        // }

        if(this.$store.state.auth && this.$store.state.auth.token){
          return true;
        } else{
          return false;
        }
      
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
