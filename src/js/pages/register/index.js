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
      password_confirmation: null,
      errors: [],
      errorsVar: {
        name: false,
        email: false,
        password: false,
        password_confirmation: false
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
          password_confirmation: this.password_confirmation
        }
      }).then(() => {
        // se ha añadido el usuario correctamente =)
        this.registration = true;
      }, response => {
        // Hay algún error
        this.processErrors(response);
      });
    }
  }
});
