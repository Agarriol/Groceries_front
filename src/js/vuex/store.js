import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {
      userToken: localStorage.getItem('token'),
      userName: localStorage.getItem('token') ? JSON.parse(atob(localStorage.getItem('token').split('.')[1])).user : '',
      userEmail: localStorage.getItem('token') ? JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userEmail : '',
      userId: localStorage.getItem('token') ? JSON.parse(atob(localStorage.getItem('token').split('.')[1])).userId : ''
    }
  },
  mutations: {
    saveUser(state, user) {
      state.users.userToken = user.token;
      state.users.userName = user.name;
      state.users.userEmail = user.email;
      state.users.userId = user.id;
    },
    deleteUser(state) {
      state.users.userToken = '';
      state.users.userName = '';
      state.users.userEmail = '';
      state.users.userId = '';
    }
  },
  actions: {
    saveUser(context, user) {
      context.commit('saveUser', user);
    },
    deleteUser(context) {
      context.commit('deleteUser');
    }
  },
  getters: {
    // loginUser(state) { return state.users; }
    loginUser: state => {
      return state.users;
    }
  }
});
