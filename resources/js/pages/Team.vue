<template>
  <div class="team">
    <h1 class="title">Team</h1>

    <v-container fluid class="my-5">
      <v-row wrap>
          <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
                <v-card
                    class="ma-1"
                    max-width="344"
                    outlined
                    color="teal lighten-5"      
                >
                    <v-list-item three-line>
                    <v-list-item-content>
                        <div class="overline mb-4">
                        {{person.roles}}
                        </div>
                        <v-list-item-title class="headline mb-1">
                        <p class="caption font-weight-bold">{{person.name}}</p>
                        </v-list-item-title>
                        <v-list-item-subtitle class="caption mt-2 font-italic">"{{person.quote}}"</v-list-item-subtitle>
                        <v-spacer></v-spacer>
                        <v-list-item-subtitle class="caption mt-2 text-right"> - {{person.author}}</v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-avatar tile size="80">
                        <img :src="person.avatar">
                    </v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                  
                      <PopupMessage :person="person"/>

                    </v-card-actions>
                </v-card>
          </v-flex>
      </v-row>
    </v-container>

  </div>
</template>

<script>

import PopupMessage from '../components/PopupMessage'


export default {

  components: {
      PopupMessage,
    },

  computed:{
        team:{ 
            get(){
               return this.$store.state.team
            },   
         }
    },

  created(){
        this.$store.dispatch('getTeam')
        this.$store.dispatch('getLoggedUser')
    }  
}
</script>