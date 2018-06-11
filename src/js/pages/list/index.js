// import {mapActions, mapGetters} from 'vuex';
import paginationComponent from 'js/components/pagination/index.js';
import template from './index.pug';

export default Vue.extend({
  template: template(),
  components: {
    paginationComponent
  },
  data() {
    return {
      lists: [], // Si se quiere que se modifique durante la ejecución... computed!
      userId: this.$store.state.users.userId,
      userToken: this.$store.state.users.userToken,
      indexQueryParams: {
        sort: '-created_at',
        filters: {
          title: '',
          description: ''
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
    /* ...mapActions([
      'saveList'
      // Usando ...mapActions se puede cambiar:
      // this.$store.dispatch('saveList', { lists: response.data });
      // this.saveList({ lists: response.data });
    ]), */
    deleteList(id) {
      API.list.destroy(id, {}).then(() => {
        this.indexList();
      });
    },
    indexList() {
      API.list.index(
        // La cabecera se añade con un interceptor (vue-resource-interceptor)
        // {headers: {Authorization: `Bearer ${this.userToken}`}, params: this.indexParams}

        {params: this.indexParams}
      ).then(response => {
        this.updatePagination(response.meta);

        this.lists = response.data;
      });
    },
    updatePagination(pagination) {
      this.pagination.current_page = pagination.current_page;
      this.pagination.total_pages = pagination.total_pages;
      this.pagination.total_elements = pagination.total_elements;
    },
    updateListState(listData) {
      API.list.update(
        listData.id,
        {
          list: {
            state: !listData.state
          }
        }
      ).then(() => {
        this.lists.forEach(list => {
          if (list === listData) {
            list.state = !list.state;
          }
        });
      });
    }
  },
  computed: {
    /* ...mapGetters([
      'getLists'
      // Usando ...mapGetters se puede cambiar:
      // return this.$store.getters.getLists;
      // return this.getLists;
    ]), */
    indexParams() {
      const applicatedFilters = {};

      // En vez del buche for, se hace con Object.
      /* let x;
      for (x in this.indexQueryParams.filters){
        if (this.indexQueryParams.filters[x] !== '') {
          applicatedFilters[x] = this.indexQueryParams.filters[x];
          console.log ( applicatedFilters );
        }
      } */

      Object.keys(this.indexQueryParams.filters).forEach(key => {
        if (this.indexQueryParams.filters[key] !== '') {
          applicatedFilters[key] = this.indexQueryParams.filters[key];
        }
      });

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
