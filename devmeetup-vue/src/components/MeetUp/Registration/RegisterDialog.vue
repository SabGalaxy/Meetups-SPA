<template>
  <v-dialog persistent v-model="registerDialog">
    <v-btn slot="activator" color="error">
      {{ userIsRegistered ? 'Unregister' : 'Register' }}
    </v-btn>
     <v-card>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">Unregister from Meetup?</v-card-title>
            <v-card-title v-else>Register for Meetup?</v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>You can Always change your decision later on.</v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
           <v-card-actions>
               <v-btn
                class="red--text darken-1"
                flat
                @click="registerDialog = false">Cancel</v-btn>
               <v-btn
                 class="green--text darken-1"
                 flat
                 @click="onAgree">Confirm</v-btn>
           </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
      props: ['meetupId'],
      data () {
          return {                      
          registerDialog: false,
          //userIsRegistered: false //deleteme
          }
      },
      computed: {
        userIsRegistered () {
          const userGet = this.$store.getters.user
          return userGet.registeredMeetups.findIndex(meetupId => {
            return meetupId = this.meetupId
          }) >=0
          //console.log(test)
        }
      },
      methods: {
          onAgree () {
           if(this.userIsRegistered) {
              this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
            } else {
              this.$store.dispatch('registerUserForMeetup', this.meetupId)
            }
              //console.log(this.meetupId)
              this.registerDialog = false
          }
      }
  }
  
</script>