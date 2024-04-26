import axios from 'axios';

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
};
