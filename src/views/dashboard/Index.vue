<template>
 <div>
  <div class="text-center mt-24" style="width: 100%">
    <GoogleLogin :callback="callbackGoogle"/>
  </div>
  <v-btn text @click="getListCompany">
    Company
  </v-btn>
 </div>

 <div class="mt-24">
  <v-data-table
    :headers="headers"
    :items="dataCompany"
    item-key="name"
    items-per-page="5"
  ></v-data-table>
 </div>
</template>

<script>
import { listCompany } from '@/api/dashboard'
import AuthSvc from '@/services/AuthSvc'
export default {
 data () {
  return {
   dataCompany: [],
   loading: false,
   headers: [
    { title: 'Company Name', value: 'compName' },
    { title: 'Address', value: 'compAddress' },
    { title: 'Phone', value: 'compPhone' },
  ],
  }
 },

 mounted () {
  console.log('mounted')
  // this.getLogin()
 },

 methods: {
  getLogin () {
    this.loading = true
    AuthSvc.loginTest().then((response) => {
    //  this.dataCompany = response.data.data
    this.loading = false
   })
  },

  getListCompany () {
    this.loading = true
    AuthSvc.listCompany().then((response) => {
      console.log('resp', response.data.data)
     this.dataCompany = response.data.data
     this.loading = false
   })
  },

  async doneLogin(token) {
    console.log('token', token)
    AuthSvc.login(token).then((response) => {
    //  this.dataCompany = response.data.data
    this.loading = false
   })
  },

  callbackGoogle (response) {
    this.doneLogin(response.credential)
  }
 }
 
}
</script>