import router from 'js/router.js';
import template from './create.pug';

export default Vue.extend({
  template: template(),
  components: {
  },
  data() {
    return {
      userToken: this.$store.state.users.userToken,
      title: null,
      description: null,
      errors: [],
      errorsVar: {
        titleHasError: false,
        descriptionHasError: false
      },
    };
  },
  methods: {
    addList() {
      API.list.create(
        {
          list: {
            title: this.title,
            description: this.description
          }
        },
        {headers: {Authorization: `Bearer ${this.userToken}`}}
      ).then(response => {
        // No ha habido errores
        router.push({name: 'showList', params: {id: response.id}});
      }, response => {
        // Ha habido errores
        if (response.status === 422) {
          this.varErrorReset();

          response.data.errors = Object.keys(response.body);

          for (let i = 0; i < response.data.errors.length; i++) {
            this.errors.push(`${response.data.errors[i]}: ${response.data[response.data.errors[i]]}`);

            if (response.data.errors[i] === 'title') {
              this.errorsVar.titleHasError = true;
            } else if (response.data.errors[i] === 'description') {
              this.errorsVar.descriptionHasError = true;
            }
          }
        }
      });
    },
    varErrorReset() {
      this.errors = [];
      this.errorsVar.titleHasError = false;
      this.errorsVar.descriptionHasError = false;
    }
  },
  computed: {
  },
  created() {
  }
});
