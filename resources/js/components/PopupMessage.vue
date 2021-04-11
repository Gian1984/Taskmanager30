<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
    >
      <template v-slot:activator="{ on, attrs }">

        <v-btn
            v-bind="attrs"
            v-on="on"
            small
            outlined
            rounded
            text
            color="pink darken-1"
        >
        <v-icon small>mdi-forum</v-icon>
            Message
        </v-btn>
      </template>

      <v-card
            color="blue-grey darken-1"
            dark
        >
            <v-snackbar
            class="text-center mt-4"
            :timeout="4000"
            v-model="snackbar"
            color="success"
            absolute
            centered
            rounded="pill"
            top
            >
            <v-icon class="mr-5">mdi-application-import</v-icon>
            Your message is succesfully send!
            </v-snackbar>

            <template v-slot:progress>
            <v-progress-linear
                absolute
                color="green lighten-3"
                height="4"
                indeterminate
            ></v-progress-linear>
            </template>
            <v-row>
                <v-row
                class="pa-4"
                align="center"
                justify="center"
                >
                <v-col class="text-center">
                    <h3 class="headline mt-5">
                    {{ $store.state.user.name }}
                    </h3>
                    <span class="grey--text text--lighten-1">{{ $store.state.user.email }}</span>
                </v-col>
                </v-row>
            </v-row>
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            >
            <v-container class="mt-5">
                <h3>From:</h3>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model=" $store.state.user.name "
                        :rules="nameRules"
                        filled
                        readonly
                        color="blue-grey lighten-2"
                        label="Name"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="$store.state.user.email"
                        :rules="emailRules"
                        readonly
                        filled
                        color="blue-grey lighten-2"
                        label="Email"
                        required
                        ></v-text-field>
                    </v-col>
                </v-row>
                    <h3>To:</h3>
                <v-row>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="person.name"
                        :rules="nameRules"
                        filled
                        readonly
                        color="blue-grey lighten-2"
                        label="Name"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col
                        cols="12"
                        md="6"
                    >
                        <v-text-field
                        v-model="person.email"
                        :rules="emailRules"
                        readonly
                        filled
                        color="blue-grey lighten-2"
                        label="Email"
                        required
                        ></v-text-field>
                    </v-col>

                    <v-col cols="12">
                        <v-text-field
                        v-model="message"
                        :rules="messageRules"
                        color="blue-grey lighten-2"
                        label="Message"
                        required
                        ></v-text-field> 
                    </v-col>
                </v-row>
            </v-container>
            </v-form>
            <v-divider></v-divider>
            <v-card-actions>
            
            <v-spacer></v-spacer>
            <v-btn
                color="blue-grey darken-3"
                depressed
                @click="sendMessage"
            >
                <span>Send</span>
                <v-icon left>
                    mdi-send
                </v-icon>
            </v-btn>

          </v-card-actions>
        </v-card>
    </v-menu>
  </div>
</template>

<script>

  export default {

      props:['person'],

    data () {
      return {

        

        dialog: false,
        valid:true,
        snackbar:false,
        autoUpdate: true,
        isUpdating: false,

        fav: true,
        menu: false,
        message: false,
        hints: true,

        message:'',


        nameRules: [
                v => !!v || 'Name is required',
            ],
         
            
        emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            
           

           
        messageRules:[
              v => !!v || 'Quote is required',
              v => (v && v.length <= 70) || 'Quote must be less than 70 characters',
            ],

      }

      
    },

    watch: {
      isUpdating (val) {
        if (val) {
          setTimeout(() => (this.isUpdating = false), 3000)
        }
      },
    },

    methods: {

        sendMessage(){    
            console.log(this.person)
            return this.snackbar = true;
                
        },

        remove (item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
        }, 
        

    },

      created(){
         this.$store.dispatch('getLoggedUser')
    },
    
  }
</script>