<template>
<v-container>
  <v-layout row v-if="error">
    <v-flex xs12 sm6 offset-sm3>
      <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
    </v-flex>
  </v-layout>  
  <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Acesso</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Dados do usuário</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 3" step="3">Endereço</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="4">Foto de perfil</v-stepper-step>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content step="1">
          <v-card>
            <v-card-text>
              <v-form ref="form0" v-model="valid0" lazy-validation>
                <v-container grid-list-md>
                  <v-layout align-space-around justify-center column fill-height>
                      <v-flex>
                          <v-text-field
                          v-model="cadUser.email"
                          :rules="emailRules"
                          label="E-mail"
                          type="email"
                          required
                          ></v-text-field>
                          <v-alert
                            v-model="alert"
                            type="error"
                            outline
                          >
                            <h4>E-mail já cadastrado!</h4>
                            Insira um novo e-mail.
                          </v-alert>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="Password"
                        type="password"
                        required
                        ></v-text-field>
                      </v-flex>
                      <v-flex>
                        <v-text-field
                        v-model="passwordRepeat"
                        :rules="[comparePassowords]"
                        label="Repita o Password"
                        type="password"
                        required
                        ></v-text-field>
                      </v-flex>
                    </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn 
                color="secondary" 
                :loading="loading"
                :disabled="loading"
                flat
                @click="passarFase">
                Continuar
              </v-btn>
            </v-card-actions>
          </v-card>
      </v-stepper-content>
      <v-stepper-content step="2">
          <v-card>
            <v-card-text>
              <v-form ref="form1" v-model="valid1" lazy-validation>
                <v-container grid-list-md>
                    <v-layout row wrap justify-space-between>
                      <v-flex sm6>
                          <v-text-field 
                          v-model="cadUser.nome"
                          :rules="requiredRules"
                          label="Nome"
                          required
                          ></v-text-field>
                      </v-flex>
                      <v-flex sm6>
                          <v-text-field
                          v-model="cadUser.sobrenome"
                          :rules="requiredRules"
                          label="Sobrenome"
                          required
                          ></v-text-field>
                      </v-flex>
                      <v-flex>
                          <v-text-field
                          v-model="cadUser.cpf"
                          :rules="requiredRules"
                          label="CPF"
                          mask='###.###.###-##'
                          required
                          ></v-text-field>
                      </v-flex>
                      <v-flex sm7 md3>
                        <v-text-field
                            v-model="cadUser.telefone"
                            :rules="requiredRules"
                            mask='(##)#####-####'
                            label="Telefone"
                            required
                        ></v-text-field>
                      </v-flex>

                      <v-flex sm4 lg3>
                          <v-text-field
                          v-model="cadUser.data_nascimento"
                          :rules="requiredRules"
                          label="Data de Nascimento"
                          type="date"
                          required
                          ></v-text-field>
                      </v-flex>

                      <v-flex sm6 md3 lg1>
                          <v-select 
                          :items="tSexo"
                          :rules="requiredRules"
                          v-model="cadUser.sexo"
                          label="Sexo"
                          required
                          ></v-select>
                      </v-flex>
                    </v-layout>
                </v-container>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="passarFase()">Continuar</v-btn>
            </v-card-actions>
          </v-card>
      </v-stepper-content>
      <v-stepper-content step="3">
        <v-card>
          <v-container>
            <v-layout align-center justify-center column>
              <v-form ref="form2" v-model="valid2" lazy-validation>
                <v-layout row wrap justify-space-between>
                  <v-flex sm4 md3>
                    <v-text-field 
                      @keyup="searchCep()"
                      v-model="cadUser.cep"
                      :rules="requiredRules"
                      maxlength="8"
                      label="Cep"
                      append-icon="placer"
                      mask='#####-###'
                      required
                    ></v-text-field>
                  </v-flex> 
                  <v-flex sm7 md5>   
                    <v-text-field 
                        v-model="cadUser.endereco"
                        :rules="requiredRules"
                        label="Logradouro"
                        required
                      ></v-text-field>
                  </v-flex>
                  <v-flex sm2 md3> 
                    <v-text-field
                      v-model="cadUser.numero"
                      :rules="requiredRules"
                      label="Número"
                      mask='#####'
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm9 md6> 
                    <v-text-field  
                      v-model="cadUser.complemento"
                      :rules="requiredRules"
                      label="Complemento"
                      required
                    ></v-text-field>
                  </v-flex>           
                  <v-flex sm7 md5>      
                    <v-text-field
                      v-model="cadUser.bairro"
                      :rules="requiredRules"
                      label="Bairro"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm4 md5>     
                    <v-text-field
                      v-model="cadUser.cidade"
                      :rules="requiredRules"
                      label="Cidade"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm7 md3>     
                    <v-text-field  
                      v-model="cadUser.uf"
                      :rules="requiredRules"
                      label="UF"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex sm4 md3> 
                    <v-text-field 
                      v-model="cadUser.pais"
                      :rules="requiredRules"
                      label="Pais"
                      mask=''
                      required
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-form>
            </v-layout>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="passarFase()">Continuar</v-btn>
            <v-btn color="blue darken-1" flat @click="e1 = 3">Pular</v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
      <v-stepper-content step="4">
        <v-card>
          <v-container>
            <v-layout align-center justify-center column>
              <v-layout row wrap justify-space-between>
                <v-flex sm12>
                  <a>
                    <v-img
                      :src="getImageData"
                      height="300"
                      contain
                      @click="(croppersrc === null)? $refs.imageInput.click(): cropper = true"
                      ref="previewCropper"
                    />
                  </a>
                </v-flex>
                <v-flex sm12>
                  <v-btn
                  color="primary" 
                  @click="$refs.imageInput.click()"
                  >
                    Carregar Imagem
                    <input type="file" style="display:none" accept="image/*" ref="imageInput" @input="carregarImagem">
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-layout>
            <v-dialog v-model="cropper" lazy :fullscreen="$vuetify.breakpoint.xs" :max-width="$vuetify.breakpoint.xs?'auto':'400px'" style="overflow-x: hidden">
              <cropper-image v-on:cropped="imagemCropped" :src="croppersrc" ref="cropperImage"></cropper-image>
            </v-dialog>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="e1 = 2">Voltar</v-btn>
            <v-btn color="blue darken-1" flat @click="passarFase()">Continuar</v-btn>
            <v-btn color="blue darken-1" flat @click="dialogConf = true">Pular</v-btn>
          </v-card-actions>
        </v-card>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>

  <!--modal confirmação-->
  <div class="text-xs-center">
    <v-dialog
      v-model="dialogConf"
      width="500"
    >

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Confirmação de Cadastro
        </v-card-title>

        <v-card-text>
          Estamos quase lá! Um email de confirmação foi enviado, 
          ecesse seu e-mail e click no link que foi enviado para dar procedimento ao seu cadastro.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="$root.$router.push('/login')"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="dialogErro"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline red lighten-2"
            primary-title
          >
            Erro
          </v-card-title>

          <v-card-text>
            Este e-mail já está cadastrado em nosso sistema.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialogErro = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog
        v-model="dialogEndereco"
        width="500"
      >
        <v-card>
          <v-card-title
            class="headline red lighten-2"
            primary-title
          >
            Erro
          </v-card-title>

          <v-card-text>
            Erro adicionando o endereço, por favor, tente novamente mais tarde.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              flat
              @click="dialogEndereco = false"
            >
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  </div>
  <!--fim Modal Confirmação-->

</v-container>
</template>

<script>
import CropperImage from '@/components/util/CropperImage'
import { clientesDao, pessoasDao } from '@/api'
import firebase from 'firebase/app'
import 'firebase/storage'

export default {
  components: { CropperImage },
  data: () => ({
    alert: false,
    cropper: false,
    e1: 1,
    valid0: false,
    valid1: false,
    valid2: false,
    dialogConf: false,
    croppersrc: null,
    dialogEndereco: false,
    dialogErro: false,
    id_pessoa: null,
    previewImage: null,
    imagem_perfil: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460',
    imagem: {
      url_imagem_perfil: '1'
    },
    tSexo: [
      'M',
      'F'
    ],
    cadUser: {
      checkbox: false,
      nome: '',
      sobrenome: '',
      sexo: '',
      cpf: '',
      email: '',
      cep: '',
      endereco: '',
      numero: '',
      bairro: '',
      cidade: '',
      uf: '',
      data_nascimento: '',
      complemento: '',
      telefone: '',
      url_imagem_perfil: ''
    },
    password: '',
    passwordRepeat: '',
    emailRules: [
      v => !!v || 'E-mail obrigatório!',
      v => /.+@.+/.test(v) || 'E-mail inválido'
    ],
    requiredRules: [
      v => !!v || 'Esse campo é obrigatório'
    ],
    passwordRules: [
      v => !!v || 'Insira sua senha!'
    ]
  }),
  computed: {
    comparePassowords () {
      return this.password !== this.passwordRepeat ? 'Senhas não são idênticas!' : true
    },
    getImageData () {
      return this.imagem_perfil
    },
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        if (this.e1 === 1) {
          this.e1 = 2
        }
      }
    }
  },
  methods: {
    onDismissed () {
      this.$store.dispatch('clearError')
    },
    passarFase () {
      switch (this.e1) {
        case 1:
          if (this.$refs.form0.validate()) {
            this.$store.dispatch('signUserUp', {email: this.cadUser.email, password: this.password})
          }
        case 2:
          if (this.$refs.form1.validate()) {
            pessoasDao.insert(this.cadUser).then(response => {
              if (!response.ok) {
                if (response.status === 422) {
                  this.dialogErro = true
                }
              } else {
                this.e1++
                return response.json()
              }
            }).then(json => {
              this.$store.dispatch('signUserUp', {id: json.id_pessoa})
            })
          }
          break
        case 3:
          if (this.$refs.form2.validate()) {
            pessoasDao.atualizarEndereco(this.id_pessoa, this.cadUser).then(response => {
              if (response.ok) {
                this.e1++
              } else {
                this.dialogEndereco = true
              }
            })
          }
          break
        case 4:
          this.carregarImagemFirebase()
          this.dialogConf = true
          break
      }
    },
    sendmailclienteperfil () {
      let mailperfil = {
        message: 'click no link para adicinar mais um perfil',
        assunto: 'Bem vindo a Apetrus',
        to: this.cadUser.email
      }
      clientesDao.sendmail(mailperfil, this.$root.headers).then(function (response) {
        return response.json()
      }).then(function (result) {
        console.log(result)
      })
    },
    carregarImagem (event) {
      let imagem = event.target.files[0]
      let reader = new FileReader()
      reader.onloadend = () => {
        this.croppersrc = reader.result
        this.cropper = true
      }
      if (imagem) {
        reader.readAsDataURL(imagem)
      }
    },
    sendmailcadpostocliente () {
      let mailcli = {
        message: `<!DOCTYPE html><html><head><style>.card {box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);max-width: 600px;margin: auto;text-align: center;font-family: arial;}.price {color: grey;font-size: 22px;}.card a{text-decoration: none;color: #4169E1;}.card button {border: none;outline: 0;padding: 12px;color: white;background-color: #000080;text-align: center;cursor: pointer;width: 100%;font-size: 18px;}.card button:hover {opacity: 0.7;}</style><body><h2 style="text-align:center"><img src="https://www.apetrus.com.br/_img/logop.png" alt=""></h2><div class="card"><img src="https://www.apetrus.com.br/_img/bannercli.png" alt="" style="width:100%"><h1>Parabéns!</h1><p class="price">Falta pouco para você aproveitar todas as nossas <a href="https://www.apetrus.com.br/posto.html" target="_blank">vantagens</a>.</p><p>Click em "Concluir Cadastro" para gerar sua senha de acesso ao sistema Apetrus.</p><p><a href="https://app.apetrus.com.br/userpasswordconf/?email=${this.cadUser.email}"><button>Concluir Cadastro</button></a></p></div></body></html>`,
        assunto: 'Bem vindo a Apetrus',
        to: this.cadUser.email
      }
      clientesDao.sendmail(mailcli, this.$root.headers).then(function (response) {
        return response.json()
      }).then(function (result) {
        console.log(result)
      })
    },
    carregarImagemFirebase () {
      let storageRef = firebase.storage().ref()
      let imageRef = storageRef.child(`users/avatars/${this.id_pessoa}.png`)
      imageRef.putString(this.imagem_perfil, 'data_url').then(snapshot => {
        snapshot.ref.getDownloadURL().then(downloadURL => {
          this.imagem.url_imagem_perfil = downloadURL
          pessoasDao.atualizarImagemPerfil(this.id_pessoa, this.imagem, this.$root.headers)
            .then(res => {
              if (res.ok) {
                console.log('Imagem foi upada')
              } else {
                alert('Não foi possível carregar a imagem')
              }
            })
        })
      })
    },
    searchCep () {
      fetch(`https://viacep.com.br/ws/${this.cadUser.cep}/json/`,
        {
          method: 'get',
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(res => res.json())
        .then(json => {
          this.cadUser.endereco = json.logradouro
          this.cadUser.bairro = json.bairro
          this.cadUser.cidade = json.localidade
          this.cadUser.uf = json.uf
        })
    },
    clear () {
      this.$refs.form.reset()
    },
    imagemCropped (dadosImagem) {
      this.cropper = false
      this.imagem_perfil = dadosImagem
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  scoped>
</style>
