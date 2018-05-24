// import ExampleComponent from 'js/components/example/index.js';
import {mapActions} from 'vuex';
import {mapGetters} from 'vuex';
import template from './index.pug';

export default Vue.extend({
  template: template(),
  components: {
    // ExampleComponent
  },
  data() {
    return {
      // lists: [], // Si se quiere que se modifique durante la ejecución... computed!
      userId: this.$store.state.users.userId,
      userToken: this.$store.state.users.userToken,
      indexQueryParams: {
        sort: '-created_at',
        filters: {
          title: ''
        }
      },
      pagination: {
        current_page: '',
        total_pages: '',
        page_size: '10',
        total_elements: ''
      }
    };
  },
  methods: {
    deleteList(id) {
      API.list.destroy(id, {headers: {Authorization: `Bearer ${this.userToken}`}}).then(response => {
        this.indexList();
      });
    },
    indexList() {
      API.list.index(
        {headers: {Authorization: `Bearer ${this.userToken}`}, params: this.indexParams}
      ).then(response => {
        this.updatePagination(response.meta);
        this.$store.dispatch('saveList', {
          lists: response.data
        });
      });
    },
    addFilters() {
      this.indexList();
    },
    updatePagination(pagination) {
      this.pagination.current_page = pagination.current_page;
      this.pagination.total_pages = pagination.total_pages;
      // this.pagination.page_size = pagination.page_size;
      this.pagination.total_elements = pagination.total_elements;
    },
    nextPage() {
      this.pagination.current_page = this.pagination.current_page + 1;
      this.indexList();
    },
    previousPage() {
      this.pagination.current_page = this.pagination.current_page - 1;
      this.indexList();
    }
  },
  computed: {
    ...mapActions([
      'saveList' // mapea this.saveList() to this.$store.dispatch('saveList')
    ]),
    ...mapGetters([
      'getLists'
    ]),
    updateList() {
      return this.$store.getters.getLists;
    },
    indexParams() {
      let applicatedFilters;
      // TODO, función para filtros.
      // let x;
      // for(x in this.indexQueryParams.filters){
      //   if (this.indexQueryParams.filters[x] !== '') {
      //     prueba = {x: this.indexQueryParams.filters[x]};
      //   }
      // }

      if (this.indexQueryParams.filters.title !== '') {
        applicatedFilters = {title: this.indexQueryParams.filters.title};
      }

      return {
        page: {
          number: this.pagination.current_page,
          size: this.pagination.page_size
        },
        sort: this.indexQueryParams.sort,
        filter: applicatedFilters
      };
    }
  },
  created() {
    this.indexList();
  }
});
