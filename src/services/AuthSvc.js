import axios from 'axios';
import { wrapper } from 'axios-cookiejar-support';
import { CookieJar } from 'tough-cookie';

// const jar = new CookieJar();

const service = axios.create({
  baseURL: 'https://pulung.yangpunya.com',
  withCredentials: true,
  withXSRFToken: true,
  timeout: 30000 // request timeout
 })
// const service = wrapper(axios.create({ jar }));

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
  async loginTest() {
    const response = await service.get(`/auth`)
    // console.log('header', response)
    // service.defaults.withCredentials = true;
   },
  async login(token) {
    // const response = await service.get(`/security/authentication/login?token=${token}`, { withCredentials: true } )
    const response = await service.get(`/security/authentication/login?token=${token}`)
    // console.log('header', response)
    // service.defaults.withCredentials = true;
   },
  listCompany() {
    return service.get('/master/company', { withCredentials: true })
    // return service.get('https://pulung.yangpunya.com/master/company', { 
    //   withCredentials: true,
    //   headers: {
    //   // //   // 'Access-Control-Allow-Credentials': true,
    //   // //   // 'Access-Control-Allow-Origin': 'http://localhost:3000',
    //     'content-Type': 'application/json',
    //     'Accept': '/',
    //   //   // Cookie: 'SmartXTrackSessionId=872012461b80646e600d73c18c036788063560a07ad1355df985cfa1d3b62afe'
    //   }, 
    //   credentials: "include"
    // })
  },
};
