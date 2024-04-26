// import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters'
import auth from './auth';
// import coordinate from './coordinate';
// import user from './user';
// import breadcrumb from './breadcrumb';
// import layout from './layout';

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {
//     auth,
//     // coordinate,
//     // user,
//     // breadcrumb,
//     // layout,
//   },
// });

const store = new Vuex.Store({
 modules: {
   auth,
 },
 getters
})

export default store
