<template>
    <v-snackbar
      v-model="show"
      :timeout="3000"
      :color="notif.type"
      :centered="true"
      :dark="true"
      location="top">
      {{ notif.message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          icon
          v-bind="attrs"
          @click="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </template>
  
  <script>
  export default {
    data () {
      return {
        show: false
      }
    },
  
    computed: {
      notif () {
        return this.$store.getters.snackbar
      }
    },
  
    watch: {
      notif: {
        deep: true,
        handler (notif) {
          this.show = true
          if (notif.code === 411) {
            this.$router.push('/login')
          }
        }
      }
    }
  }
  </script>
  