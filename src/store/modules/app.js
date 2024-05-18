const app = {
    state: {
      sidebarCollapse: true,
      snackbar: {
        show: false,
        message: '',
        type: ''
      },
      customeCurrency: 'USD'
    },
  
    mutations: {
      SET_SIDEBAR_COLLAPSE: (state, payload) => {
        state.sidebarCollapse = payload
      },
  
      SET_SNACKBAR: (state, data) => {
        const obj = {
          ...data,
          show: true
        }
        state.snackbar = obj
      },
      SET_CUSTOME_CURRENCY: (state, payload) => {
        state.customeCurrency = payload
      }
    },
  
    actions: {
      toggleSidebarCollapse ({ commit, state }) {
        commit('SET_SIDEBAR_COLLAPSE', !state.sidebarCollapse)
      },
  
      showSnackbar ({ commit }, data) {
        commit('SET_SNACKBAR', data)
      },
      actCustomeCurrency ({ commit }, data) {
        commit('SET_CUSTOME_CURRENCY', data)
      }
    }
  }
  
  export default app
  