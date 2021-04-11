import Vue from 'vue'
import Vuetify from "./vuetify"
import VueRouter from 'vue-router';
import Router from './router';
import store from './store'


require('./bootstrap');

window.Vue = require('vue').default;

Vue.component('index', require('./Index').default);

Vue.use(VueRouter)



const app = new Vue({
    el: '#index',
    router: new VueRouter(Router),
    vuetify: Vuetify,
    store
});