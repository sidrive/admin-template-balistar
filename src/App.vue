<template>
  <v-app>
    <notify />
    <v-main id="main-content">
      <v-sheet
        id="scrolling-techniques-7">
        <v-container fluid>
          <router-view />
        </v-container>
      </v-sheet>
    </v-main>
  </v-app>
</template>

<script>
  import Notify from '@/components/Notify'
  export default {
    name: 'App',

    components: {
      Notify
    },

    data: () => ({
      //
    })
  }
</script>
