module.exports = {
  configureWebpack: {
    resolve: {
      'extensions': [
        '.js',
        '.vue',
        '.json'
      ],
      'alias': {
        'vue$': process.env.NODE_ENV == 'development' ? 'vue/dist/vue.js' : 'vue/dist/vue.min.js'
      }
    },

  },
  "transpileDependencies": [
    "vuetify"
  ]
}
