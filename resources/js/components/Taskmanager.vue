<template>
  <div class="dashboard">
    <h1 class="title">Dashboard</h1>

    <v-container fluid class="my-5 mt-2">

      <v-row class="mb-5">

        <AddTask />

        <v-tooltip bottom small>
          <template v-slot:activator="{ on }">  
            <v-btn small color="grey lighten-4" v-on="on" @click="sortBy('title')">
              <v-icon left small>mdi-folder</v-icon>
              <div class="span caption text-lowercase">By project name</div>
            </v-btn>
          </template>
          <span>Sort projects by project name</span>
        </v-tooltip>

         <v-tooltip bottom small>
          <template v-slot:activator="{ on }">  
            <v-btn small color="grey lighten-4 ml-3" v-on="on" @click="sortBy('name')">
              <v-icon left small>mdi-account</v-icon>
              <div class="span caption text-lowercase">By person</div>
            </v-btn>
        </template>
          <span>Sort projects by person</span>
        </v-tooltip>

        <v-tooltip bottom small>
          <template v-slot:activator="{ on }">  
            <v-btn small color="grey lighten-4 ml-3" v-on="on" @click="sortBy('status')">
              <v-icon left small>mdi-clock</v-icon>
              <div class="span caption text-lowercase">By status</div>
            </v-btn>
        </template>
          <span>Sort projects by status</span>
        </v-tooltip>

      </v-row>

      <v-card :class="`project ${project.status}`" flat color="teal lighten-5"  v-for="(project, index) in tasks" :key="project.id">
        <v-row no-gutters class="pt-4 pr-1 pb-1 pl-4">
          

          <v-col>
            <div class="caption grey--text">Project title</div>
            <div class="mt-1">{{project.title}}</div>
          </v-col>

          <v-col>
            <div class="caption grey--text">Person</div>
            <div class="mt-1">{{project.name}}</div>
          </v-col>

          <v-col>
            <div class="caption grey--text">Due by</div>
            <div class="mt-1">{{project.date}}</div>
          </v-col>

          <v-col>
            <div>
                <div class="caption grey--text">Status</div>
                <v-chip small :class="`${project.status} white--text mt-1 caption m-auto`">{{ project.status }}</v-chip>
            </div>
          </v-col>

          <v-col>
            <div class="caption grey--text">Remove / Update</div>
            <v-row >
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                <v-btn
                  v-bind="attrs"
                  v-on="on"
                  icon
                  color="red"
                  class="mt-2"
                >
                    <v-icon
                        small
                        @click="removeProject(project.id, index)"
                        v-bind:project="[project.id, index]"
                    >
                    mdi-trash-can-outline
                    </v-icon>
                </v-btn>
                </template>
                <span>Remove</span>
              </v-tooltip>
              
              <UpdateProject class="mt-2" :project="project" @update-project="updateProject"/>
              
            </v-row>  
          </v-col>

        </v-row>
        <v-divider></v-divider>
        
      </v-card>
    </v-container>

  </div>
</template>

<script>

import UpdateProject from './UpdateProject'
import AddTask from './AddTask'


export default {

  components: {
      UpdateProject,
      AddTask
      },

  data() {
    return {
      
      
      fav: true,
      menu: false,
      message: false,
      hints: true,
      dialog: false,

    }
  },
   

  methods:{

    sortBy(prop){
      this.$store.state.tasks.sort((a,b)=> a[prop] < b[prop] ? -1 : 1)
    },

    updateProject(updateProject){
         this.$store.state.task = updateProject
    },
  
    removeProject(projectId, index){
            axios.delete('/api/tasks/'+ projectId)
            .then( response =>{
              this.$delete(this.$store.state.tasks, index)
        })

        .catch(error =>{
        console.log(error);
        })
    },
    
  },

  computed:{
        tasks:{ 
            get(){
               return this.$store.state.tasks
            },   
         },

  },

  created(){
        this.$store.dispatch('getTaskList')
        this.$store.dispatch('getLoggedUser')
  }
  
}
</script>

<style scoped>

  .project.complete{
    border-left: 4px solid green !important;
  }

  .project.ongoing{
    border-left: 4px solid orange !important;
  }

  .project.overdue{
    border-left: 4px solid red !important;
  }

  .v-chip.complete{
  background: green !important; 
  }

  .v-chip.ongoing{
  background: orange !important;
  }

  .v-chip.overdue{
  background: red !important;
  }



</style>