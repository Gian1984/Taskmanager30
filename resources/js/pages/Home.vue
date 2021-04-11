<template>
<div class="weather">
    <h1 class="title">Weather</h1>
    <v-container fluid class="my-5">
        <v-row wrap>
                <v-card
                    class="overflow-y-auto ma-1"
                    max-height="320"
                    min-width="100%"
                    outlined
                    color="teal lighten-5"     
                >
                <v-row no-gutters>
                    <v-col>   
                        <v-list-item two-line>
                            <v-list-item-content>
                                <v-form 
                                ref="form"
                                v-model="valid"
                                lazy-validation 
                                >
                                    <v-container>
                                    <v-row>
                                        <v-col
                                        cols="12"
                                        md="4"
                                        >
                                        <v-text-field
                                            v-model="town"
                                            :rules="townRules"
                                            :counter="10"
                                            label="Ex: London"
                                            required
                                        ></v-text-field>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="4"
                                        >
                                        <v-select
                                            offset-y
                                            :items="items"
                                            v-model="country"
                                            :rules="[v => !!v || 'Item is required']"
                                            label="Country"
                                            required
                                        ></v-select>
                                        </v-col>

                                        <v-col
                                        cols="12"
                                        md="4"
                                        >
                                            <v-btn
                                            :disabled="!valid"
                                            class="mt-4"
                                            icon
                                            color="pink darken-1"
                                            @click="fetchWeather"
                                            >
                                                <v-icon>mdi-send</v-icon>
                                            </v-btn>

                                            <v-btn
                                            class="mt-4"
                                            icon
                                            color="pink darken-1"
                                            @click="reset"
                                            >
                                                <v-icon>mdi-restart</v-icon>
                                            </v-btn>
                                        </v-col>

                                    </v-row>
                                    </v-container>
                                </v-form>

                                <v-list-item-subtitle v-if="(typeof (this.weather) != typeof(''))">
                                    Today: {{weather[this.counter].valid_date}}
                                    <v-btn
                                        v-model="counter"
                                        small
                                        icon
                                        color="pink darken-1"
                                        @click="addDay"
                                        >
                                        <v-icon>mdi-plus</v-icon>
                                    </v-btn>
                                    <v-btn
                                        v-model="counter"
                                        small
                                        icon
                                        color="pink darken-1"
                                        @click="prevDay"
                                        >
                                        <v-icon>mdi-minus</v-icon>
                                    </v-btn>
                                </v-list-item-subtitle>

                            </v-list-item-content>
                            </v-list-item>

                            <v-card-text>

                            <v-row align="center">
                                <v-list-item-subtitle>Average temperature:</v-list-item-subtitle>
                                <v-col
                                class="display-3"
                                cols="6"
                                v-if="(typeof (this.weather) != typeof(''))"
                                >
                                {{weather[this.counter].temp}}&deg;C
                                </v-col>
                                <v-col cols="6">
                                <v-img v-if="(typeof (this.weather) != typeof(''))"
                                    :src="`https://www.weatherbit.io/static/img/icons/${weather[this.counter].weather.icon}.png`"
                                    width="92"    
                                ></v-img>
                                </v-col>
                            </v-row>
                            </v-card-text>

                    </v-col>
                    <v-col>
                        <div>
                            <v-list-item >
                            <v-list-item-icon>
                                <v-icon>mdi-weather-windy</v-icon>
                            </v-list-item-icon>
                            <v-list-item-subtitle v-if="(typeof (this.weather) != typeof(''))">{{weather[this.counter].wind_spd}} m/s</v-list-item-subtitle>
                             <v-list-item-icon>
                                <v-icon>mdi-compass-outline</v-icon>
                            </v-list-item-icon>
                            <v-list-item-subtitle class="ml-6" v-if="(typeof (this.weather) != typeof(''))">{{weather[this.counter].wind_cdir}}</v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item >
                            <v-list-item-icon>
                                <v-icon>mdi-sort-ascending</v-icon>
                            </v-list-item-icon>
                            <v-list-item-subtitle v-if="(typeof (this.weather) != typeof(''))">{{weather[this.counter].max_temp}} °C</v-list-item-subtitle>
                             <v-list-item-icon>
                                <v-icon>mdi-sort-descending</v-icon>
                            </v-list-item-icon>
                            <v-list-item-subtitle class="ml-6" v-if="(typeof (this.weather) != typeof(''))">{{weather[this.counter].min_temp}} °C</v-list-item-subtitle>
                            </v-list-item>

                            <v-list-item >
                            <v-list-item-icon>
                                <v-icon>mdi-temperature-celsius</v-icon>
                            </v-list-item-icon>
                            <v-list-item-subtitle v-if="(typeof (this.weather) != typeof(''))">{{weather[this.counter].app_max_temp}} °C max feels like</v-list-item-subtitle>
                             <v-list-item-icon>
                                <v-icon>mdi-temperature-celsius</v-icon>
                            </v-list-item-icon>
                            <v-list-item-subtitle class="ml-6" v-if="(typeof (this.weather) != typeof(''))">{{weather[this.counter].app_min_temp}} °C min feels like</v-list-item-subtitle>
                            </v-list-item> 

                            <v-list-item >
                            <v-list-item-icon>
                                <v-icon>mdi-weather-pouring</v-icon>
                            </v-list-item-icon>
                            <v-list-item-subtitle v-if="(typeof (this.weather) != typeof(''))">{{weather[this.counter].pop}} %</v-list-item-subtitle>
                             <v-list-item-icon>
                                <v-icon>mdi-waves</v-icon>
                            </v-list-item-icon>
                            <v-list-item-subtitle class="ml-6" v-if="(typeof (this.weather) != typeof(''))">{{weather[this.counter].precip}} mm</v-list-item-subtitle>
                            </v-list-item>  

                            <v-list-item >
                            <v-list-item-icon>
                                <v-icon>mdi-download-multiple</v-icon>
                            </v-list-item-icon>
                            <v-list-item-subtitle v-if="(typeof (this.weather) != typeof(''))">{{weather[this.counter].pres}} mb</v-list-item-subtitle>
                             <v-list-item-icon>
                                <v-icon>mdi-water</v-icon>
                            </v-list-item-icon>
                            <v-list-item-subtitle class="ml-6" v-if="(typeof (this.weather) != typeof(''))">{{weather[this.counter].rh}} %</v-list-item-subtitle>
                            </v-list-item>
                        </div>
                    </v-col>
                </v-row>                
                </v-card>
        </v-row>
    </v-container>
</div>
  
</template>

<script>
  export default {
    data () {
      return {
        time: 0,

        api_key: 'ee49802656cc4586aa8b89dd3ef40d19',
        url_base: 'https://api.weatherbit.io/v2.0/forecast/daily?city=',

        weather: "",


        counter:0,

        select: null,

        items: [
        'AF',
        'AX',
        'AL',
        'DZ',
        'AS',
        'AD',
        'AO',
        'AI',
        'AQ',
        'AG',
        'AR',
        'AM',
        'AW',
        'AU',
        'AT',
        'AZ',
        'BS',
        'BH',
        'BD',
        'BB',
        'BY',
        'BE',
        'BZ',
        'BJ',
        'BM',
        'BT',
        'BO',
        'BA',
        'BW',
        'BV',
        'BR',
        'IO',
        'BN',
        'BG',
        'BF',
        'BI',
        'KH',
        'CM',
        'CA',
        'CV',
        'KY',
        'CF',
        'TD',
        'CL',
        'CN',
        'CX',
        'CC',
        'CO',
        'KM',
        'CG',
        'CD',
        'CK',
        'CR',
        'CI',
        'HR',
        'CU',
        'CY',
        'CZ',
        'DK',
        'DJ',
        'DM',
        'DO',
        'EC',
        'EG',
        'SV',
        'GQ',
        'ER',
        'EE',
        'ET',
        'FK',
        'FO',
        'FJ',
        'FI',
        'FR',
        'GF',
        'PF',
        'TF',
        'GA',
        'GM',
        'GE',
        'DE',
        'GH',
        'GI',
        'GR',
        'GL',
        'GD',
        'GP',
        'GU',
        'GT',
        'GG',
        'GN',
        'GW',
        'GY',
        'HT',
        'HM',
        'VA',
        'HN',
        'HK',
        'HU',
        'IS',
        'IN',
        'ID',
        'IR',
        'IQ',
        'IE',
        'IM',
        'IL',
        'IT',
        'JM',
        'JP',
        'JE',
        'JO',
        'KZ',
        'KE',
        'KI',
        'KR',
        'KW',
        'KG',
        'LA',
        'LV',
        'LB',
        'LS',
        'LR',
        'LY',
        'LI',
        'LT',
        'LU',
        'MO',
        'MK',
        'MG',
        'MW',
        'MY',
        'MV',
        'ML',
        'MT',
        'MH',
        'MQ',
        'MR',
        'MU',
        'YT',
        'MX',
        'FM',
        'MD',
        'MC',
        'MN',
        'ME',
        'MS',
        'MA',
        'MZ',
        'MM',
        'NA',
        'NR',
        'NP',
        'NL',
        'AN',
        'NC',
        'NZ',
        'NI',
        'NE',
        'NG',
        'NU',
        'NF',
        'MP',
        'NO',
        'OM',
        'PK',
        'PW',
        'PS',
        'PA',
        'PG',
        'PY',
        'PE',
        'PH',
        'PN',
        'PL',
        'PT',
        'PR',
        'QA',
        'RE',
        'RO',
        'RU',
        'RW',
        'BL',
        'SH',
        'KN',
        'LC',
        'MF',
        'PM',
        'VC',
        'WS',
        'SM',
        'ST',
        'SA',
        'SN',
        'RS',
        'SC',
        'SL',
        'SG',
        'SK',
        'SI',
        'SB',
        'SO',
        'ZA',
        'GS',
        'ES',
        'LK',
        'SD',
        'SR',
        'SJ',
        'SZ',
        'SE',
        'CH',
        'SY',
        'TW',
        'TJ',
        'TZ',
        'TH',
        'TL',
        'TG',
        'TK',
        'TO',
        'TT',
        'TN',
        'TR',
        'TM',
        'TC',
        'TV',
        'UG',
        'UA',
        'AE',
        'GB',
        'US',
        'UM',
        'UY',
        'UZ',
        'VU',
        'VE',
        'VN',
        'VG',
        'VI',
        'WF',
        'EH', 
        'YE',
        'ZM',
        'ZW', 
        ],

        valid: true,
        town: '',
        country: '',
        townRules: [
        v => !!v || 'Town is required',
        ],
        country: '',
      }
    },

    methods: {
        fetchWeather () {
            fetch(`${this.url_base}${this.town},${this.country}&key=${this.api_key}`)
            .then(res => {
                return res.json();
            }).then(this.setResults);
        },

        setResults (results) {
        this.weather = results.data;
        },

        addDay () {
            if(this.counter < this.weather.length) {
                this.counter = this.counter + 1
            }
        },

        prevDay () {
            if(this.counter < this.weather.length + 1) {
                this.counter = this.counter - 1
            }
        },

        reset () {
        this.$refs.form.reset()
        },
    }
  }
</script>