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
    }
  },
  methods: {
    aCommonMethod: function() {
      console.log('A common method')
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
