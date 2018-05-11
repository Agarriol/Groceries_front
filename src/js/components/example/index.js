import template from './index.pug';
import { assertNullLiteral } from 'babel-types';
// TODO, BORRAR TODO
export default Vue.extend({
  template: template(),
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
    checkForm: function checkForm() {
      if (!this.email) {
        this.errors.push('email');
      }
    },
    addUser: function addUser() {
      if (this.password !== this.passwordConfirm) {
        this.errors.push('Las contraseñas no coinciden.');
        this.passwordHasError = true;
        this.passwordConfirmHasError = true;
        return; // TODO, ¿este return está bien?
      }

      API.user.registration({
        user: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      }).then(response => {
        if (response.status === 422) {
          this.varErrorReset();

          // Pasar la respuesta de json a object (hash)
          response.data.errors = Object.keys(response.data.errors);

          this.errors.push(response.data.errors);
          for (let i = 0; i < response.data.errors.length; i++) {
            this.errors.push(response.data.errors[i]);
            // TODO, esto se tiene que poder hacer con un bucle
            if (response.data.errors[i] === 'name') {
              this.errorsVar.nameHasError = true;
            } else if (response.data.errors[i] === 'email') {
              this.errorsVar.emailHasError = true;
            } else if (response.data.errors[i] === 'password') {
              this.errorsVar.passwordHasError = true;
            }
          }
        } else {
          // se ha añadido el usuario correctamente =)
        }
      });

    },
    varReset() {
      // TODO, función generica con un bucle, para todos los formularios
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
