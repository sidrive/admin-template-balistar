<template>
 <v-navigation-drawer
   :mini-variant="mini"
   :mini-variant-width="45"
   fixed
   permanent
   app
   class="zen-app-drawer">
   <v-list flat>
     <!-- dashboard -->
     <v-list-item
       to="/dashboard"
       class="zen-app-drawer--item-home">
       <v-list-item-icon>
         <!-- <svg-icon name="ic_home_new"></svg-icon> -->
       </v-list-item-icon>
       <v-list-item-title>
         Dashboard
       </v-list-item-title>
     </v-list-item>

     <!-- ITEM LOOP -->
     <template v-for="(item, key) in items" :key="key">
       <v-subheader
         v-if="!mini"
         :key="item.title"
         class="font-bold"
         style="background: #F5F5F5">
         {{ item.title }}
       </v-subheader>
       <v-divider></v-divider>
       <v-list-item
         v-for="(subItem) in item.items"
         :key="subItem.title"
         :to="subItem.link">
         <v-list-item-icon>
           <!-- <svg-icon :name="subItem.icon"></svg-icon> -->
         </v-list-item-icon>
         <v-list-item-title>
           {{ subItem.title }}
         </v-list-item-title>
       </v-list-item>
     </template>

     <!-- LOGOUT -->
     <v-list-item @click="getLogout">
       <v-list-item-icon>
         <!-- <svg-icon name="ic_logout"></svg-icon> -->
       </v-list-item-icon>
       <span v-if="!mini">Logout</span>
     </v-list-item>
   </v-list>
 </v-navigation-drawer>
</template>

<script>
export default {
 data () {
   return {
     items: [
       {
         title: 'Zenwel Biz',
         icon: '$vuetify.icons.zenwel_biz_logo',
         active: true,
         items: [
           { title: 'Package', icon: 'ic_package_new', link: '/zenwel-biz/package' },
           { title: 'Business', icon: 'ic_business_new', link: '/zenwel-biz/business' },
           { title: 'Billing', icon: 'ic_billing', link: '/zenwel-biz/billing' },
           { title: 'Marketplace', icon: 'ic_marketplace', link: '/zenwel-biz/marketplace' },
           { title: 'Biz Deals', icon: 'ic_biz-deal_new', link: '/zenwel-biz/biz-deals' }
         ]
       },
       // {
       //   title: 'Marketplace & Widget',
       //   icon: '$vuetify.icons.zenwel_biz_logo2',
       //   active: true,
       //   items: [
       //     { title: 'Marketplace User', icon: 'ic_marketplace-user', link: '/marketplace-user' },
       //     { title: 'Deals', icon: 'ic_marketplace-deals', link: '/deals' }
       //   ]
       // },
       {
         title: 'Admin',
         icon: '$vuetify.icons.admin_logo_sidebar',
         active: true,
         items: [
           { title: 'Admin List', icon: 'ic_admin-list_new', link: '/admin' },
           { title: 'Blog', icon: 'ic_blog_new', link: '/blog' },
           { title: 'Submission', icon: 'ic_submission', link: '/submission' }
         ]
       },
       {
         title: 'Report & Analysist',
         icon: '$vuetify.icons.report_analist_logo',
         active: true,
         items: [
           { title: 'Finance', icon: 'ic_reportanalysis_new', link: '/report' },
           { title: 'Analytics', icon: 'ic_analytics', link: '/analytics' }
         ]
       }
     ]
   }
 },

 computed: {
   mini () {
     return this.$store.getters.sidebarCollapse
   },
   user () {
     return this.$store.getters.user
   }
 },

 methods: {
   getLogout () {
     this.$store.dispatch('LogOut', this.data).then(() => {
       this.$router.push('/login')
     })
   }
 }
}
</script>
