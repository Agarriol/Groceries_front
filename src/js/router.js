import VueRouter from 'vue-router';

// Pages
import Home from './pages/home/index.js';
import Login from './pages/login/index.js';
import List from './pages/list/index.js';
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
    name: 'home',
    component: Home,
    meta: {
      layout: 'register'
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'login'
    }
  },
  {
    path: '/list',
    name: 'list',
    component: List,
    meta: {
      layout: 'default'
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {
      layout: 'default'
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

export default router;
