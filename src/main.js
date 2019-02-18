import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import firebase from 'firebase/app'
import AlertComp from '@/components/util/Alert'

Vue.config.productionTip = false

Vue.component('app-alert', AlertComp)

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyB2d1A6gltoLcpo20D-y4ZnhuUdMRYE4Nc',
      authDomain: 'i9fila.firebaseapp.com',
      databaseURL: 'https://i9fila.firebaseio.com',
      projectId: 'i9fila',
      storageBucket: 'i9fila.appspot.com',
      messagingSenderId: '957753652684'      
    })

    firebase.firestore().enablePersistence()
      .then(() => {
        var db = firebase.firestore()
        this.$store.dispatch('setDatabase', db)
      })
      .catch(error => {
        if (error.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled
          // in one tab at a a time.
          // ...
          console.log('Feche uma das abas para habilitar a persistencia')
        } else if (error.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence
          // ...
          console.log('Este browser ainda não está habilitado a trabalhar com persistência')
        }
      })
  }
}).$mount('#app')
