<template>

<div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="mr-3"
          fab
          x-small
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
        <v-icon class="mdi-18px">mdi-plus-circle-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="headline teal lighten-5"> 
          Add new project
        </v-card-title>

        <v-card-text>
          <v-form ref="form">

            <v-select v-model="name" :items="team"  item-text="name" :rules="[v => !!v || 'Name is required']" prepend-icon="mdi-face" label="Person" required ></v-select> 
            <v-text-field v-model="title" label="Title" prepend-icon="mdi-folder-open" :rules="inputRules"></v-text-field>
            <v-textarea v-model="content" label="Information" prepend-icon="mdi-pencil" :rules="inputRules"></v-textarea>

                <v-menu
                
                :close-on-content-click="false"
                max-width="290"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field 
                        :rules="inputRules"
                        prepend-icon="mdi-calendar"
                        label="Due by"
                        :value="computedDateFormattedDatefns"
                        clearable
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        @click:clear="date = null"                       
                        ></v-text-field>
                    </template>

                    <v-date-picker
                        v-model="date"
                        @change="menu2 = false"
                    ></v-date-picker>
            
                </v-menu>

                <v-combobox
                      v-model="status"
                      prepend-icon="mdi-clock"
                      :items="items"
                      label="Status"
                      clearable
                      persistent-hint
                ></v-combobox>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        :loading="loading"
                        depressed small dark color="teal"
                        text
                        @click="addTask"
                        >
                        Submit
                    </v-btn> 
                </v-card-actions>
            </v-form>  
        </v-card-text>
         
      </v-card>
      
    </v-dialog>
</div>

</template>

<script>

import { format, parseISO } from 'date-fns'

export default {

  props:['projects'],

    data () {
      return {

        name:'',  
        title:'',
        content:'',
        date: '',
        status:'',

        inputRules:[
            v=> v.length >=3 || 'Minimum is 3 character'
        ],
        loading:false,

        dialog:false,

        items: [
          'ongoing',
          'complete',
          'overdue',
        ],

      }
    },
    
  
    
    methods:{

        addTask(){
            if (this.$refs.form.validate()){
                this.loading=true;

            const task = {
                name: this.name,
                title: this.title,
                content: this.content,
                date: format(parseISO(new Date(this.date).toISOString()), 'dd-MM-yyyy'),
                status: this.status
            }

            
            this.$store.dispatch('addTask', { task })
            this.loading=false;
            this.dialog=false;           
            }
        },
        
    },

    computed: {
      computedDateFormattedDatefns () {
        return this.date ? format(parseISO(this.date), 'EEEE, MMMM do yyyy') : ''
      },

      
        team:{ 
            get(){
               return this.$store.state.team
            },   
         },
    
    },

}
</script>