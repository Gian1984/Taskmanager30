<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="270"
      offset-y
    >
      <template v-slot:activator="{ on, attrs }"> 

        <v-btn 
        depressed
        small 
        text 
        v-bind="attrs"
        v-on="on"
        >
          <span id="name">Login</span>
          <v-icon>mdi-account-check</v-icon>
        </v-btn>

      </template>

      <v-card
          id="main"
          elevation="24"
          class="text-xs-center"
        >
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            >
            <br/>
            <h4 id="title" class="title ml-3">Login</h4>

            <v-text-field
              small
              class="ml-2 mr-5"
              v-model="email"
              prepend-icon="mdi-email-outline"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>

            <v-text-field
              small
              class="ml-3 mr-5"
              v-model="password"
              prepend-icon="mdi-key"
              type="password"
              :rules="passwordRules"
              label="Password"
              required
            ></v-text-field>


             <v-alert
              class="mr-2 ml-2 "
              small
              v-if="this.$store.state.errorLog"
              type="warning"
              prominent
              icon="mdi-alert-outline"
              >
                <v-row align="center">
                  <v-col class="grow">
                      {{$store.state.errorLog}}
                  </v-col>
                  <v-col class="shrink">
                    <v-btn
                    icon
                    >
                      <v-icon
                      @click="$store.commit('resetValidation')"
                      >
                      mdi-close-circle
                      </v-icon>
                    </v-btn>
                  </v-col>
              </v-row>
            </v-alert>

            <v-divider></v-divider>
            <v-spacer></v-spacer>

            <v-btn
              id="sub"
              class="m-4"
              icon
              color="success"
              v-on:click="login"
            >
              <span>Login</span>
              <v-icon>mdi-send</v-icon>
            </v-btn>

          </v-form>
      </v-card>
    </v-menu>
  </div>
</template>

<script>


  export default {


    data: () => ({
        valid: true,
        menu: false,
           
        email: '',
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],

        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length >= 6) || 'Password must be more than 6 characters',
        ],
            
    
        
    }),

    methods:{

        login(){
            let user = {
                email: this.email,
                password: this.password,
             }

            this.$refs.form.reset()
            this.$store.dispatch('login', { user })
            .then(() => this.$router.push({ path: "/" }))
            .catch(err => console.log(err))
        },

    },
    
  }
</script>

<style scoped>
#sub{
  margin-left: 80% !important ;
}
.v-text-field label {
    font-size: 0.7em !important;
  }

</style>