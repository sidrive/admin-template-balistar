/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'
import '@/sass/main.scss'

import { OktaAuth } from '@okta/okta-auth-js';
import OktaVue from '@okta/okta-vue';

import oktaConfig from '@/config/okta.js';

const oktaAuth = new OktaAuth(oktaConfig);

// Composables
import { createApp } from 'vue'

const app = createApp(App)

registerPlugins(app)
app.use(OktaVue, { oktaAuth })
app.mount('#app')
