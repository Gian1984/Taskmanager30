<template>
  <div class="text-xs-center mx-auto">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card id="main" height="400" color="transparent" flat>
            <div class="display-3 mt-5">Unauthorized.</div>
            <div class="grey--text lighten-5 mt-5">
              The page you are trying to get require a logged user,
              or has migrated to a parallel universe.
            </div>
            <div class="paragraph-text mt-2">
              
              <br />Try going back to home page or,
              try login again! 
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<style>
  .paragraph-text {
    font-size: 18px;
  }

  #main{
  margin: auto;
  max-width: 500px !important;
}
</style>