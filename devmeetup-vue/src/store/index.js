/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        meetUps: [
        {
            imageUrl: 'https://www.seetorontonow.com/wp-content/uploads/2017/12/cn-tower-dusk.jpg', 
            id: 0, 
            title: 'Meetup in Toronto', 
            date: '2018-08-01',
            location: '',
            description: ''
        },
        {
            imageUrl: 'https://dminc.com/wp-content/uploads/2017/09/Montreal-copy.jpg', 
            id: 1, 
            title: 'Meetup in Montreal', 
            date: '2018-08-09',
            location: '',
            description: ''
        },
        {
            imageUrl: 'https://www.tripsavvy.com/thmb/Rps6KG7F6Fc1lXtcSaGZJJ3oVE4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/quebec-city-skyline-in-winter-548633225-5986417f22fa3a001072905e.jpg', 
            id: 3, 
            title: 'Meetup in Qubec City', 
            date: '2018-08-19',
            location: '',
            description: ''
        }
      ]
    },
    mutations: {
        createMeetup (state, payload) {
            return state.meetUps.push(payload)
        }
    },
    actions:{
        createMeetup ({commit}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                id: 4
            }
            //Reach out to firebase to store it
            commit('createMeetup', meetup)
        }
    },
    getters: {
        featuredMeetups: state => {
            return state.meetUps//.splice(0,5)
        },
        listMeetups: state => {
            return state.meetUps
        }
    }

})