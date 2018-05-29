
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
      descriptionList: '', // this.$route.params.descriptionList
      items: '',
      listUserId: '',
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
      editPrice: ''
    };
  },
  methods: {
    deleteItem(itemId) {
      API.item.destroy(this.listId, itemId, {headers: {Authorization: `Bearer ${this.userToken}`}}).then(response => {
        this.showListItems();
      });
    },
    showList() {
      API.list.show(
        this.listId,
        {headers: {Authorization: `Bearer ${this.userToken}`}, params: this.indexParams}
      ).then(response => {
        this.titleList = response.title;
        this.descriptionList = response.description;
        this.listUserId = response.user_id;
      });
    },
    showListItems() {
      API.item.index(
        this.listId,
        {headers: {Authorization: `Bearer ${this.userToken}`}}
      ).then(response => {
        this.items = response.data;
      });
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
      ).then(response => {
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
            this.errors.push(response.data.errors[i] + ': ' + response.data[response.data.errors[i]]);

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
      ).then(response => {
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

  },
  computed: {
  },
  created() {
    this.showList();
    this.showListItems();
  }
});
