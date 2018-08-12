/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadedMeetups: [
        {
            imageUrl: 'https://www.seetorontonow.com/wp-content/uploads/2017/12/cn-tower-dusk.jpg', 
            id: '0', 
            title: 'Meetup in Toronto', 
            date: new Date(),
            location: 'Toronto',
            description: 'A Vuejs tutorial meetup'
        },
        {
            imageUrl: 'https://dminc.com/wp-content/uploads/2017/09/Montreal-copy.jpg', 
            id: '1', 
            title: 'Meetup in Montreal', 
            date: new Date(),
            location: '',
            description: 'A coffee meetup in the heart of the city'
        },
        {
            imageUrl: 'https://www.tripsavvy.com/thmb/Rps6KG7F6Fc1lXtcSaGZJJ3oVE4=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/quebec-city-skyline-in-winter-548633225-5986417f22fa3a001072905e.jpg', 
            id: '3', 
            title: 'Meetup in Qubec City', 
            date: new Date(),
            location: '',
            description: 'A Veux and Vuetify tutorial meetup'
        }
      ],
      user: null,
      loading: false,
      error: null
    },
    mutations: {
        registerUserForMeetup (state, payload) {
            const id = payload.id
            if(state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >=0) {
                return
            }
            state.user.registeredMeetups.push(id)
            state.user.fbkeys[id] = payload.fbkey
        },
        unregisterUserFromMeetup (state, payload) {
            const registeredMeetups = state.user.registeredMeetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbkeys, payload)
        },
        createMeetup (state, payload) {
            return state.loadedMeetups.push(payload)
        },
        updateMeetup (state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if(payload.title) {
                meetup.title = payload.title
            }
            if(payload.description) {
                meetup.description = payload.description
            }
            if(payload.date) {
                meetup.date = payload.date
            }
        },
        setUser (state, payload) {
            state.user = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        clearError (state) {
            state.error = null
        },
        setLoadedmeetups (state, payload) {
            state.loadedMeetups = payload
        }
    },
    actions:{
        registerUserForMeetup ({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registrations/')
            .push(payload)
            .then((data) => {
                commit('setLoading', false)
                commit('registerUserForMeetup', {id: payload, fbkey: data.key})
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        unregisterUserFromMeetup ({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            if(!user.fbkeys) {
                return
            }
            const fbKey = user.fbkeys[payload]
            //console.log(fbKey)
            firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
                     .remove()
                     .then(() => {
                         commit('setLoading', false)
                         commit('unregisterUserFromMeetup', payload)
                     })
                     .catch(error => {
                         console.log(error)
                         commit('setLoading', false)
                     })
        },
        loadMeetups ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                     .then((data) => {
                        const meetups = []
                        const obj = data.val()
                        for (let key in obj) {
                            meetups.push({
                                id: key,
                                title: obj[key].title,
                                description: obj[key].description,
                                imageUrl: obj[key].imageUrl,
                                date: obj[key].date,
                                location: obj[key].location,
                                creatorId: obj[key].creatorId
                            })
                        }
                        commit('setLoadedmeetups', meetups)
                        commit('setLoading', false)
                     }) 
                     .catch(
                         (error) => {
                             console.log(error)
                             commit('setLoading', true)
                         }
                     )
        },
        createMeetup ({commit, getters}, payload) {
            commit('setLoading', true)
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                creatorId: getters.user.id,
                description: payload.description,
                date: payload.date,
            }
            //Reach out to firebase to store it
            let key
            let imageUrl
            firebase.database().ref('meetups').push(meetup)
                    .then((data) => {
                        key = data.key
                        return key
                    })
                    .then(key => {
                        const filename = payload.image.name
                        const ext = filename.slice(filename.lastIndexOf('.'))
                        return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
                    })
                    .then(fileData => {
                        let imagePath = fileData.metadata.fullPath
                        //imageUrl = fileData.metadata.downloadUrls[0]
                        //console.log(imageUrl)
                        return firebase.storage().ref().child(imagePath).getDownloadURL()
                        //return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
                    })
                    .then(url => {
                        imageUrl = url
                        return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
                    })
                    .then(() => {
                        commit('createMeetup', {
                            ...meetup,
                            id: key,
                            imageUrl: imageUrl
                        })
                        commit('setLoading', false)
                    })
                    .catch((error) =>{
                        console.log(error)
                    })
        },
        updateMeetupData({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if(payload.title) {
                updateObj.title = payload.title
            }
            if(payload.description) {
                updateObj.description = payload.description
            }
            if(payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
                    .then(() => {
                        commit('setLoading', false)
                        commit('updateMeetup', payload)
                    })
                    .catch(error => {
                        commit('setLoading', false)
                    })
        },
        signUserUp ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                    .then(
                        user => {
                            commit('setLoading', false)
                            const newUser = {
                                id: firebase.auth().currentUser.uid,
                                //id: User.uid,
                                registeredMeetups: [],
                                fbkeys: {}
                            }
                            commit('setUser', newUser)
                        }
                    )
                    .catch(
                        error => {
                            commit('setLoading', false)
                            commit('setError', error)
                            console.log(error)
                        }   
                    )
                 },
        signUserIn ({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                    .then(
                        user => {
                            commit('setLoading', false)
                            const newUser = {
                                id: firebase.auth().currentUser.uid,
                                registeredMeetups: [],
                                fbkeys: {}
                            }
                            commit('setUser', newUser)
                        }
                    )
                    .catch(
                        error => {
                            commit('setLoading', false)
                            commit('setError', error)
                            console.log(error)
                        }
                    )
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {
                id: payload.uid, 
                registeredMeetups:[],
                fbkeys: {}
            })
        },
        fetchUserData({commit, getters}) {
            commit('setLoading', true)
           console.log('userid= '+ getters.user.id)
            firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
                    .then(data => {
                        const dataPairs = data.val()
                        //console.log(dataPairs)
                        let registeredMeetups = []
                        let swappedPairs = {}
                        for(let key in dataPairs) {
                            registeredMeetups.push(dataPairs[key])
                            swappedPairs[dataPairs[key]] = key
                        }
                        console.log('reg meetups' + registeredMeetups)
                        console.log(swappedPairs)
                        const updateUser = {
                            id: getters.user.id,
                            registeredMeetups: registeredMeetups,
                            fbkeys: swappedPairs
                        }
                        commit('setLoading', false)
                        commit('setUser', updateUser)
                        console.log(updateUser)
                    })
                    .catch(error => {
                        console.log(error)
                        commit('setLoading', false)
                    })
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError ({commit}) {
            commit('clearError')
        }
    
    },
    getters: {
       loadedMeetups (state) {
           return state.loadedMeetups.sort((meetupA,meetupB) => {
               return meetupA.date < meetupB.date
           })
       },
       featuredMeetups (state, getters) {
            return getters.loadedMeetups.slice(0,5)
       },
       loadedMeetup (state) {
        return (meetupId) => {
          return state.loadedMeetups.find((meetup) => {
            return meetup.id === meetupId
          })
        }
       },
        user (state) {
           return state.user    
       },
        loading (state){
            return state.loading
       },
        error (state) {
           return state.error
       }
   }
})
