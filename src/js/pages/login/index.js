import {mapActions} from 'vuex';
import router from 'js/router.js';
import template from './index.pug';

export default Vue.extend({
  template: template(),
  components: {

  },
  data() {
    return {
      email: null,
      password: null,
      errors: []
    };
  },
  methods: {
    ...mapActions([
      'saveUser' // mapea this.saveUser() to this.$store.dispatch('saveUSer')
    ]),
    addUser: function addUser() {
      API.user.session({
        session: {
          email: this.email,
          password: this.password
        }
      }).then(response => {
        localStorage.setItem('groceries_token', response.session.jwt);
        this.$store.dispatch('saveUser', {
          token: response.session.jwt,
          email: response.session.email,
          name: JSON.parse(atob(response.session.jwt.split('.')[1])).user,
          id: JSON.parse(atob(response.session.jwt.split('.')[1])).userId
        });
        router.push('/list');
      }, response => {
        if (response.status === 422) {
          this.varErrorReset();
          this.errors.push(Vue.i18n.t('loginPage.credentials'));
        }
      });
    },
    varErrorReset() {
      this.errors = [];
    }
  },
  created() {
  }
});
