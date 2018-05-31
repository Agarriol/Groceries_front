import ExampleComponent from 'js/components/example/index.js';

import template from './index.pug';

export default Vue.extend({
  template: template(),
  components: {
    ExampleComponent
  },
  data() {
    return {
      name: null,
      email: null,
      password: null,
      passwordConfirm: null,
      errors: [],
      errorsVar: {
        nameHasError: false,
        emailHasError: false,
        passwordHasError: false,
        passwordConfirmHasError: false
      },
      registration: false
    };
  },
  methods: {
    addUser: function addUser() {
      API.user.registration({
        user: {
          name: this.name,
          email: this.email,
          password: this.password,
          password_confirmation: this.passwordConfirm
        }
      }).then(() => {
        // se ha añadido el usuario correctamente =)
        this.registration = true;
      }, response => {
        // Hay algún error
        if (response.status === 422) {
          this.varErrorReset();

          response.data.errors = Object.keys(response.data.errors);

          // this.errors.push(response.data.errors);
          for (let i = 0; i < response.data.errors.length; i++) {
            this.errors.push(response.data.errors[i]);
            // TODO, esto se tiene que poder hacer con un bucle
            if (response.data.errors[i] === 'name') {
              this.errorsVar.nameHasError = true;
            } else if (response.data.errors[i] === 'email') {
              this.errorsVar.emailHasError = true;
            } else if (response.data.errors[i] === 'password') {
              this.errorsVar.passwordHasError = true;
            } else if (response.data.errors[i] === 'password_confirmation') {
              this.errorsVar.passwordConfirmHasError = true;
            }
          }
        }
      });
    },
    varReset() {
      // TODO, función ge{{name}}nerica con un bucle, para todos los formularios
      this.name = null;
      this.email = null;
      this.password = null;
      this.passwordConfirm = null;
    },
    varErrorReset() {
      // TODO, función generica con un bucle, para todos los formularios
      this.errors = [];
      this.errorsVar.nameHasError = false;
      this.errorsVar.emailHasError = false;
      this.errorsVar.passwordHasError = false;
      this.errorsVar.passwordConfirmHasError = false;
    }
  }
});
