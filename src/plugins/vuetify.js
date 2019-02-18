import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import pt from 'vuetify/es5/locale/pt'

import {
  VCard,
  VStepper
} from 'vuetify'

Vue.use(Vuetify, {
  components: {
    VStepper,
    VCard
  },
  theme: {
    primary: '#074d6e',
    secondary: '#f6b555',
    accent: '#fff9ac',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  customProperties: true,
  iconfont: 'md',
  lang: {
    locales: { pt },
    current: 'pt-br'
  }
})
