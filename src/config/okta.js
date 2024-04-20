// const oktaConfig = {
//   issuer: 'https://dev-13906289.okta.com/oauth2/ausc0pswnIUqeSjH15d6',
//   // clientId: '0oa8bazwvp9webi8M5d7', // client id https://ramus-dev.qbit.co.id
//   clientId: '0oabxeb5aHQCJEOcD5d6', // HS client id https://dev.local.ramus.id
//   // redirectUri: 'https://dev.local.ramus.id/api/security/authentication/login',
//   // redirectUri: 'https://ramus-dev.qbit.co.id/login/callback',
//   redirectUri: 'https://dev.local.ramus.id/login/callback',
//   scope: 'openid profile email',
//   // Use authorization_code flow
//   responseType: 'code',
//   pkce: false,
// }

const oktaConfig = {
  issuer: 'https://dev-02183571.okta.com/oauth2/default',
  clientId: '0oagfpzn2n0ZNNMvW5d7',
  redirectUri: window.location.origin + '/login/callback',
  scopes: ['openid', 'profile', 'email']
}

export default oktaConfig