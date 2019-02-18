<template>
  <v-container fluid class="pa-0">   
    <v-layout row v-if="error">
      <v-flex xs12 sm6 offset-sm3 class="form-error">
        <app-alert @dismissed="onDismissed"  :text="error.message"></app-alert>
      </v-flex>
    </v-layout>  
      <div v-if="$vuetify.breakpoint.xs">
        <v-layout row >
          <v-flex xs12 class="form-flex">
            <img class="banner" :src="require('@/assets/banner.svg')" alt="Apetrus banner"/>
            <div class="text-xs-center">
                <img class="logo"  :src="require('@/assets/logomarca.png')" alt="Apetrus logomarca"/>
            </div>
           
                <v-form class="form m-auto"
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                    v-model="login.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="login.password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                    ></v-text-field>

                    <v-alert
                    v-model="loginErro"
                    type="error"
                    outline
                    >
                    <h4>Atenção!</h4>
                    {{errorMessage}}
                    </v-alert>

                     <div>
                        <v-btn
                            block
                            round
                            dark
                            :loading="loading"
                            :disabled="loading"
                            color="secondary"
                            class="white--text btnLogin"
                            @click="fazerLogin"
                            >
                            Login
                        </v-btn>
                    </div>

                    <div class="cadastro">
                        <span>Não tem Cadastro? <a @click="dialogCad=true">Cadastre-se</a></span>
                    </div>  
                    
                </v-form>
            </v-flex>          
        </v-layout>
         <div class="curva">
            <img class="imgCurva" :src="require('@/assets/curvainferior.svg')" alt="Apetrus curva"/>
        </div>
      </div>
   <template>
      <div v-if="!$vuetify.breakpoint.xs">          
        <div class="onda">
            <img class="imgOnda" :src="require('@/assets/ondulacao.svg')" alt="Apetrus onda"/>
        </div>
         
    <v-layout row>  
        <v-flex lg4 md5 sm5 class="ml-5 titulo form-flex">
            <div class="text-xs-left">
                <img class="logo"  :src="require('@/assets/logomarca.png')" alt="Apetrus logomarca"/>
            </div>

            <div class="texto">
            <div class=" headline blue--text darken-4">Crie conosco</div>
            <div  style="color:#074d6e" class="font-weight-medium display-1 ">Uma nova experiência em abastecimento</div>
            </div>
           

             <v-form class="form"
                    ref="form"
                    v-model="valid"
                    lazy-validation
                >
                    <v-text-field
                    v-model="login.email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="login.password"
                    :rules="passwordRules"
                    label="Password"
                    type="password"
                    required
                    ></v-text-field>

                     <v-alert
                    v-model="loginErro"
                    type="error"
                    outline
                    >
                    <h4>Atenção!</h4>
                    {{errorMessage}}
                    </v-alert>

                     <div>
                        
                        <v-btn
                            block
                            round
                            :loading="loading"
                            :disabled="loading"
                            color="secondary"
                            class="white--text btnLogin"
                            @click="fazerLogin()"
                            >
                            Login
                        </v-btn>
                       
                    </div>

                </v-form>

                <div class="cadastro">
                    <span>Não tem Cadastro? <a @click="dialogCad=true">Cadastre-se</a></span>
                </div>

        </v-flex>

        <v-flex lg8 md7 sm7  class="tablet pa-4" justify-center align-center>
            <v-layout align-center justify-end row>
                <img align-self-center class="imgTablet" :src="require('@/assets/smartphone.svg')" alt="Apetrus tablet"/>
            </v-layout>
        </v-flex>
        
    </v-layout>
    
      </div>
   </template>


<!----------------------dialog cadastro-------------------------->
<v-dialog lazy v-model="dialogCad" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="#074d6e">
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="dialogCad = false">Voltar</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>

            <v-container>
              <div class="text-xs-left">
                <img class="logopequeno"  :src="require('@/assets/logomarca.png')" alt="Apetrus logomarca"/>
              </div>

              <div class="texto">
                <div class=" headline blue--text darken-4">Vamos começar?</div>
                <div  style="color:#074d6e" class="font-weight-medium display-1 ">Aproveite todas as vantagens de um cliente Apetrus!</div>
              </div>
            </v-container>
        </v-list>

        <v-divider></v-divider>
        <v-list three-line subheader>
          
          <Cadusuario></Cadusuario>

        </v-list>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import firebase from 'firebase/app'
import 'firebase/auth'
import Cadusuario from '@/components/cadastros/Cadusuario'
export default {
  components: { Cadusuario },
  data: () => ({
    dialogCad: false,
    loginErro: false,
    errorMessage: '',
    valid: true,
    login: {
      email: '',
      password: '',
      tipo: ''
    },
    emailRules: [
      v => !!v || 'Insira seu E-mail!'
    ],
    passwordRules: [
      v => !!v || 'Insira sua senha!'
    ]
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined && value.pessoa) {
        this.$router.push('/home')
      }
    }
  },
  methods: {
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    fazerLogin () {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('signUserIn', {email: this.login.email, password: this.login.password})
      }
    }
  }
}
</script>
<style>

.banner{
    width: 100%;
}
.logo {
    width: 30%;
}

.form{
   width: 80%;
   z-index: 2;
   position: relative;
}

.m-auto{
    margin: auto;
}

.curva{
    width: 100%;    
}

.onda{
    width: 100%;
}

.tablet{
    width: 100%;
    z-index: 2;
}

.imgCurva{
    z-index: 1;
    position: absolute;
    right: 0;
    bottom: 0;
}

.imgOnda{
    z-index: 1;
    position: absolute;
    right: 0;
    bottom: 0;
}

.imgTablet{
    width: 100%;
}

.cadastro * {
  font-size: 90%;
}

.logopequeno {
    width: 7%;
}

.form-flex:first-child, .form-error:first-child {
  z-index: 2;
}

@media screen and (min-width: 601px) {
  .imgOnda{
    width: 100%;
  }
}

</style>
