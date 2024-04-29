import axios from 'axios';

const service = axios.create({
  baseURL: 'http://localhost',
  timeout: 30000 // request timeout
 })

export default {
  signInWithToken(token) {
    return axios.post(`/security/authentication/login?token=${token}`);
  },
  getUserStatus() {
    return axios.get('/security/authentication/status');
  },
  setCompany(companyId) {
    return axios.get(`/security/authentication/setcompany/${companyId}`);
  },
  async login() {
    const response = await service.get('/security/authentication/login', { withCredentials: true } )
    console.log('header', response)
    // service.defaults.withCredentials = true;
   },
  listCompany() {
    return service.get('/master/company', { 
      withCredentials: true,
      headers: {
        // 'Access-Control-Allow-Credentials': true,
        'content-Type': 'application/json',
        'Accept': '/',
        // 'Cookie': 'SmartXTrackSessionId=872012461b80646e600d73c18c036788063560a07ad1355df985cfa1d3b62afe'
      }, 
      credentials: "same-origin"
    })
  },
};
