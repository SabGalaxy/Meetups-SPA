<template>
 <v-container>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
     <h2 class="red--text">Create a new Meetup</h2>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12>
     <form @submit.prevent="onCreateMeetup">
      <v-layout row>
       <v-flex xs12 sm6 offset-sm3>
          <v-text-field
            label="Title"
            placeholder="title"
            id="title"
            v-model="title"
            required
          ></v-text-field>
       </v-flex>
      </v-layout>
      <v-layout row>
       <v-flex xs12 sm6 offset-sm3>
          <v-text-field
            label="Location"
            placeholder="location"
            id="location"
            v-model="location"
            required
          ></v-text-field>
       </v-flex>
      </v-layout>
      <v-layout row>
       <v-flex xs12 sm6 offset-sm3>
          <v-text-field
            label="Image URL"
            placeholder="imageurl"
            id="imageurl"
            v-model="imageURL"
            required
          ></v-text-field>
       </v-flex>
      </v-layout>
      <v-layout row>
       <v-flex xs12 sm6 offset-sm3>
          <v-text-field
            label="Description"
            placeholder="decription"
            id="description"
            v-model="description"
            multi-line
            required
          ></v-text-field>
       </v-flex>
      </v-layout>
      <v-layout row>
       <v-flex xs12 sm6 offset-sm3>
          <img :src="imageURL" height="150px"> 
       </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <h4>Choose the Date</h4>
    </v-flex>
  </v-layout>
  <v-layout row class="mb-2">
    <v-flex xs12 sm6 offset-sm3>
      <v-date-picker v-model="datepicker" color="green lighten-1"></v-date-picker>
      <p>{{ datepicker }}</p>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-time-picker v-model="timepicker" format="24hr"></v-time-picker>
     <p>{{ timepicker }}</p>
    </v-flex>
  </v-layout>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
     <v-btn class="red" :disabled="!formIsValid" type="submit">Create Meetup</v-btn>
    </v-flex>
  </v-layout>
  </form>
  </v-flex>
  </v-layout>
 </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      location: "",
      imageURL: "",
      description: "",
      datepicker: null,
      timepicker: null
    };
  },
  computed: {
    formIsValid() {
      return (
        this.title !== "" &&
        this.location !== "" &&
        this.imageURL !== "" &&
        this.description !== ""
      );
    }
  },
  methods: {
    onCreateMeetup() {
      if (!this.formIsValid) {
        return;
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        imageURL: this.imageURL,
        description: this.description,
        date: this.datepicker + " " + this.timepicker
      };
      alert("Send method!");
      console.log(this.title);
      this.$store.dispatch("createMeetup", meetupData);
      this.router.push("/meetups");
    }
  }
};
</script>

