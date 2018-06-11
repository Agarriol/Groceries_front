import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    users: {
      userToken: localStorage.getItem('groceries_token'),
      userName: localStorage.getItem('groceries_token') ? JSON.parse(atob(localStorage.getItem('groceries_token').split('.')[1])).user : '',
      userEmail: localStorage.getItem('groceries_token') ? JSON.parse(atob(localStorage.getItem('groceries_token').split('.')[1])).userEmail : '',
      userId: localStorage.getItem('groceries_token') ? JSON.parse(atob(localStorage.getItem('groceries_token').split('.')[1])).userId : ''
    },
    lists: []
  },
  mutations: {
    saveUser(state, user) {
      state.users.userToken = user.token || state.users.userToken;
      state.users.userName = user.name;
      state.users.userEmail = user.email;
      state.users.userId = user.id || state.users.userId;
    },
    deleteUser(state) {
      state.users.userToken = '';
      state.users.userName = '';
      state.users.userEmail = '';
      state.users.userId = '';
    },
    saveList(state, lists) {
      state.lists = lists.lists;
    }
  },
  actions: {
    saveUser(context, user) {
      context.commit('saveUser', user);
    },
    deleteUser(context) {
      context.commit('deleteUser');
    },
    saveList(context, lists) {
      context.commit('saveList', lists);
    }
  },
  getters: {
    // loginUser(state) { return state.users; }
    loginUser: state => {
      return state.users;
    },
    getLists: state => {
      return state.lists;
    }
  }
});
