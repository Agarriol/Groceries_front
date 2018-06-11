import template from './index.pug';

export default Vue.extend({
  template: template({}),
  data() {
    return {
    };
  },
  props: ['pagination'],
  computed: {
  },
  methods: {
    nextPage() {
      this.pagination.current_page = this.pagination.current_page + 1;
      this.$emit('dataTable');
    },
    previousPage() {
      this.pagination.current_page = this.pagination.current_page - 1;
      this.$emit('dataTable');
    },
    sizePage(size) {
      this.pagination.page_size = size;
      this.$emit('dataTable');
    },
    firstPage() {
      this.pagination.current_page = 1;
      this.$emit('dataTable');
    },
    lastPage() {
      this.pagination.current_page = this.pagination.total_pages;
      this.$emit('dataTable');
    }
  },
  created() {
  }
});
