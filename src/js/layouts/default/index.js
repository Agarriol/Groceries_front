import {mapActions} from 'vuex';
import router from 'js/router.js';
import template from './index.pug';

export default Vue.extend({
  template: template({}),
  data() {
    return {
      users: {
        userName: this.$store.state.users.userName,
        userToken: this.$store.state.users.userToken
      }
    };
  },
  computed: {
  },
  methods: {
    ...mapActions([
      'deleteUser'
    ]),
    loginOut: function loginOut() {
      console.log(this.users.userToken);
      API.user.deleteSession({headers: {Authorization: 'Bearer '+ this.users.userToken}}).then(response => {

        if (response.status === 204) {
          localStorage.clear();
          this.$store.dispatch('deleteUser');
          router.push('/login');
        } else {
          // TODO, ha ido mal la desconexión
        }
      });
    }
  },
  // Hace falta created para que actualice.
  created: function () {
    this.users = this.$store.getters.loginUser;
  }
});
