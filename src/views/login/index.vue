<template>
 <v-main>
   <v-container class="fill-height grey lighten-5 mb-6" fluid >
     <v-row align="center" justify="center">
       <v-col sm="8" md="4">
         <v-card
           raised
           width="384"
           class="pt-12"
           style="border-radius: 16px;">
           <div class="text-center">
             <v-avatar tile height="62" width="62" class="mr-2">
               <!-- <v-icon size="62">$vuetify.icons.zenwel_admin</v-icon> -->
             </v-avatar>
             <!-- <span class="headline">Zenwel</span>
             <span class="headline font-weight-bold">Admin</span> -->
           </div>
           <v-card-text class="mt-10">
             <v-form>
               <div class="mb-2">
                 <span class="mt-4">Username/email address</span>
               </div>
               <v-text-field
                 ref="inputEmail"
                 v-model="data.username"
                 :rules="[rules.required]"
                 outlined
                 dense
                 placeholder="ex: andri@gmail.com"
               />
               <div class="mb-2">
                 <span class="mt-4">Password</span>
               </div>
               <v-text-field
                 v-model="data.password"
                 id="password"
                 :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                 :rules="[rules.required]"
                 :type="showPassword ? 'text' : 'password'"
                 outlined
                 dense
                 placeholder="Password"
                 name="password"
                 @click:append="showPassword = !showPassword"
                 @keyup.native.enter="getLogin"
               />

               <div class="text-center" style="width:100%">
                 <v-btn
                   :disabled="computedDisableButton"
                   :loading="loading4"
                   block
                   color="#00D79E"
                   style="color: #FFFFFF"
                   @click="getLogin">
                   Login
                   <template v-slot:loader>
                     <span class="custom-loader">
                     <v-icon>$vuetify.icons.loading</v-icon>
                     </span>
                   </template>
                 </v-btn>
               </div>
             </v-form>
           </v-card-text>
         </v-card>
       </v-col>
     </v-row>
   </v-container>
 </v-main>
</template>

<script>
import oktaConfig from '../../config/okta.js';

export default {
 name: 'LoginForm',

 data () {
   return {
     showPassword: false,
     rules: {
       required: value => !!value || 'Required.'
     },
     data: {
       password: '',
       username: '',
       pageToken: ''
     },
     remember: false,
     loader: 'loading4',
     loading4: false
   }
 },

 computed: {
   lang () {
     return this.$vuetify.lang
   },
   computedDisableButton () {
     if (
       !this.data.password ||
       !this.data.username
     ) {
       return true
     } else {
       return false
     }
   }
 },

 mounted () {
   this.data.pageToken = this.$route.params.token
   this.$nextTick(() => {
     this.$refs.inputEmail.focus()
   })
 },

 methods: {
   async getLogin () {
     this.loading4 = true
    //  this.$store.dispatch('LoginByUsername', this.data).then(() => {
    //    const auth = this.$store.getters.user.role_id
    //    this.loading4 = false
    //    if (auth === 'A') {
    //      this.$router.push('/')
    //    } else {
    //      this.$router.push('/zenwel-biz/package')
    //    }
    //  }).catch(error => {
    //    this.loading4 = false
    //    this.$store.dispatch('showSnackbar', {
    //      type: 'error',
    //      message: error.message
    //    })
    //  })
    return this.$auth.signInWithCredentials({
        username: this.data.username,
        password: this.data.password,
      }).then((transaction) => {
        console.log(transaction);
        if (transaction.status === 'SUCCESS') {
          this.loading4 = false
          return this.$auth.token.getWithoutPrompt({
            clientId: oktaConfig.clientId,
            responseType: ['token', 'id_token'],
            scopes: ['openid', 'email'],
            sessionToken: transaction.sessionToken,
            redirectUri: oktaConfig.redirectUri,
          }).then((response) => {
            console.log('resp', response)
            // save last email to localStorage
            // if (this.data.username) {
            //   localStorage.setItem('ramus_smart_x_login_email', this.data.username);
            // } else {
            //   localStorage.removeItem('ramus_smart_x_login_email');
            // }
            this.doneLogin(response.tokens.accessToken.accessToken);
          });
        }
      }).catch((err) => {
        this.loading4 = false
        console.info('error login', err);
        console.info('error login', err.response);
        console.info('error login', JSON.stringify(err));
        this.isSubmit = false;
        this.errors = {
          email: 'Invalid Username or Password',
          password: 'Invalid Username or Password',
        };
        this.$emit('onFailure', err.message);
      });
   },

  async doneLogin(token) {
    try {
      await this.$store.dispatch('auth/signIn', token);
      this.isLoading = false;
      this.$emit('onSuccess');
    } catch (err) {
      console.log(err);
      this.isLoading = false;
      this.$emit('onFailure', err);
    }
  },
 }
}
</script>
