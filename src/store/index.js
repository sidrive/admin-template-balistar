// import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters'
import auth from './auth';
import app from './modules/app'

const store = new Vuex.Store({
 modules: {
   auth,
   app
 },
 getters
})

export default store
