import template from './index.pug';

export default Vue.extend({
  template: template(),
  components: {
  },
  data() {
    return {
      name: this.$store.state.users.userName,
      email: this.$store.state.users.userEmail,
      current_password: '',
      password: '',
      password_confirmation: '',
      errors: [],
      errorsVar: {
        name: false,
        email: false,
        current_password: false,
        password: false,
        password_confirmation: false,
      },
      changeData: false,
      userId: this.$store.state.users.userId,
      userToken: this.$store.state.users.userToken,
      updateData: {}
    };
  },
  methods: {
    addData: function addData() {
      if (this.current_password !== '' || this.password !== '' || this.password_confirmation !== '') {
        this.updateData.user = {
          name: this.name,
          email: this.email,
          current_password: this.current_password,
          password: this.password,
          password_confirmation: this.password_confirmation
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
      API.user.update(this.userId, this.updateData).then(() => {
        this.changeData = true;
        this.$store.dispatch('saveUser', {
          email: this.email,
          name: this.name
        });
        window.scrollTo(0, 0);
      }, response => {
        if (response.status === 422) {
          this.processErrors(response);
        }
      });
    }
  }
});
