<template>
  <v-container>
   <v-layout row wrap v-for="meetup in meetups" :key="meetup.id" class="mb-2">
    <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
     <v-card color="blue-grey light-2" class="white--text">
      <v-container fluid>
       <v-layout xs5>
        <v-flex xs5 sm4 md3>
         <v-card-media class="white--text elevation-20" height="130px" :src="meetup.imageUrl">
          </v-card-media>
        </v-flex>
        <v-flex xs7 sm8 md3>
         <v-card-title primary-title>
          <div>
           <h3 class="white--text" mb0>{{ meetup.title }}</h3>
            <div>{{ meetup.date | date }}</div>
          </div>
         </v-card-title>
          <v-card-actions>
           <v-btn flat :to="'/meetup/'+meetup.id">
            <v-icon left light>arrow_forward</v-icon>
              View Meetups
           </v-btn>
          </v-card-actions>
    </v-flex>
    </v-layout>
     </v-container>
      </v-card>
     </v-flex>
      </v-layout>
  </v-container>
</template>


<script>
export default {
 computed: {
  meetups () {
    //return this.$store.state.meetUps
    return this.$store.getters.loadedMeetups
    }
 }
}
</script>