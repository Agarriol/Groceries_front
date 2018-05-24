
import template from './show.pug';

export default Vue.extend({
  template: template(),
  components: {
  },
  data() {
    return {
      userId: this.$store.state.users.userId,
      userToken: this.$store.state.users.userToken,
      listId: this.$route.params.id,
      titleList: '', // this.$route.params.titleList,
      descriptionList: '' // this.$route.params.descriptionList
    };
  },
  methods: {
    showList() {
      API.list.show(
        this.listId,
        {headers: {Authorization: `Bearer ${this.userToken}`}, params: this.indexParams}
      ).then(response => {
        this.titleList = response.title;
        this.descriptionList = response.description;
      });
    }
  },
  computed: {
  },
  created() {
    this.showList();
  }
});
