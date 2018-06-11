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
        title: false,
        description: false
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
        }
      ).then(response => {
        // No ha habido errores
        router.push({name: 'showList', params: {id: response.id}});
      }, response => {
        // Ha habido errores
        this.processErrors(response);
      });
    }
  },
  computed: {
  },
  created() {
  }
});
