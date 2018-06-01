import {mapActions, mapGetters} from 'vuex';
import paginationComponent from 'js/components/pagination/index.js';
import template from './index.pug';

export default Vue.extend({
  template: template(),
  components: {
    paginationComponent
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
    updateListState(listData) {
      API.list.update(
        listData.id,
        {
          list: {
            state: !listData.state
          }
        },
        {headers: {Authorization: `Bearer ${this.userToken}`}}
      ).then(() => {
        this.indexList();
      });
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
