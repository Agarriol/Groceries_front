import {mapActions} from 'vuex';
import template from './index.pug';

export default Vue.extend({
  template: template(),
  components: {
  },
  data() {
    return {
      name: this.$store.state.users.userName,
      email: this.$store.state.users.userEmail,
      passwordCurrent: null,
      passwordNew: null,
      passwordNewConfirm: null,
      errors: [],
      errorsVar: {
        nameHasError: false,
        emailHasError: false,
        passwordCurrentHasError: false,
        passwordNewHasError: false,
        passwordNewConfirmHasError: false,
      },
      changeData: false,
      userId: this.$store.state.users.userId,
      userToken: this.$store.state.users.userToken,
      updateData: {}
    };
  },
  methods: {
    addData: function addData() {
      if (this.passwordCurrent !== null || this.passwordNew !== null || this.passwordNewConfirm !== null) {
        this.updateData.user = {
          name: this.name,
          email: this.email,
          current_password: this.passwordCurrent,
          password: this.passwordNew,
          password_confirmation: this.passwordNewConfirm
        };
      } else {
        this.updateData.user = {
          name: this.name,
          email: this.email
        };
      }
    },
    addUser: function addUser() {
      this.addData();
      API.user.update(this.userId, this.updateData, {
        headers: {
          Authorization: 'Bearer '+ this.userToken
        }
      }).then(response => {
        this.changeData = true;
        this.$store.dispatch('saveUser', {
          email: this.email,
          name: this.name
        });
      }, response => { 
        if (response.status === 422) {
          this.varErrorReset();

          response.data = Object.keys(response.data);

          for (let i = 0; i < response.data.length; i++) {
            this.errors.push(response.data[i]);

            if (response.data[i] === 'name') {
              this.errorsVar.nameHasError = true;
            } else if (response.data[i] === 'email') {
              this.errorsVar.emailHasError = true;
            } else if (response.data[i] === 'current_password') {
              this.errorsVar.passwordCurrentHasError = true;
            } else if (response.data[i] === 'password_confirmation') {
              this.errorsVar.passwordNewHasError = true;
              this.errorsVar.passwordNewConfirmHasError = true;
            }
          }
        }
      });
    },
    varReset() {
      this.name = null;
      this.email = null;
      this.passwordCurrent = null;
      this.passwordNew = null;
      this.passwordNewConfirm = null;
    },
    varErrorReset() {
      this.errors = [];
      this.errorsVar.nameHasError = false;
      this.errorsVar.emailHasError = false;
      this.errorsVar.passwordCurrentHasError = false;
      this.errorsVar.passwordNewHasError = false;
      this.errorsVar.passwordNewConfirmHasError = false;
    }
  }
});