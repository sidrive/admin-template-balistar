const getters = {
 token: state => state.user.token,
 // user: state => state.user.user,
 // sidebarCollapse: state => state.app.sidebarCollapse,
 snackbar: state => state.app.snackbar,
 customeCurrency: state => state.app.customeCurrency
}
export default getters
