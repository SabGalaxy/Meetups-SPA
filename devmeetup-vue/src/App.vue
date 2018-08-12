<template>
 <div id="app">
  <v-app>
    <v-navigation-drawer temporary fixed v-model="drawer" app>
      <v-list dense>
        <v-list-tile v-for="item in menuItems" :key="item.tile" :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Logout</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile>
          <v-list-tile-action>
            <v-icon>contact_mail</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>Contact</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="red" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
       <router-link to="/" tag="span" style="cursor: pointer">Dev Meetups</router-link> 
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.tile" :to="item.link" class="mt0">
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
    <v-container fluid>
      <router-view></router-view>
    </v-container>
  </v-content>
    <v-footer color="black" app inset>
      <span class="white--text">&copy; 2018 SplashAI Powered By Rajath, Samir and Sabarish</span>
    </v-footer>
  </v-app>
</div>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
    }
  },
  computed: {
    menuItems () {
        let menuItems = [
        { icon: 'face', title: 'Sign up', link: '/signup'},
        { icon: 'lock_open', title: 'Sign In', link: '/signin'},
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
         { icon: 'supervisor_account', title: 'View Meetups', link: '/meetups'},
        { icon: 'room', title: 'Organize Meetups', link: '/createmeetups'},
        { icon: 'person', title: 'Profile', link: '/profile'},
        ]
      }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  },
  name: 'app'
}
</script>
