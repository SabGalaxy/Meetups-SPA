<template>
   <v-container>
     <v-layout row wrap class="mb-2">
       <v-flex xs12 sm6 class="text-sm-right text-xs-centre">
         <v-btn large router to="/meetups"  color="blue">Explore Meetups</v-btn>
       </v-flex>
       <v-flex xs12 sm6 class="text-sm-left text-xs-centre">
         <v-btn large router to="/createmeetups"  color="blue">Organize Meetups</v-btn>
       </v-flex>
     </v-layout>
     <v-layout row wrap>
       <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
          v-for="meetup in meetups"
          :key="meetup.id"
          :src="meetup.imageUrl"
          @click.native="$router.push('/meetup/'+ meetup.id)">
          <div class="title">{{ meetup.title }}</div>
          </v-carousel-item>
        </v-carousel>
       </v-flex>
     </v-layout>
     <v-layout row wrap class="mt-2">
       <v-flex xs12 class="text-xs-center">
         <p>Join our Meetups and be happy always !!</p>
       </v-flex>
     </v-layout>
   </v-container>
</template>

<script>
  export default {
   computed: {
     meetups () {
       //return this.$store.state.meetUps
       return this.$store.getters.featuredMeetups
     }
   }
  }
</script>

<style scoped>
 .title {
   position: absolute;
   bottom: 50px;
   text-align: center;
   background-color:whitesmoke;
   font-size: 2cm;
   padding: 10px;
 }
</style>
