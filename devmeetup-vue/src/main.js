import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import DateFilter from './filters/date'
import AlertCom from './components/Shared/Alert.vue'
import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetUpDateDialog from './components/Meetup/Edit/EditMeetUpDateDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.filter('date', DateFilter)
Vue.component('app-alert', AlertCom)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetUpDateDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCgv6-VDmjIYFRDqVX0erQF5h0DtzaBacY',
      authDomain: 'devmeetups-cbf6f.firebaseapp.com',
      databaseURL: 'https://devmeetups-cbf6f.firebaseio.com',
      projectId: 'devmeetups-cbf6f',
      storageBucket: 'gs://devmeetups-cbf6f.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
        this.$store.dispatch('fetchUserData')
      }
    })
    this.$store.dispatch('loadMeetups')
    // console.log(this.$store.getters.loadedMeetups)
    // console.log(this.$store.getters.featuredMeetups)
    // console.log(this.$store.getters.loadedMeetup)
  }
})
