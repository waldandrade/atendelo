import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.use(Vuex)

var db = null

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: null
  },
  mutations: {
    insertEvent (state, payload) {
      state.user.events.push(payload)
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
    }
  },
  actions: {
    setDatabase ({ commit }, payload) {
      db = payload
    },
    createEvent ({ commit }, payload) {
      db.collection('events').add(payload)
        .then(
          docRef => {
            console.log(docRef)
            commit('insertEvent', docRef)
            console.log('Documento written with id', docRef.id)
          }
        )
        .catch(
          error => {
            console.log('Error adding document: ', error)
          }
        )
    },
    clearError ({ commit }) {
      commit('clearError')
    },
    signUserUp ({ commit }, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(
          user => {
            commit('setLoading', false)
            const newUser  = {
              id: user.uid,
              events: []
            }
            commit('setUser', newUser)
            // incluir os demais atributos que o usuário pode ter 
            // Como postos que administra, perfil de cliente e perfil de frentista
          }
        )
        .catch (
          error => {
            commit('setLoading', false)
            commit('setError', error)
            console.log(error)
          }
        )
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            events: []
          }
          commit('setUser', newUser)
          // incluir os demais atributos que o usuário pode ter 
          // Como postos que administra, perfil de cliente e perfil de frentista
        }
      )
      .catch (
        error => {
          commit('setLoading', false)
          commit('setError', error)
          console.log(error)
        }
      )
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    }
  }
})
