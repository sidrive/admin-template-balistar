import * as Vue from 'vue';
import AuthSvc from '@/services/AuthSvc';

const RESET_ACTIVE_COMPANY_STATE = 'reset_active_company_state';
const RESET_USER_DATA = 'reset_user_data';
const SET_ACTIVE_COMPANY = 'set_active_company';
const SET_AVAILABLE_COMPANY = 'set_available_company';
const SET_USER_ACCESS = 'set_user_access';
const SET_USER_ID = 'set_user_id';
const SET_USER_TOKEN = 'set_user_token';

// noinspection JSUnusedGlobalSymbols
const auth = {
  namespaced: true,
  state: {
    activeCompany: undefined,
    activeGroup: undefined,
    availableCompany: [],
    userAccess: {},
    userId: undefined,
    isAuthenticated: false,
  },
  getters: {
    activeCompany(state) {
      if (state.activeCompany) {
        state.activeCompany = JSON.parse(sessionStorage.getItem('activeCompany'));
      }

      return state.activeCompany;
    },
    activeGroup(state) {
      if (state.activeGroup) {
        state.activeGroup = JSON.parse(sessionStorage.getItem('activeGroup'));
      }

      return state.activeGroup;
    },
    isAuthenticated(state) {
      state.isAuthenticated = parseInt(sessionStorage.getItem('isAuthenticated')) === 1;
      return state.isAuthenticated;
    },
    userAccess(state) {
      return state.userAccess;
    },
    availableCompany(state) {
      return state.availableCompany;
    },
    availableGroup(state) {
      const availableCompanies = state.availableCompany;
      return Vue._.uniqBy(Object.values(availableCompanies).map((v) => v.compGrcp), (v) => v.grcpId);
    },
    isAuthorized(state) {
      return (module, action) => {
        const access = state.userAccess[module];
        if (Array.isArray(access)) {
          return access.find(action) !== -1;
        }
        return false;
      };
    },
  },
  mutations: {
    [RESET_ACTIVE_COMPANY_STATE](state) {
      state.activeCompany = undefined;
      state.activeGroup = undefined;
      sessionStorage.removeItem('activeCompany');
      sessionStorage.removeItem('activeGroup');
    },
    [RESET_USER_DATA](state) {
      state.userId = undefined;
      state.userAccess = [];
      state.availableCompany = [];
    },
    [SET_ACTIVE_COMPANY](state, { company, group }) {
      state.activeCompany = company;
      state.activeGroup = group;
      sessionStorage.setItem('activeCompany', JSON.stringify(company));
      sessionStorage.setItem('activeGroup', JSON.stringify(group));
    },
    [SET_USER_ACCESS](state, v) {
      state.userAccess = v;
    },
    [SET_USER_TOKEN](state, v) {
      state.isAuthenticated = v;
      sessionStorage.setItem('isAuthenticated', v);
    },
    [SET_USER_ID](state, v) {
      sessionStorage.setItem('userId', v);
      state.userId = v;
    },
    [SET_AVAILABLE_COMPANY](state, v) {
      state.availableCompany = v;
    },
  },
  actions: {
    async signIn({ commit }, token) {
      try {
        await AuthSvc.signInWithToken(token);
        commit(SET_USER_TOKEN, 1);
      } catch (e) {
        commit(SET_USER_TOKEN, 0);
        throw e;
      }
    },
    logout({ commit }) {
      commit(SET_USER_TOKEN, 0);
      sessionStorage.removeItem('isAuthenticated');
      sessionStorage.removeItem('userId');
      commit(RESET_ACTIVE_COMPANY_STATE);
    },
    async changeActiveCompany({ commit }, { company, group }) {
      commit(RESET_ACTIVE_COMPANY_STATE);
      commit(SET_ACTIVE_COMPANY, { company, group });
      await AuthSvc.setCompany(company.compId);
    },
    async getUser({ commit }) {
      commit(RESET_USER_DATA);
      const userStatus = await AuthSvc.getUserStatus();
      const availableCompany = userStatus.data.company ? userStatus.data.company.available : {};
      commit(SET_USER_ID, userStatus.data.user);
      commit(SET_USER_ACCESS, userStatus.data.access);
      commit(SET_AVAILABLE_COMPANY, availableCompany);
      if (userStatus.data.company && userStatus.data.company.active) {
        let companyActive = userStatus.data.company.active;
        if (Vue._.isNumber(companyActive)) {
          companyActive = availableCompany[companyActive];
        }
        commit(SET_ACTIVE_COMPANY, {
          company: companyActive,
          group: companyActive.compGrcp,
        });
      } else {
        commit(SET_USER_TOKEN, 0);
        sessionStorage.removeItem('isAuthenticated');
        sessionStorage.removeItem('userId');
        commit(RESET_ACTIVE_COMPANY_STATE);
        // this.$router.push('/auth/login');
        // console.log(userStatus);
      }
    },
  },
};

export default auth;
