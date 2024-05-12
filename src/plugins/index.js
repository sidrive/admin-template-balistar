/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import store from '@/store'
import axios from 'axios'
// import VueAxios from 'vue-axios'
import vue3GoogleLogin from 'vue3-google-login'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(store)
    // .use(VueAxios, axios)
    .use(vue3GoogleLogin, {
      clientId: '1096527158781-iidsrdbjt24f45dn9h7i87vjbkt7lfdu.apps.googleusercontent.com'
    })
}
