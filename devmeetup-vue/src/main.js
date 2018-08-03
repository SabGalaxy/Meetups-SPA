import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created () {
    console.log(this.$store.state.listMeetups)
    console.log(this.$store.getters.featuredMeetups)
  },
  render: h => h(App)
})
