import paginationComponent from 'js/components/pagination/index.js';
import template from './show.pug';

export default Vue.extend({
  template: template(),
  components: {
    paginationComponent
  },
  data() {
    return {
      userId: this.$store.state.users.userId,
      userToken: this.$store.state.users.userToken,
      listId: this.$route.params.id,
      list: '',
      items: '',
      newName: '',
      newPrice: '',
      errors: [],
      errorsVar: {
        newNameError: false,
        newPriceError: false,
        editNameError: false,
        editPriceError: false
      },
      editItem: false,
      editName: '',
      editPrice: '',
      pagination: {
        current_page: '',
        total_pages: '',
        page_size: '10',
        total_elements: ''
      }
    };
  },
  methods: {
    deleteItem(itemId) {
      API.item.destroy(
        this.listId,
        itemId,
        {headers: {Authorization: `Bearer ${this.userToken}`}}
      ).then(() => {
        this.showListItems();
      }, response => {
        // Ha habido errores
        if (response.status === 422) {
          // TODO, que hacer aqui?
        }
      });
    },
    showList() {
      API.list.show(
        this.listId,
        {
          headers: {Authorization: `Bearer ${this.userToken}`}
        }
      ).then(response => { 
        this.list = response;
      });
    },
    showListItems() {
      API.item.index(
        this.listId,
        {
          headers: {Authorization: `Bearer ${this.userToken}`},
          params: {
            page: {
              number: this.pagination.current_page,
              size: this.pagination.page_size
            }
          }
        }
      ).then(response => {
        this.updatePagination(response.meta);
        this.items = response.data;
      });
    },
    updatePagination(pagination) {
      this.pagination.current_page = pagination.current_page;
      this.pagination.total_pages = pagination.total_pages;
      // this.pagination.page_size = pagination.page_size;
      this.pagination.total_elements = pagination.total_elements;
    },
    addItem() {
      API.item.create(
        this.listId,
        {
          item: {
            name: this.newName,
            price: this.newPrice
          }
        },
        {headers: {Authorization: `Bearer ${this.userToken}`}}
      ).then(() => {
        // No ha habido errores
        this.varErrorReset();
        this.showListItems();
        this.newName = '';
        this.newPrice = '';
      }, response => {
        // Ha habido errores
        if (response.status === 422) {
          this.varErrorReset();

          response.data.errors = Object.keys(response.body);

          for (let i = 0; i < response.data.errors.length; i++) {
            this.errors.push(`${response.data.errors[i]}: ${response.data[response.data.errors[i]]}`);

            if (response.data.errors[i] === 'name') {
              this.errorsVar.newNameError = true;
            } else if (response.data.errors[i] === 'price') {
              this.errorsVar.newPriceError = true;
            }
          }
        }
      });
    },
    updateItem(updateItemId, updateName, updatePrice) {
      API.item.update(
        this.listId,
        updateItemId,
        {
          item: {
            name: updateName,
            price: updatePrice
          }
        },
        {headers: {Authorization: `Bearer ${this.userToken}`}}
      ).then(() => {
        // No ha habido errores
        this.varErrorReset();
        this.editItem = false;
        this.showListItems();
      }, response => {
        // Ha habido errores
        if (response.status === 422) {
          this.varErrorReset();
          response.data.errors = Object.keys(response.body);

          for (let i = 0; i < response.data.errors.length; i++) {

            if (response.data.errors[i] === 'name') {
              this.errorsVar.editNameError = true;
            } else if (response.data.errors[i] === 'price') {
              this.errorsVar.editPriceError = true;
            }
          }
        }
      });
    },
    updateItemCancel() {
      this.editItem = false;
    },
    varErrorReset() {
      this.errors = [];
      this.errorsVar.newNameError = false;
      this.errorsVar.newPriceError = false;
      this.errorsVar.editNameError = false;
      this.errorsVar.editPriceError = false;
    },
    clickList(item) {
      this.editItem = item;
      this.editName = item.name;
      this.editPrice = item.price;
    },
    myVote(itemVotes) {
      /* for (let i = 0; i < itemVotes.length; i++) {
        if (itemVotes[i].user_id === this.userId) {
          console.log('dentro');
          return true;
        }
      } */
      const vote = itemVotes.find(element => (element.user_id === this.userId));

      if (typeof vote === 'undefined') {
        return false;
      }

      return true;
    },
    addVote(itemActualId) {
      API.vote.create(
        {
          list_id: this.listId,
          item_id: itemActualId
        },
        '',
        {headers: {Authorization: `Bearer ${this.userToken}`}}
      ).then(() => {
        // No ha habido errores
        this.showListItems();
      }, response => {
        // Ha habido errores
        if (response.status === 422) {
          // TODO, que hacer aqui?
        }
      });
    },
    deleteVote(itemActualId, itemVotes) {
      let actualVoteId = '';

      for (let i = 0; i < itemVotes.length; i++) {
        if (itemVotes[i].user_id === this.userId) {
          actualVoteId = itemVotes[i].id;
        }
      }

      API.vote.delete(
        {
          list_id: this.listId,
          item_id: itemActualId,
          vote_id: actualVoteId
        },
        {headers: {Authorization: `Bearer ${this.userToken}`}}
      ).then(() => {
        // No ha habido errores
        this.showListItems();
      }, response => {
        // Ha habido errores
        if (response.status === 422) {
          // TODO, que hacer aqui?
        }
      });
    }
  },
  computed: {
  },
  created() {
    this.showList();
    this.showListItems();
  }
});
