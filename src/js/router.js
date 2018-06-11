import VueRouter from 'vue-router';

// Pages
import Register from './pages/register/index.js';
import Login from './pages/login/index.js';
import List from './pages/list/index.js';
import createList from './pages/list/create.js';
import showList from './pages/list/show.js';
import Profile from './pages/profile/index.js';

// Le indicamos a Vue que use VueRouter
Vue.use(VueRouter);

// Componente vacio para usarlo en las rutas padres
const RouteParent = {render(c) { return c('router-view'); }};

// Each route should map to a component. The 'component' can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  {
    path: '/',
    name: 'register',
    component: Register,
    meta: {
      layout: 'login',
      requiresToken: false
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'login',
      requiresToken: false
    }
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    meta: {
      layout: 'default',
      requiresToken: true
    }
  },
  {
    path: '/list/show/:id',
    name: 'showList',
    component: showList,
    meta: {
      layout: 'default',
      requiresToken: true
    }
  },
  {
    path: '/list/create',
    name: 'createList',
    component: createList,
    meta: {
      layout: 'default',
      requiresToken: true
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      layout: 'default',
      requiresToken: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
];

// Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresToken)) {
    if (localStorage.getItem('groceries_token')) {
      API.user.show(JSON.parse(atob(localStorage.getItem('groceries_token').split('.')[1])).userId).then(response => {
        Vue.store.dispatch('saveUser', {
          email: response.email,
          name: response.name,
          id: response.id,
          token: localStorage.getItem('groceries_token')
        });
        next();
      }, () => {
        next();
      });
    } else {
      next({
        path: '/login'
      });
    }
  } else {
    next();
  }
});

export default router;
