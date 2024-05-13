<template>
 <div class="d-flex">
  <!-- <div class="text-center mt-24" style="width: 100%">
    <GoogleLogin :callback="callbackGoogle"/>
  </div> -->
  <div class="flex-1-0 ma-2 pa-2"> 
    <v-btn text @click="getListCompany">
      Company
    </v-btn>
  </div>
  <div class="ma-2 pa-2">
    <v-btn text @click="hadleAddCompany" style="background-color: #FFFFFF; color: #000000">
      Add Company
    </v-btn>
  </div>
 </div>

 <div class="mt-24">
  <v-data-table
    :headers="headers"
    :items="dataCompany"
    :loading="loading"
    item-key="name"
    items-per-page="5"
    @click:row="editData">
    <template v-slot:item.compName="{ value }">
      <div>
        {{ value }}
      </div>
    </template>
  </v-data-table>
 </div>

 <div class="mt-24 d-flex">
  <div class="flex-1-0 ma-2 pa-2"> 
    <v-btn text @click="getListCompanyGrup">
      Company Grup
    </v-btn>
  </div>
  <div class="ma-2 pa-2">
    <v-btn text @click="hadleAddGrup" style="background-color: #FFFFFF; color: #000000">
      Add Company Grup
    </v-btn>
  </div>
 </div>

 <div class="mt-24">
  <v-data-table
    :headers="headersGrup"
    :items="dataCompanyGrup"
    :loading="loading"
    item-key="name"
    items-per-page="5"
    @click:row="editDataGrup">
    <template v-slot:item.grcpName="{ value }">
      <div>
        {{ value }}
      </div>
    </template>
  </v-data-table>
 </div>

 <div class="mt-24">
  <v-dialog
    v-model="editDialog"
    max-width="600"
  >
    <v-card
      prepend-icon="mdi-account"
      :title="isCompany ? 'Company Profile' : 'Grup Profile'">
      <v-card-text v-if="isCompany">
        <div>
          <v-text-field label="Company name*" required v-model="tempItem.compName"></v-text-field>
        </div>
        <div>
          <v-text-field label="Company address*" required v-model="tempItem.compAddress"></v-text-field>
        </div>
        <div>
          <v-text-field label="Company Phone*" required v-model="tempItem.compPhone"></v-text-field>
        </div>
      </v-card-text>

      <v-card-text v-else>
        <div>
          <v-text-field label="Company name*" required v-model="tempItemGrup.grcpName"></v-text-field>
        </div>
        <div>
          <v-text-field label="Company address*" required v-model="tempItemGrup.grcpAddress"></v-text-field>
        </div>
        <div>
          <v-text-field label="Company Phone*" required v-model="tempItemGrup.grcpTelp"></v-text-field>
        </div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Close"
          variant="plain"
          @click="handleCloseEdit"
        ></v-btn>

        <v-btn
          color="primary"
          text="Save"
          variant="tonal"
          :loading="loading"
          @click="beforeSaveEdit"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="addDialog"
    max-width="600">
    <v-card
      prepend-icon="mdi-account"
      :title="isCompany ? 'Company Profile' : 'Grup Profile'">
      <template v-if="isCompany">
        <v-card-text >
          <div>
            <v-text-field label="Company name*" required v-model="tempItem.compName"></v-text-field>
          </div>
          <div>
            <v-text-field label="Company address*" required v-model="tempItem.compAddress"></v-text-field>
          </div>
          <div>
            <v-text-field label="Company Phone*" required v-model="tempItem.compPhone"></v-text-field>
          </div>
        </v-card-text>
      </template>

      <template v-else> 
        <v-card-text>
          <div>
            <v-text-field label="Company Grup name*" required v-model="tempItemGrup.grcpName"></v-text-field>
          </div>
          <div>
            <v-text-field label="Company Grup address*" required v-model="tempItemGrup.grcpAddress"></v-text-field>
          </div>
          <div>
            <v-text-field label="Company Grup Phone*" required v-model="tempItemGrup.grcpTelp"></v-text-field>
          </div>
        </v-card-text>
      </template>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          text="Close"
          variant="plain"
          @click="handleCloseEdit"
        ></v-btn>

        <v-btn
          color="primary"
          text="Save"
          variant="tonal"
          :loading="loading"
          @click="beforeSaveAdd"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
 </div>
</template>

<script>
import { editCompany, listCompanyGrup, editCompanyGrup, addCompanyGrup, addCompany } from '@/api/dashboard'
import AuthSvc from '@/services/AuthSvc'
export default {
 data () {
  return {
    dataCompany: [],
    dataCompanyGrup: [],
    loading: false,
    headers: [
      { title: 'Company Name', value: 'compName' },
      { title: 'Address', value: 'compAddress' },
      { title: 'Phone', value: 'compPhone' },
    ],
    headersGrup: [
      { title: 'Company Group Name', value: 'grcpName' },
      { title: 'Address', value: 'grcpAddress' },
      { title: 'Phone', value: 'grcpTelp' },
    ],
    tempItem: {},
    tempItemGrup: {},
    editDialog: false,
    isCompany: 0,
    addDialog: false,
  }
 },

 mounted () {
  console.log('mounted')
  this.getListCompany()
  this.getListCompanyGrup()
 },

 methods: {
  getLogin () {
    this.loading = true
    AuthSvc.loginTest().then((response) => {
    //  this.dataCompany = response.data.data
    this.loading = false
   }).catch((error) => {
    this.loading = false
   })
  },

  getListCompany () {
    this.loading = true
    AuthSvc.listCompany().then((response) => {
      console.log('resp', response.data.data)
     this.dataCompany = response.data.data
     this.loading = false
   }).catch((error) => {
    console.log('err', error)
    this.loading = false
   })
  },

  getListCompanyGrup () {
    this.loading = true
    listCompanyGrup().then((response) => {
     this.dataCompanyGrup = response.data.data
     this.loading = false
   }).catch((error) => {
    console.log('err', error)
    this.loading = false
   })
  },

  async doneLogin(token) {
    console.log('token', token)
    AuthSvc.login(token).then((response) => {
    //  this.dataCompany = response.data.data
    this.loading = false
   }).catch((error) => {
    console.log('err', error)
    this.loading = false
   })
  },

  callbackGoogle (response) {
    this.doneLogin(response.credential)
  },

  editData (event, row) {
    console.log('data', row.item)
    this.tempItem = row.item
    this.isCompany = 1
    this.editDialog = true
  },

  handleCloseEdit () {
    this.tempItem = {}
    this.isCompany = 0
    this.editDialog = false
    this.addDialog = false
  },

  beforeSaveEdit () {
    if (this.isCompany) {
      this.handleSaveEdit()
    } else {
      this.handleSaveEditGrup()
    }
  },

  handleSaveEdit () {
    this.loading = true
    let dataComp = { 
      compId: this.tempItem.compId,
      compGrcpId: this.tempItem.compGrcpId,
      compName: this.tempItem.compName,
      compAddress: this.tempItem.compAddress,
      compPhone: this.tempItem.compPhone,
      compPIC: this.tempItem.compPIC,
      compPICPhone: this.tempItem.compPICPhone,
      compStatus: this.tempItem.compStatus
    }
    editCompany(dataComp).then((response) => {
    //   console.log('resp', response.data.data)
    //  this.dataCompany = response.data.data
     this.loading = false
     this.tempItem = {}
     this.editDialog = false
     this.isCompany = 0
     this.getListCompany()
   }).catch((error) => {
    console.log('err', error)
    this.loading = false
   })
  },

  editDataGrup (event, row) {
    this.tempItemGrup = row.item
    this.editDialog = true
  },

  handleSaveEditGrup () {
    this.loading = true
    let data = { 
      grcpId: this.tempItemGrup.grcpId,
      grcpName: this.tempItemGrup.grcpName,
      grcpAddress: this.tempItemGrup.grcpAddress,
      grcpNickName: this.tempItemGrup.grcpNickName,
      grcpFax: this.tempItemGrup.grcpFax,
      grcpTelp: this.tempItemGrup.grcpTelp
    }
    editCompanyGrup(data).then((response) => {
    //   console.log('resp', response.data.data)
    //  this.dataCompany = response.data.data
     this.loading = false
     this.tempItemGrup = {}
     this.editDialog = false
     this.isCompany = 0
     this.getListCompanyGrup()
   }).catch((error) => {
    console.log('err', error)
    this.loading = false
   })
  },

  handleSaveGrup () {
    this.loading = true
    let data = { 
      grcpId: this.tempItemGrup.grcpId,
      grcpName: this.tempItemGrup.grcpName,
      grcpAddress: this.tempItemGrup.grcpAddress,
      grcpNickName: this.tempItemGrup.grcpNickName,
      grcpFax: this.tempItemGrup.grcpFax,
      grcpTelp: this.tempItemGrup.grcpTelp
    }
    addCompanyGrup(data).then((response) => {
    //   console.log('resp', response.data.data)
    //  this.dataCompany = response.data.data
     this.loading = false
     this.tempItemGrup = {}
     this.addDialog = false
     this.isCompany = 0
     this.getListCompanyGrup()
   }).catch((error) => {
    console.log('err', error)
    this.loading = false
   })
  },

  handleSaveCompany () {
    this.loading = true
    let data = { 
      compName: this.tempItem.compName,
      compAddress: this.tempItem.compAddress,
      compPhone: this.tempItem.compPhone,
      compGrcpId: 1
    }
    addCompany(data).then((response) => {
    //   console.log('resp', response.data.data)
    //  this.dataCompany = response.data.data
     this.loading = false
     this.tempItem = {}
     this.addDialog = false
     this.isCompany = 0
     this.getListCompany()
   }).catch((error) => {
    console.log('err', error)
    this.loading = false
   })
  },

  beforeSaveAdd () {
    if (this.isCompany) {
      this.handleSaveCompany()
    } else {
      this.handleSaveGrup()
    }
  },

  hadleAddGrup () {
    console.log('aa')
    this.isCompany = 0
    this.tempItemGrup = {
      grcpName: '',
      grcpAddress: '',
      grcpTelp: ''
    }
    this.addDialog = true
  },

  hadleAddCompany () {
    this.isCompany = 1
    console.log('aaa')
    this.tempItem = {
      compName: '',
      compAddress: '',
      compPhone: ''
    }
    this.addDialog = true
  }

 }
 
}
</script>