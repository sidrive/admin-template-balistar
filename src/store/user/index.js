import UserSvc from '../../services/UserSvc';

const SET_USER_PERMISSION = 'set_user_permission';

function normalizeData(v) {
  return JSON.parse(v);
}

// noinspection JSUnusedGlobalSymbols
const user = {
  namespaced: true,
  state: {
    permissions: [],
  },
  getters: {
    permissions(state) {
      return state.permissions;
    },
  },
  mutations: {
    [SET_USER_PERMISSION](state, v) {
      state.permissions = v;
    },
  },
  actions: {
    async getUserPermission({ commit }) {
      const params = {
        max: 100,
      };
      let permissions = [];
      try {
        await UserSvc.getUserRolePermissions(params)
          .then((res) => {
            if (res.data.status.error === 0) {
              permissions = res.data.data;
              permissions = permissions.map((v) => ({
                permission: v.rperPrms.prmsName,
                operations: normalizeData(v.rperOperations),
              }));
            }
          });
      } catch (e) {
        console.log(e.message);
      }
      commit(SET_USER_PERMISSION, permissions);
    },
  },
};

export default user;
