<template>
  <div class="projects">
    <h1 class="title mb-3">Projects</h1>
    <p>{{user.name}}</p>
    <v-container fluid class="my-5">
      
      <v-row justify="center" class="px-5"> 
        <v-expansion-panels accordion>
          <v-expansion-panel
            v-for="project in myProjects" :key="project.id">
            <v-expansion-panel-header color="teal lighten-5">{{project.title}}</v-expansion-panel-header>
            <v-expansion-panel-content class="px-4 grey--text" color="grey lighten-4">
              <div class="font-weight-bold mt-2 ">Due by {{project.date}}</div>
              {{project.content}}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>

    </v-container>    
  </div>
</template>

<script>


export default {

  computed:{

    user:{ 
            get(){
               return this.$store.state.user
            },   
         },

    tasks:{ 
            get(){
               return this.$store.state.tasks
            },   
         },

    myProjects(){
      let tasks = this.$store.state.tasks
      let items = Array.from(tasks);
      return items.filter(project => {
        return project.name === this.$store.state.user.name
      })
    } 
  },
  

  created(){
        this.$store.dispatch('getTaskList')
        this.$store.dispatch('getLoggedUser')
  }
  
}
</script>