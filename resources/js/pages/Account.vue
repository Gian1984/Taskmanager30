<template>
  <div class="account">
      <h1 class="title mb-3">Account</h1>
     
        <v-card
            color="blue-grey darken-1"
            dark
        >
            <v-snackbar
            class="text-center"
            :timeout="4000"
            v-model="snackbar"
            color="success"
            absolute
            right
            rounded="pill"
            top
            >
            <v-icon class="mr-5">mdi-face</v-icon>
            Your account is succesfully update!
            </v-snackbar>

            <template v-slot:progress>
            <v-progress-linear
                absolute
                color="green lighten-3"
                height="4"
                indeterminate
            ></v-progress-linear>
            </template>
            <v-img
            height="200"
            src="https://cdn.vuetifyjs.com/images/cards/dark-beach.jpg"
            >
            <v-row>
                <v-row
                class="pa-4"
                align="center"
                justify="center"
                >
                <v-col class="text-center">
                    <h3 class="headline mt-5">
                    {{ user.name }}
                    </h3>
                    <span class="grey--text text--lighten-1">{{ user.email }}</span>
                </v-col>
                </v-row>
            </v-row>
            </v-img>
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            >
            <v-container class="mt-5">
                <v-row>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                    :disabled="isUpdating"
                    v-model="user.name"
                    :rules="nameRules"
                    filled
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
                    v-model="user.email"
                    :disabled="isUpdating"
                    :rules="emailRules"
                    filled
                    color="blue-grey lighten-2"
                    label="Email"
                    required
                    ></v-text-field>
                </v-col>

                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                    text-transform: uppercase
                    v-model="user.roles"
                    :rules="[v => !!v || 'Role is required']"
                    filled
                    color="blue-grey lighten-2"
                    label="Role"
                    required
                    ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    md="6"
                >
                    <v-text-field
                    v-model="user.author"
                    :rules="authorRules"
                    filled
                    color="blue-grey lighten-2"
                    label="Author"
                    required
                    ></v-text-field>
                </v-col>

                <v-col cols="12">
                    <v-text-field
                    v-model="user.quote"
                    :rules="quoteRules"
                    filled
                    color="blue-grey lighten-2"
                    label="Quote"
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
                @click="updateUser(user)"
            >
                <v-icon left>
                mdi-update
                </v-icon>
                Update Now
            </v-btn>
  
            <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
            >
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                class="ml-2"
                color="blue-grey darken-3"
                depressed
                v-bind="attrs"
                v-on="on"
                >
                <v-icon left>
                mdi-trash-can-outline
                </v-icon>
                Delete Account
                </v-btn>
            </template>
            <v-card>
                <v-card-title class="headline">
                    <v-icon left>
                mdi-alert
                </v-icon>
                Attention!
                </v-card-title>
                    <v-card-text>
                        This operation will erase all data and is irreversible. 
                        Do you want to proceed ?
                    </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue-grey darken-3"
                    text
                    @click="dialog = false"
                >
                <v-icon left>
                mdi-close
                </v-icon>
                    No
                </v-btn>
                <v-btn
                    color="blue-grey darken-3"
                    text
                    @click="deleteUser(user)"
                >
                <v-icon left>
                mdi-trash-can-outline
                </v-icon>
                    Yes
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>


            </v-card-actions>
      </v-card>
  </div>
</template>

<script>
  export default {
    data () {
      const srcs = {
        1: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
        2: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
        3: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
        4: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
        5: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
      }

      

      return {
        dialog: false,
        valid:true,
        snackbar:false,
        autoUpdate: true,
        isUpdating: false,

        nameRules: [
                v => !!v || 'Name is required',
            ],
         
            
        emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            
           

           
        quoteRules:[
              v => !!v || 'Quote is required',
              v => (v && v.length <= 70) || 'Quote must be less than 70 characters',
            ],

        
        authorRules:[
              v => !!v || 'Author is required',
              v => (v && v.length <= 20) || 'Quote must be less than 20 characters',
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

    computed:{
        user:{ 
            get(){
               return this.$store.state.user
            },   
         },

    },

    methods: {

        remove (item) {
            const index = this.friends.indexOf(item.name)
            if (index >= 0) this.friends.splice(index, 1)
        },

        updateUser(user){
            this.$store.dispatch('updateUser', { user })
            return this.snackbar = true; 
        },

        deleteUser(user){
            this.$store.dispatch('deleteUser', { user })
              this.dialog = false
              window.location.href = '/unauthorized'
        },
    },

    created(){
        this.$store.dispatch('getLoggedUser')
    }
  }
</script>
