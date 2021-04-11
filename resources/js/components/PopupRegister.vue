<template>
  <div class="text-center" >
    <v-menu
      v-scroll.self="onScroll"
      max-height="450"
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
          <span id="name" class="mr-1">Register</span>
          <v-icon>mdi-account-multiple-plus</v-icon>
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
            <h4 id="title" class="title ml-3">Register</h4>

            <v-text-field
            small
            class="ml-2 mr-5"
            v-model="name"
            prepend-icon="mdi-face"
            :rules="nameRules"
            label="Name"
            required
            ></v-text-field>


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

            <v-select
              small
              class="ml-3 mr-5"
              prepend-icon="mdi-contacts"
              v-model="roles"
              :items="role"
              :rules="[v => !!v || 'Role is required']"
              label="Role"
              required
              offset-y
            ></v-select>

            <v-text-field
              small
              class="ml-3 mr-5"
              v-model="quote"
              prepend-icon="mdi-comment-quote"
              :rules="quoteRules"
              label="Your famous people quote"
              required
            ></v-text-field>

            <v-text-field
              small
              class="ml-3 mr-5"
              v-model="author"
              prepend-icon="mdi-pencil-circle-outline"
              :rules="authorRules"
              label="Author"
              required
            ></v-text-field>

 
              <v-card
              class="mx-auto mt-12"
              max-width="450"
              elevation="0"
            >

              <v-toolbar
                flat
                color="transparent"
              >
                <!-- <v-btn
                icon class="mb-5 mr-3" 
                color="pink darken-1"
                small
                outlined
                > -->
                  <v-icon class="mr-3 mb-3">mdi-panda</v-icon>
                <!-- </v-btn> -->

                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search Avatar"
                  single-line
                ></v-text-field>
              </v-toolbar>

              <v-card-text class="py-0">
                <v-chip
                  v-for="(keyword, i) in keywords"
                  :key="i"
                  class="mr-2"
                >
                  {{ keyword }}
                </v-chip>
              </v-card-text>

              <v-list three-line>
                <v-list-item
                  v-for="(item, i) in searching"
                  :key="i"
                  ripple
                  @click="addAvatar(item.image)"
                >
                  <v-img
                    :src="item.image"
                    class="mr-4"
                    max-width="64"
                    min-width="64"
                  ></v-img>

                  <v-list-item-content>
                    <span
                      class="text-uppercase font-weight-regular caption"
                      v-text="item.category"
                    ></span>

                    <div v-text="item.title"></div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>

            <v-alert
              class="mr-2 ml-2 "
              small
              v-if="errorReg"
              type="warning"
              prominent
              icon="mdi-alert-outline"
              >
                <v-row align="center">
                  <v-col class="grow">
                    <span class="text-center">{{errorReg.data.errors.email[0]}}</span>
                  </v-col>
                  <v-col class="shrink">
                    <v-btn
                    icon
                    >
                    <v-icon @click="resetValidation">
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
              class="mr-5"
              icon
              text
              color="success"
              v-on:click="register"
            >
              <span>Register</span>
              <v-icon class="mr-5">mdi-send</v-icon>
            </v-btn>

          </v-form>
      </v-card>
    </v-menu>
  </div>
</template>

<script>

  export default {

    props:['errorReg'],

    data: () => ({
      valid: true,
      menu: false,
      scrollInvoked: 0, 
            
            name: '',
            nameRules: [
                v => !!v || 'Name is required',
            ],
         
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

            roles:'',

            quote:'',
            quoteRules:[
              v => !!v || 'Quote is required',
              v => (v && v.length <= 70) || 'Quote must be less than 70 characters',
            ],

            author:'',
            authorRules:[
              v => !!v || 'Author is required',
              v => (v && v.length <= 20) || 'Quote must be less than 20 characters',
            ],

            
            role: [
              'WEB DEVELOPER',
              'GRAPHIC DESIGNER',
              'SOCIAL MEDIA',
              'SALES GURU',
            ],


            items: [
            {
              image: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortCurly&accessoriesType=Sunglasses&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Platinum&clotheType=BlazerShirt&eyeType=Cry&eyebrowType=FlatNatural&mouthType=Default&skinColor=Light',
              title: 'Mark',
              category: 'Mark',
              keyword: 'Mark',

            },
            {
              image: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairFrizzle&accessoriesType=Sunglasses&hatColor=Gray01&hairColor=BrownDark&facialHairType=MoustacheFancy&facialHairColor=BrownDark&clotheType=ShirtVNeck&clotheColor=Blue01&eyeType=Default&eyebrowType=SadConcernedNatural&mouthType=Disbelief&skinColor=Pale',
              title: 'Anthony',
              category: 'Anthony',
              keyword: 'Anthony',
            },
            {
              image: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&accessoriesType=Sunglasses&hairColor=Auburn&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerSweater&clotheColor=PastelYellow&eyeType=EyeRoll&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=Pale',
              title: 'Paul',
              category: 'Paul',
              keyword: 'Paul',
            },
            {
              image: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Round&hairColor=Platinum&facialHairType=Blank&facialHairColor=Auburn&clotheType=BlazerSweater&clotheColor=Gray01&graphicType=Resist&eyeType=WinkWacky&eyebrowType=UpDown&mouthType=Smile&skinColor=DarkBrown',
              title: 'Frank',
              category: 'Frank',
              keyword: 'Frank',
            },
            {
              image: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShaggyMullet&accessoriesType=Kurt&hairColor=Blonde&facialHairType=BeardMajestic&facialHairColor=Brown&clotheType=BlazerShirt&clotheColor=PastelGreen&eyeType=Cry&eyebrowType=AngryNatural&mouthType=Tongue&skinColor=Yellow',
              title: 'Kevin',
              category: 'Kevin',
              keyword: 'Kevin',
            },

            {
              image: 'https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Blue03&eyeType=Happy&eyebrowType=UpDownNatural&mouthType=Smile&skinColor=DarkBrown',
              title: 'Gema',
              category: 'Gema',
              keyword: 'Gema',
            },

            {
              image: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesarSidePart&accessoriesType=Wayfarers&hairColor=Red&facialHairType=BeardLight&facialHairColor=Red&clotheType=ShirtVNeck&clotheColor=PastelGreen&eyeType=WinkWacky&eyebrowType=SadConcerned&mouthType=Smile&skinColor=Tanned',
              title: 'Bryan',
              category: 'Bryan',
              keyword: 'Bryan',
            },

            {
              image: 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Wayfarers&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=BrownDark&clotheType=BlazerShirt&eyeType=Wink&eyebrowType=Angry&mouthType=Concerned&skinColor=Tanned',
              title: 'Ibrahim',
              category: 'Ibrahim',
              keyword: 'Ibrahim',
            },

          ],
      search: '',
      avatar:'', 
        
              
      
    }),

    methods:{

       addAvatar(image){
         this.avatar = image
       },

        register(){

             const project = {
                name: this.name,
                email: this.email,
                password: this.password,
                roles: this.roles,
                quote: this.quote,
                author: this.author,
                avatar: this. avatar,
             }
            
             this.$emit('register', project)
             this.$refs.form.reset()
        },

        resetValidation () {
          let registerError = this.errorReg
          registerError = "";
          this.$emit("update-register", registerError);
        },

        onScroll () {
        this.scrollInvoked++
        },
        
    },

    computed: {
      keywords () {
        if (!this.search) return []

        const keywords = []

        for (const search of this.searching) {
          keywords.push(search.keyword)
        }

        return keywords
      },
      searching () {
        if (!this.search) return this.items

        const search = this.search.toLowerCase()

        return this.items.filter(item => {
          const text = item.title.toLowerCase()

          return text.indexOf(search) > -1
        })
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
.v-card{
  font-size: 0.2em !important;
}

</style>