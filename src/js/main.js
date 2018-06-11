import VueResource from 'vue-resource';

import DefaultLayout from 'js/layouts/default';
import LoginLayout from 'js/layouts/login';

import ErrorsMixin from 'js/mixins/errors.js';

import router from 'js/router.js';
import store from 'js/vuex/store.js';
import i18n from 'js/i18n.js';
import 'js/vue-resource-config';

require('scss/main.scss');
require('scss/form.scss');

/* --- Vue-Resource --- */
Vue.router = router;
Vue.store = store;
Vue.i18n = i18n;

Vue.use(VueResource);

Vue.http.options.root = API_HOST;

// Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
new Vue({
  router,
  store,
  i18n,
  components: {
    DefaultLayout,
    LoginLayout
  },
  mixins: [ErrorsMixin]
}).$mount('#app');
