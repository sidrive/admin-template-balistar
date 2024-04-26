<template>
 <v-app>
   <sidebar />

   <appbar />

   <!-- Sizes your content based upon application components -->
   <v-main id="main-content">
     <v-sheet
       id="scrolling-techniques-7">
       <v-container fluid>
         <router-view />
       </v-container>
     </v-sheet>
   </v-main>

   <v-footer app>
     <!-- -->
   </v-footer>
 </v-app>
</template>

<script>
import Sidebar from '@/views/_partials/Sidebar'
import Appbar from '@/views/_partials/Appbar'
export default {
 components: {
   Sidebar,
   Appbar
 }
}
</script>
