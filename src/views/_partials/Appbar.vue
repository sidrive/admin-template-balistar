
<template>
 <v-app-bar
   absolute
   elevate-on-scroll
   scroll-target="#scrolling-techniques-7"
   app>
   <v-toolbar-title>
     <template v-if="$route.meta.with_back_app_header">
       <v-btn text @click="$router.back()">
         <v-icon>mdi-arrow-left</v-icon>
       </v-btn>
     </template>
     <template v-else>
       <v-btn text @click="$store.dispatch('toggleSidebarCollapse')">
         <v-icon>mdi-menu</v-icon>
       </v-btn>
     </template>
     {{ $route.meta.title || $route.name }}
   </v-toolbar-title>

   <v-spacer></v-spacer>

   <v-btn icon class="mr-1" @click="goToMyAccount">
     <v-avatar v-if="isAvatar" color="grey lighten-2">
       <img :src="avatar">
     </v-avatar>
     <v-avatar v-else color="brown">
       <span class="white--text headline">
         <!-- {{ user.user_initial }} -->
       </span>
     </v-avatar>
   </v-btn>
 </v-app-bar>
</template>

<script>
// import { detailAdmin } from '@/api/admin'

export default {
 data () {
   return {
     avatar: null,
     isAvatar: false
   }
 },

 computed: {
   user () {
     return this.$store.getters.user
   }
 },

 mounted () {
   // this.getAvatar()
 },

 methods: {
   // goToMyAccount () {
   //   this.$router.push({
   //     path: '/admin/' + this.user.id
   //   })
   // },
   // getAvatar () {
   //   detailAdmin(this.user.id).then((response) => {
   //     this.isAvatar = this.isImage(response.data.data.photo)
   //     this.avatar = response.data.data.photo
   //   })
   // },
   // isImage (url) {
   //   return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url)
   // }
 }
}
</script>
