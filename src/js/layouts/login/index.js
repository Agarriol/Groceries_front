import template from './index.pug';

export default Vue.extend({
  template: template({}),
  data() {
    return {
    };
  },
  computed: {
    route() {
      return this.$route;
    },
  },
  methods: {
  },
  created() {
  }
});
